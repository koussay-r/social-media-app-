import React from 'react'
import { useSelector } from 'react-redux';

export default function PostLoader() {
    const state=useSelector((state)=>state.user.value)
  return (
    <div className={`${state.nightDayMode===true?"bg-[#242526]":"bg-white "} px-3 mt-4 p-3 h-[300px] block mx-auto md:mx-0 shadow w-full rounded-lg`}>
    <div className='panel-effect'>
      <div className={`fake-effect ${state.nightDayMode===true?"bg-[#242526]":"bg-white "}  fe-0`}></div>
      <div className={`fake-effect ${state.nightDayMode===true?"bg-[#242526]":"bg-white "}   fe-1`}></div>
      <div className={`fake-effect ${state.nightDayMode===true?"bg-[#242526]":"bg-white "}  fe-2`}></div>
      <div className={`fake-effect ${state.nightDayMode===true?"bg-[#242526]":"bg-white "}  fe-3`}></div>
      <div className={`fake-effect ${state.nightDayMode===true?"bg-[#242526]":"bg-white "}  fe-4`}></div>
      <div className={`fake-effect ${state.nightDayMode===true?"bg-[#242526]":"bg-white "}  fe-5`}></div>
      <div className={`fake-effect ${state.nightDayMode===true?"bg-[#242526]":"bg-white "}  fe-6`}></div>
      <div className={`fake-effect ${state.nightDayMode===true?"bg-[#242526]":"bg-white "}  fe-7`}></div>
      <div className={`fake-effect ${state.nightDayMode===true?"bg-[#242526]":"bg-white "}  fe-8`}></div>
      <div className={`fake-effect ${state.nightDayMode===true?"bg-[#242526]":"bg-white "}  fe-9`}></div>
      <div className={`fake-effect ${state.nightDayMode===true?"bg-[#242526]":"bg-white "}  fe-10`}></div>
      <div className={`fake-effect ${state.nightDayMode===true?"bg-[#242526]":"bg-white "}  fe-11`}></div>
    </div>
  </div>
  )
}
