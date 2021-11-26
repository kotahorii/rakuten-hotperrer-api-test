import React, { memo } from 'react'

export const LoadingCard = memo(() => {
  return (
    <li className="bg-gray-50 p-3 flex items-center shadow-md flex-row space-x-3 rounded-lg w-full ">
      <div className="w-32 h-24 bg-gray-200 animate-pulse rounded-lg"></div>
      <div className="flex flex-col animate-pulse w-2/3 space-x-1">
        <div className="p-2 h-11 rounded-lg bg-gray-200"></div>
        <div className="flex flex-col space-y-2 mt-2">
          <p className=" h-5 bg-gray-200 rounded-lg"></p>
          <p className="h-5 bg-gray-200 rounded-lg"></p>
          <p className="h-4 bg-gray-200 rounded-lg"></p>
        </div>
      </div>
    </li>
  )
})
