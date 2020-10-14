import React from 'react'

function Aside ({ children }) {
  if (!children) return null
  return (
    <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
      {children}
    </span>
  )
}

function Btn ({children, color, ...rest}){
  return (
    <button className={`bg-transparent hover:bg-${color}-500 text-${color}-700 font-semibold hover:text-white py-2 px-4 border border-${color}-500 hover:border-transparent focus:outline-none rounded mb-2`} {...rest}>
  {children}
</button>
  )
}

export function Card ({ data }) {
  const handleVisitLink = () => {
    window.open(data.link, "_blank")
  }
  return (
    <div className='sm:w-1/2 lg:w-1/4 h-50 rounded overflow-hidden shadow-lg py-5'>
      <div className='px-6 py-4'>
        <div className='w-full flex justify-between'>
          <Btn color='red'>Save</Btn>
          <Btn color='blue' onClick={handleVisitLink}>Visit</Btn>
        </div>
        <div className='font-bold text-xl mb-2'>{data.job}</div>
        <p className='text-gray-700 text-base'>{data.description}</p>
      </div>
      <div className='px-6 pt-4 pb-2'>
        <Aside>{data.company}</Aside>
        <Aside>{data.salary}</Aside>
        <Aside>{data.date}</Aside>
      </div>
    </div>
  )
}
