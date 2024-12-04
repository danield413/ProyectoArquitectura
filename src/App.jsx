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
import { Instructions } from './components/Instructions'
import Swal from 'sweetalert2'
import Xarrow from 'react-xarrows'

const App = () => {
  const aluRef = useRef(null);
  const [instructions, setInstructions] = useState([])

  const handleAdd = () => {
    //alerta con formulario
    Swal.fire({
      title: 'ADD',
      html:
        '<input id="swal-input2" class="swal2-input" placeholder="Valor">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input2').value
        ]
      }
    }).then((result) => {
      if (result.isConfirmed) {

        if(result.value === '') {
          return
        }

        const newInstruction = {
          id: instructions.length + 1,
          tipo: 'ADD',
          value: result.value
        }
        setInstructions([...instructions, newInstruction])
      }
    })

  }

  const handleMove = () => {

  }

  const handleSub = () => {
      
  }

  const handleJmp = () => {

  }

  return (
    <div className='grid-principal'>
      <div className="grid">
        <div style={{ padding: '10px 20px', display: 'grid', gridTemplateRows: '70% 30%', height: '90vh' }}>
          <div>
            <h2 style={{ marginBottom: '10px' }}>Instrucciones</h2>
            <div style={{ border: '3px solid #ff5733', height: '300px', borderRadius: '10px' }}>
              {
                instructions.map((inst, index) => (
                  <div key={index} style={{ padding: '10px' }}>
                    <p><strong>{inst.tipo} </strong> {inst.value}</p>
                  </div>
                ))
              }
            </div>
          </div>
          <div>
            <button className='boton add'
              onClick={handleAdd}
            >ADD</button>
            <button className='boton move'
              onClick={handleMove}
            >MOVE</button>
            <button className='boton sub'
              onClick={handleSub}
            >SUB</button>
            <button className='boton jmp'
              onClick={handleJmp}
            >JMP</button>

          </div>
        </div>
        <div className='contenedor'>
          <div className='procesador'>
            <div className='izquierda'>
              <ALU ref={aluRef} />
              <BancoRegistros />
            </div>
           {true && <Xarrow
                start={aluRef} //can be react ref
                end="uc" //or an id
            />}
            <div className='derecha'>
              <UC  />
              <PC />
              <MAR />
              <MBR />
              <IR />
            </div>
          </div>
          <div className="es">
            <IO />
          </div>
        </div>
        <div>
          <BusSistema />
        </div>
        <div>
          <Memoria />
        </div>
      </div>
      {/* <div className="set">
        <Instructions />
      </div> */}
    </div>
  )
}

export default App
