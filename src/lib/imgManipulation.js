import { metrics } from "../App";

export const transform = (
  cv,
  docCanvas,
  cropPoints,
  imageResizeRatio,
  setPreviewPaneDimensions
) => {
  const dst = cv.imread(docCanvas)

  const bR = cropPoints['right-bottom']
  const bL = cropPoints['left-bottom']
  const tR = cropPoints['right-top']
  const tL = cropPoints['left-top']

  // create source coordinates matrix
  const sourceCoordinates = [tL, tR, bR, bL].map((point) => [
    point.x / imageResizeRatio,
    point.y / imageResizeRatio
  ])
  console.log('source_cord: ', sourceCoordinates);

  // get max width
  const maxWidth = Math.max(bR.x - bL.x, tR.x - tL.x) / imageResizeRatio
  // get max height
  const maxHeight = Math.max(bL.y - tL.y, bR.y - tR.y) / imageResizeRatio

  // create dest coordinates matrix
  const destCoordinates = [
    [0, 0],
    [metrics.w- 1, 0],
    [metrics.w- - 1, metrics.h],
    [0, metrics.h]
  ]

  // convert to open cv matrix objects
  const Ms = cv.matFromArray(4, 1, cv.CV_32FC2, [].concat(...sourceCoordinates))
  const Md = cv.matFromArray(4, 1, cv.CV_32FC2, [].concat(...destCoordinates))
  const transformMatrix = cv.getPerspectiveTransform(Ms, Md)
  console.log('TM: ', transformMatrix);
  // set new image size
  const dsize = new cv.Size(metrics.w, metrics.h) // Utilizar valores input utilizador
  // perform warp
  cv.warpPerspective(
    dst,
    dst,
    transformMatrix,
    dsize,
    cv.INTER_LINEAR,
    cv.BORDER_CONSTANT,
    new cv.Scalar()
  )
  cv.imshow(docCanvas, dst)

  dst.delete()
  Ms.delete()
  Md.delete()
  transformMatrix.delete()

  setPreviewPaneDimensions()
}

