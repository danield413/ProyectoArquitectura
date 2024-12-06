import React, { forwardRef } from 'react'
import { useStore } from '../hooks/useStore'

export const IR = forwardRef((props, ref) => {
  const { state } = useStore();

  const { ir } = state;

  return (
    <div id="ir" ref={ref} className='ir'>
      <p>IR</p>
      <p>{ir}</p>
    </div>
  )
})
