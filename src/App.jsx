import { useCallback, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MAR } from './components/MAR'
import { PC } from './components/PC'
import { UC } from './components/UC'
import { MBR } from './components/MBR'
import { IR } from './components/IR'
import { BancoRegistros } from './components/BancoRegistros'
import { ALU } from './components/ALU'
import { BusSistema } from './components/BusSistema'
import { Memoria } from './components/Memoria'
import { IO } from './components/IO'

const App = () => {

  return (
    <div className="grid">
      <div style={{ padding: '10px 20px'}}>
        <h2 style={{ marginBottom: '10px' }}>Instrucciones</h2>
        <textarea className='instrucciones'></textarea>
      </div>
      <div className='contenedor'>
        <div className='superior'>
          <ALU />
          <UC />
          <PC />

        </div>
        <div className='centro'>
          <MAR />
          <MBR />
          <IR />
        </div>
        <div className='inferior'>
          <BancoRegistros />
        </div>
      </div>
      <div>
        <BusSistema />
        <IO />
      </div>
      <div>
        <Memoria />
      </div>
    </div>
  )
}

export default App
