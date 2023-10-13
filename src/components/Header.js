import { Descriptions} from 'antd'
import React from 'react'

const Header = () => {
  return (
    <div className='site-page-header'>
        <Descriptions size='small' column={2}>
          <Descriptions.Item label='Package'>
            <a href='https://www.npmjs.com/package/react-perspective-cropper'>
              <img
                alt='npm'
                src='https://img.shields.io/npm/v/react-perspective-cropper.svg'
              />
            </a>
            <a href='https://standardjs.com'>
              <img
                alt='standardjs'
                src='https://img.shields.io/badge/code_style-standard-brightgreen.svg'
              />
            </a>
          </Descriptions.Item>
          <Descriptions.Item label='Description'>
          </Descriptions.Item>
          <Descriptions.Item label='Info'>
          </Descriptions.Item>
        </Descriptions>
    </div>
  )
}

export default Header
