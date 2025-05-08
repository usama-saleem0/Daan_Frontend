import Lottie from 'lottie-react'
import React from 'react'

const LottiAnimation = ({image,text='No Data Found'}) => {
  return (
    <div className="div">
    <Lottie animationData={image} loop={true} />
    <p className="No-Data">{text}</p>
  </div>
  )
}

export default LottiAnimation