import React from 'react'

const Error = ({message}) => {
  return (
    <div className='text-sm text-red-400'>
      {message}
    </div>
  )
}

export default Error
