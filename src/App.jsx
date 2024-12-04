import { useCallback, useEffect, useRef, useState } from 'react'
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
import { Memoria } from './components/Memoria'
import { IO } from './components/IO'
import Swal from 'sweetalert2'
import Xarrow from 'react-xarrows'

const App = () => {
  
  const [instructions, setInstructions] = useState([])
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)

  //referencias a los elementos JSX
  const aluRef = useRef(null);
  const mbrRef = useRef(null);
  const marRef = useRef(null);
  const pcRef = useRef(null);
  const irRef = useRef(null);
  const ucRef = useRef(null);
  const ioRef = useRef(null);
  const bancoRef = useRef(null);
  const memoriaRef = useRef(null);
  const busDireccionesRef = useRef(null);
  const busDatosRef = useRef(null);
  const busControlRef = useRef(null);




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

  useEffect(() => {

    let pasos = [
      {
        inicio: 'pc',
        fin: 'mar'
      },
      {
        inicio: 'mar',
        fin: 'memoria'
      },
      {
        inicio: 'memoria',
        fin: 'mbr'
      },
      {
        inicio: 'mbr',
        fin: 'ir'
      }
    ]
 
    pasos.forEach((paso, index) => {
      setTimeout(() => {
        setStart(paso.inicio)
        setEnd(paso.fin)
      }, index * 3000)
    })


  }, [])

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const ejecutarConRetraso = async () => {
    console.log("Inicio");
    
    // Esperar 3 segundos
    await delay(3000);
    
    console.log("Se ejecutó después de 3 segundos");
  };

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
              <BancoRegistros ref={bancoRef}/>
            </div>
            <div className='derecha'>
              <UC />
              <PC />
              <MAR ref={marRef}/>
              <MBR ref={mbrRef}/>
              <IR ref={irRef}/>
            </div>
          </div>
          <div className="es">
            <IO ref={ioRef} id="io"/>
          </div>
        </div>
        <div className='bus-sistema'>
            <div className="direcciones" ref={busDireccionesRef}> </div>
            <div className="datos" ref={busDatosRef}></div>
            <div className="control" ref={busControlRef}></div>
        </div>
        <div>
          <Memoria ref={memoriaRef}/>
        </div>
      </div>
      <Xarrow
            start={start} //can be react ref
            end={end} //or an id
        />
    </div>
  )
}

export default App
