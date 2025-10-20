import React from 'react'

interface Props {
    title: string
}

const TopHeader = ({title} : Props) => {
  return (
    <div className='p-3 md:px-5'>
      <h1 className='text-white font-bold text-3xl'>{title}</h1>
    </div>
  )
}

export default TopHeader
