import React, { forwardRef } from 'react'
import { useStore } from '../hooks/useStore'

export const MAR = forwardRef((props, ref) => {

  const { state } = useStore();

  const { mar } = state;

  return (
    <div id="mar" ref={ref} className='mar'>
      <p>MAR</p>
      <p>{mar}</p>
    </div>
  )
})
