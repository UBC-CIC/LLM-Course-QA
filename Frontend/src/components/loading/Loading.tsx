import React from 'react'
import './Loading.css'

interface Props {
  loadingFade: boolean;
}

const Loading = ({loadingFade}: Props) => {
  return (
    <div className="loading-wrapper bg-gray-900" style={{opacity: `${loadingFade ? 0 : 1}`}}>
      <img src="courseqa-logo.png" alt="loading" id="logo-container"/>
    </div>
  )
}

export default Loading