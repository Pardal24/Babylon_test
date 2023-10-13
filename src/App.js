import React, { useCallback, useRef, useState } from 'react'
import { Button, Spin, Upload } from 'antd'
import { CheckOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons'
import Cropper from './components/Cropper'
import download from 'downloadjs'
import './App.css'
import Header from './components/Header'

const { Dragger } = Upload

export let metrics = {}

const App = () => {
  const [cropState, setCropState] = useState()
  const [croppedImageUrl, setCroppedImageUrl] = useState('');
  const [img, setImg] = useState()
  const cropperRef = useRef()
  const hiddenAnchorRef = useRef()
  //const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const blobUrlRef = useRef()
  const onDragStop = useCallback((s) => setCropState(s), [])
  const onChange = useCallback((s) => setCropState(s), [])

  const doSomething = async () => {
    console.log('CropState', cropState)
    try {
      const res = await cropperRef.current.done({
        preview: true,
        filterCvParams: {
          thMeanCorrection: 13,
          thMode: window.cv.ADAPTIVE_THRESH_GAUSSIAN_C
        }
      });
      console.log('Cropped and filtered image', res)
      const blob = await fetch(res.preview).then((r) => r.blob())
      setCroppedImageUrl(res.preview);
    } catch (e) {
      console.log('error', e)
    }
  }

  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [deph, setDeph] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const h = parseInt(height,10)
    const w = parseInt(width,10)

    metrics = {h, w}

    console.log('metrics: ', metrics)

  }

  const onImgSelection = async (e) => {
    if (e.fileList && e.fileList.length > 0) {
      // it can also be a http or base64 string for example
      setImg(e.fileList[0].originFileObj)
    }
  }

  const draggerProps = {
    name: 'file',
    multiple: false,
    onChange: onImgSelection
  }

  return (
    <div className='root-container'>
      <Header />
      <div className='multi.slot.cropper'> </div>
      <div className='content-container'>
        {cropState && (
          <div className='buttons-container'>
            <Button onClick={doSomething} icon={<CheckOutlined />}>
              Done
            </Button>
            <Button
              onClick={() => {
                cropperRef.current.backToCrop()
              }}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                setImg(undefined)
                setCropState()
              }}
            >
              Reset
            </Button>
            <div className='Submit'>
              <form onSubmit = {handleSubmit}>
                <label>Height:</label>
                <input 
                  type="text" 
                  value={height} 
                  onChange = {(e) => setHeight(e.target.value,10)}
                />
                <p>         
                  <label>
                    Width:
                  </label>
                  <input 
                    type="text" 
                    value={width} 
                    onChange = {(e) => setWidth(e.target.value)}
                  />
                </p>
                <p>         
                  <label>
                    Deph:
                  </label>
                  <input 
                    type="text" 
                    value={deph} 
                    onChange = {(e) => setDeph(e.target.value)}
                  />
                </p>    
                <button>Submit</button>       
              </form>
            </div>
          </div>

        )}

        <Cropper
          openCvPath='./opencv/opencv.js'
          ref={cropperRef}
          image={img}
          onChange={onChange}
          onDragStop={onDragStop}
          maxWidth={window.innerWidth - 10}
        />
        {cropState?.loading && <Spin />}
        {!img && (
          <Dragger {...draggerProps}>
            <p>
              <PlusOutlined />
            </p>
            <p>Upload</p>
          </Dragger>
        )}
      </div>
    </div>
  )
}

export default App
