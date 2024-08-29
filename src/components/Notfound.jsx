import React from 'react'
import error from '../assets/error.png'
export default function Notfound() {
  return (
    <div className='d-flex justify-content-center w-50 mx-auto'>
      <img src={error} className='error'/>
    </div>
  )
}
