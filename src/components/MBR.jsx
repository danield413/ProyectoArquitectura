import React, { forwardRef } from 'react'
import { useStore } from '../hooks/useStore'

export const MBR = forwardRef((props, ref) => {

  const { state } = useStore();

  const { mbr } = state;

  return (
    <div id="mbr" ref={ref} className='mbr'>
      <p>MBR</p>
      <p>{mbr}</p>
    </div>
  )
})
