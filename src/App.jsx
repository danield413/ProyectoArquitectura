import { useEffect, useRef, useState } from "react";
import "./App.css";
import { MAR } from "./components/MAR";
import { PC } from "./components/PC";
import { UC } from "./components/UC";
import { MBR } from "./components/MBR";
import { IR } from "./components/IR";
import { BancoRegistros } from "./components/BancoRegistros";
import { ALU } from "./components/ALU";
import { Memoria } from "./components/Memoria";
import { IO } from "./components/IO";
import Swal from "sweetalert2";
import Xarrow from "react-xarrows";
import { ArcherContainer, ArcherElement } from "react-archer"
import { useStore } from "./hooks/useStore"


const App = () => {

  const { state, setState } = useStore();
  const { registros } = state;

  const [instructions, setInstructions] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

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

  //* ADD R1, R2 <-- direccionamiento por registros
  const handleAdd = () => {
    //alerta con formulario

    let registrosDisponibles = ''
    registros.forEach(reg => {
      registrosDisponibles += reg.nombre + ' '
    })

    Swal.fire({
      title: "ADD",
      html:
      'Registros disponibles: ' + registrosDisponibles + '<br>' +
      '<input id="swal-input1" class="swal2-input" placeholder="R1">'
      + '<input id="swal-input2" class="swal2-input" placeholder="R2">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "" || result.value[1] === "") {
          return;
        }

        //si los registros no existen
        if (!registros.find(reg => reg.nombre === result.value[0]) || !registros.find(reg => reg.nombre === result.value[1])) {
          Swal.fire({
            title: "Error",
            text: "Los registros no existen",
            icon: "error",
          });
          return;
        }

        const newInstruction = {
          id: instructions.length + 1,
          tipo: "ADD",
          value: result.value[0] + ", " + result.value[1],
        };
        setInstructions([...instructions, newInstruction]);
      }
    });
  };

  //* SUB R1, R2 <-- direccionamiento por registros
  const handleSub = () => {
    //alerta con formulario

    let registrosDisponibles = ''
    registros.forEach(reg => {
      registrosDisponibles += reg.nombre + ' '
    })

    Swal.fire({
      title: "SUB",
      html:
      'Registros disponibles: ' + registrosDisponibles + '<br>' +
      '<input id="swal-input1" class="swal2-input" placeholder="R1">'
      + '<input id="swal-input2" class="swal2-input" placeholder="R2">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "" || result.value[1] === "") {
          return;
        }

        //si los registros no existen
        if (!registros.find(reg => reg.nombre === result.value[0]) || !registros.find(reg => reg.nombre === result.value[1])) {
          Swal.fire({
            title: "Error",
            text: "Los registros no existen",
            icon: "error",
          });
          return;
        }

        const newInstruction = {
          id: instructions.length + 1,
          tipo: "SUB",
          value: result.value[0] + ", " + result.value[1],
        };
        setInstructions([...instructions, newInstruction]);
      }
    });
  };

  //* ---
  const handleMove = () => {
    Swal.fire({
      title: "MOV",
      html: '<input id="swal-input1" class="swal2-input" placeholder="R1">'
      + '<input id="swal-input2" class="swal2-input" placeholder="R2">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "" || result.value[1] === "") {
          return;
        }

        //si los registros no existen
        if (!registros.find(reg => reg.nombre === result.value[0]) || !registros.find(reg => reg.nombre === result.value[1])) {
          Swal.fire({
            title: "Error",
            text: "Los registros no existen",
            icon: "error",
          });
          return;
        }

        const newInstruction = {
          id: instructions.length + 1,
          tipo: "MOV",
          value: result.value[0] + ", " + result.value[1],
        };
        setInstructions([...instructions, newInstruction]);
      }
    });
  };

  //* no tiene direccionamiento
  const handleJmp = () => {
    //* indica el comienzo
    Swal.fire({
      title: "JMP",
      html: '<input id="swal-input1" type="number" class="swal2-input" placeholder="Dirección">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] > 31) {
          return;
        }

        const newInstruction = {
          id: instructions.length + 1,
          tipo: "JMP",
          value: result.value[0],
        };
        setInstructions([...instructions, newInstruction]);
      }
    });
  };

  //* LOAD R1, VALOR <-- direccionamiento inmediato
  const handleLoad = () => {
    //alerta con formulario

    let registrosDisponibles = ''
    registros.forEach(reg => {
      registrosDisponibles += reg.nombre + ' '
    })

    Swal.fire({
      title: "LOAD",
      html:
      'Registros disponibles: ' + registrosDisponibles + '<br>' +
      '<input id="swal-input1" class="swal2-input" placeholder="R1">'
      + '<input id="swal-input2" type="number" class="swal2-input" placeholder="Valor">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "") {
          return;
        }

        //si los registros no existen
        if (!registros.find(reg => reg.nombre === result.value[0])) {
          Swal.fire({
            title: "Error",
            text: "El registro no existe",
            icon: "error",
          });
          return;
        }

        const newInstruction = {
          id: instructions.length + 1,
          tipo: "LOAD",
          value: result.value[0] + ", " + result.value[1],
        };
        setInstructions([...instructions, newInstruction]);
      }
    });
  };

  //* NEG R1 <-- direccionamiento por registros
  const handleNeg = () => {
    //alerta con formulario

    let registrosDisponibles = ''
    registros.forEach(reg => {
      registrosDisponibles += reg.nombre + ' '
    })

    Swal.fire({
      title: "ADD",
      html:
      'Registros disponibles: ' + registrosDisponibles + '<br>' +
      '<input id="swal-input1" class="swal2-input" placeholder="R1">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "") {
          return;
        }

        //si los registros no existen
        if (!registros.find(reg => reg.nombre === result.value[0])) {
          Swal.fire({
            title: "Error",
            text: "El registro no existe",
            icon: "error",
          });
          return;
        }

        const newInstruction = {
          id: instructions.length + 1,
          tipo: "NEG",
          value: result.value[0],
        };
        setInstructions([...instructions, newInstruction]);
      }
    });
  };

  //* direccionamiento por registro
  const handleInc = () => {

    let registrosDisponibles = ''
    registros.forEach(reg => {
      registrosDisponibles += reg.nombre + ' '
    })

    Swal.fire({
      title: "INC",
      html: 
      'Registros disponibles: ' + registrosDisponibles + '<br>' +
      '<input id="swal-input1" class="swal2-input" placeholder="R1">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "") {
          return;
        }

        //si los registros no existen
        if (!registros.find(reg => reg.nombre === result.value[0])) {
          Swal.fire({
            title: "Error",
            text: "El registro no existe",
            icon: "error",
          });
          return;
        }

        const newInstruction = {
          id: instructions.length + 1,
          tipo: "INC",
          value: result.value[0],
        };
        setInstructions([...instructions, newInstruction]);
      }
    });

  };

  //* direccionamiento por registro
  const handleDec = () => {

    let registrosDisponibles = ''
    registros.forEach(reg => {
      registrosDisponibles += reg.nombre + ' '
    })

    Swal.fire({
      title: "DEC",
      html: 
      'Registros disponibles: ' + registrosDisponibles + '<br>' +
      '<input id="swal-input1" class="swal2-input" placeholder="R1">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "") {
          return;
        }

        //si los registros no existen
        if (!registros.find(reg => reg.nombre === result.value[0])) {
          Swal.fire({
            title: "Error",
            text: "El registro no existe",
            icon: "error",
          });
          return;
        }

        const newInstruction = {
          id: instructions.length + 1,
          tipo: "DEC",
          value: result.value[0],
        };
        setInstructions([...instructions, newInstruction]);
      }
    });
  };

  //* direccionamiento por registro (o inmediato <--falta)
  const handleCmp = () => {
    Swal.fire({
      title: "CMP",
      html: '<input id="swal-input1" class="swal2-input" placeholder="R1">'
      + '<input id="swal-input2" class="swal2-input" placeholder="R2">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "" || result.value[1] === "") {
          return;
        }

        //si los registros no existen
        if (!registros.find(reg => reg.nombre === result.value[0]) || !registros.find(reg => reg.nombre === result.value[1])) {
          Swal.fire({
            title: "Error",
            text: "Los registros no existen",
            icon: "error",
          });
          return;
        }

        const newInstruction = {
          id: instructions.length + 1,
          tipo: "CMP",
          value: result.value[0] + ", " + result.value[1],
        };
        setInstructions([...instructions, newInstruction]);
      }
    });

  };



  const realizarSecuencia = (pasos) => {

    console.log("instructions", instructions);

    pasos.forEach((paso, index) => {
      setTimeout(() => {
        setStart(paso.inicio);
        setEnd(paso.fin);
      }, index * 6000);
    });

  }

  return (
    <div className="grid-principal">
      <div className="grid">
        <div
          style={{
            padding: "10px 20px",
            display: "grid",
            gridTemplateRows: "70% 30%",
            height: "90vh",
          }}
        >
          <div>
            <h2 style={{ marginBottom: "10px" }}>Instrucciones</h2>
            <button className="ejecutar" onClick={realizarSecuencia}>Ejecutar</button>
            <div
              style={{
                border: "3px solid #ff5733",
                height: "300px",
                borderRadius: "10px",
              }}
            >
              {instructions.map((inst, index) => (
                <div key={index} style={{ padding: "10px" }}>
                  <p>
                    <strong>{inst.tipo} </strong> {inst.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '10px'
          }}>
            <div>
                <button className="boton load"
                  onClick={handleLoad}
                >
                  LOAD
                </button>
                <button className="boton neg"
                  onClick={handleNeg}
                >
                  NEG
                </button>
                <button className="boton move" onClick={handleMove}>
                  MOV
                </button>
      
                <button className="boton jmp" onClick={handleJmp}>
                  JMP
                </button>
            </div>
              <div>
              <button className="boton add" onClick={handleAdd}>
                ADD
              </button>
              <button className="boton sub" onClick={handleSub}>
                SUB
              </button>
              <button className="boton inc"
                onClick={handleInc}
              >
                INC
              </button>
              </div>
              <div> 
                <button className="boton dec"
                  onClick={handleDec}  
                >
                  DEC
                </button>
                <button className="boton cmp"
                  onClick={handleCmp}
                >
                  CMP
                </button>

              </div>
          </div>
        </div>
        <div className="contenedor">
          <div className="procesador">
            <div className="izquierda">
              <ALU ref={aluRef} />
              <BancoRegistros ref={bancoRef} />
            </div>
            <div className="derecha">
              <UC />
              <PC />
              <MAR ref={marRef} />
              <MBR ref={mbrRef} />
              <IR ref={irRef} />
            </div>
          </div>
          <div className="es">
            <IO ref={ioRef} />
          </div>
        </div>
        <div className="bus-sistema">
          <div className="direcciones" ref={busDireccionesRef}>
            {" "}
          </div>
          <div className="datos" ref={busDatosRef}></div>
          <div className="control" ref={busControlRef}></div>
        </div>
        <div>
          <Memoria ref={memoriaRef} />
        </div>
      </div>
      <Xarrow
        path="smooth"
        dashness={true}
        color="#ffe800"
        strokeWidth={2}
        start={start} //can be react ref
        end={end} //or an id
      />

    </div>
  );
};

export default App;
