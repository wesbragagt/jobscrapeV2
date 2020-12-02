import React from 'react'

export function SkeletonLoading(){
  return (
<div className="sm:w-1/2 lg:w-1/4 h-50 rounded overflow-hidden shadow-lg px-4 py-5">
  <div className="animate-pulse flex">
    <div className="flex-1 space-y-8 py-1">
      <div className="h-4 bg-gray-400 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-400 rounded w-full"></div>
        <div className="h-4 bg-gray-400 rounded w-full"></div>
        <div className="h-4 bg-gray-400 rounded w-full"></div>
        <div className="h-4 bg-gray-400 rounded w-3/6"></div>
      </div>
      <div className='space-y-4'>
        <div className="h-4 bg-gray-400 rounded w-1/6"></div>
        <div className="h-4 bg-gray-400 rounded w-2/6"></div>
      </div>
    </div>
  </div>
</div>)
}