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

const registros = [
  { nombre: 'AX', valor: 0 },
  { nombre: 'AL', valor: 0 },
  { nombre: 'BL', valor: 0 },
  { nombre: 'CL', valor: 0 },
  { nombre: 'IP', valor: 0 },
  { nombre: 'SP', valor: 0 },
  { nombre: 'SR', valor: 0 },
  { nombre: 'DL', valor: 0 },
  { nombre: 'AD', valor: 0 },
  { nombre: 'AR', valor: 0 }
]

const App = () => {
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

  const handleAdd = () => {
    //alerta con formulario
    Swal.fire({
      title: "ADD",
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
          tipo: "ADD",
          value: result.value[0] + ", " + result.value[1],
        };
        setInstructions([...instructions, newInstruction]);
      }
    });
  };

  const handleSub = () => {
    Swal.fire({
      title: "SUB",
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
          tipo: "SUB",
          value: result.value[0] + ", " + result.value[1],
        };
        setInstructions([...instructions, newInstruction]);
      }
    });
  };

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


  const handleJmp = () => {};

  const realizarSecuencia = (pasos) => {

    pasos.forEach((paso, index) => {
      setTimeout(() => {
        setStart(paso.inicio);
        setEnd(paso.fin);
      }, index * 6000);
    });

  }

  useEffect(() => {
    let pasos = [
      {
        inicio: "pc",
        fin: "mar",
      },
      {
        inicio: "mar",
        fin: "memoria",
      },
      {
        inicio: "memoria",
        fin: "mbr",
      },
      {
        inicio: "mbr",
        fin: "ir",
      },
    ];

    realizarSecuencia(pasos);
  }, []);
  
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
          <div>
            <button className="boton add" onClick={handleAdd}>
              ADD
            </button>
            <button className="boton move" onClick={handleMove}>
              MOV
            </button>
            <button className="boton sub" onClick={handleSub}>
              SUB
            </button>
            <button className="boton jmp" onClick={handleJmp}>
              JMP
            </button>
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
