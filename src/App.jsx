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
import { useStore } from "./hooks/useStore";

const codops = [
  { nombre: "LOAD", valor: "0000" },
  { nombre: "MPY", valor: "0001" },
  { nombre: "MOV", valor: "0010" },
  { nombre: "JMP", valor: "0011" },
  { nombre: "ADD", valor: "0100" },
  { nombre: "SUB", valor: "0101" },
  { nombre: "INC", valor: "0110" },
  { nombre: "DEC", valor: "0111" },
  { nombre: "CMP", valor: "1000" },
];

const identificadoresRegistros = [
  { nombre: "AL", valor: "00" },
  { nombre: "BL", valor: "01" },
  { nombre: "CL", valor: "10" },
  { nombre: "DL", valor: "11" },
];

const App = () => {
  // useStore es un hook que permite acceder al estado global de la aplicación
  const { state, setState, agregarInstruccion } = useStore();
  const { registros, pc } = state;

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

    let registrosDisponibles = "";
    registros.forEach((reg) => {
      registrosDisponibles += reg.nombre + " ";
    });

    Swal.fire({
      title: "ADD",
      html:
        "Registros disponibles: " +
        registrosDisponibles +
        "<br>" +
        '<input id="swal-input1" class="swal2-input" placeholder="R1">' +
        '<input id="swal-input2" class="swal2-input" placeholder="R2">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "" || result.value[1] === "") {
          return;
        }

        //si los registros no existen
        if (
          !registros.find((reg) => reg.nombre === result.value[0]) ||
          !registros.find((reg) => reg.nombre === result.value[1])
        ) {
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

    let registrosDisponibles = "";
    registros.forEach((reg) => {
      registrosDisponibles += reg.nombre + " ";
    });

    Swal.fire({
      title: "SUB",
      html:
        "Registros disponibles: " +
        registrosDisponibles +
        "<br>" +
        '<input id="swal-input1" class="swal2-input" placeholder="R1">' +
        '<input id="swal-input2" class="swal2-input" placeholder="R2">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "" || result.value[1] === "") {
          return;
        }

        //si los registros no existen
        if (
          !registros.find((reg) => reg.nombre === result.value[0]) ||
          !registros.find((reg) => reg.nombre === result.value[1])
        ) {
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
    let registrosDisponibles = "";
    registros.forEach((reg) => {
      registrosDisponibles += reg.nombre + " ";
    });
  
    Swal.fire({
      title: "MOV",
      html:
        '<select id="direccionamiento" class="swal2-select">' +
        '<option value="registro">Por Registro</option>' +
        '<option value="memoria">Por Memoria</option>' +
        '</select>',
      focusConfirm: false,
      preConfirm: () => {
        return document.getElementById("direccionamiento").value;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const direccionamiento = result.value;
  
        if (direccionamiento === "registro") {
          Swal.fire({
            title: "Por Registro",
            html:
              "Registros disponibles: " +
              registrosDisponibles +
              "<br>" +
              '<input id="swal-input1" class="swal2-input" placeholder="R1">' +
              '<input id="swal-input2" class="swal2-input" placeholder="R2">',
            focusConfirm: false,
            preConfirm: () => {
              return [
                document.getElementById("swal-input1").value,
                document.getElementById("swal-input2").value,
              ];
            },
          }).then((result) => {
            if (result.isConfirmed) {
              if (result.value[0] === "" || result.value[1] === "") {
                return;
              }
  
              //si los registros no existen
              if (
                !registros.find((reg) => reg.nombre === result.value[0]) ||
                !registros.find((reg) => reg.nombre === result.value[1])
              ) {
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
        } else if (direccionamiento === "memoria") {
          Swal.fire({
            title: "Por Memoria",
            html:
            "<p>Direcciones de memoria disponibles: 32</p>" +
            '<input id="swal-input1" class="swal2-input" placeholder="Dirección de Memoria">' +
            "<br><br>" + 
            "<p>Registros disponibles:</p>" +
            "<ul>" +
            registrosDisponibles +
            "</ul>" +
            '<input id="swal-input2" class="swal2-input" placeholder="Registro">',
            focusConfirm: false,
            preConfirm: () => {
              return [
                document.getElementById("swal-input1").value,
                document.getElementById("swal-input2").value,
              ];
            },
          }).then((result) => {
            if (result.isConfirmed) {
              const direccionMemoria = parseInt(result.value[0]);
              const registro = result.value[1];
  
              if (isNaN(direccionMemoria) || direccionMemoria < 0 || direccionMemoria > 31) {
                Swal.fire({
                  title: "Error",
                  text: "La dirección de memoria debe ser un número entre 0 y 31",
                  icon: "error",
                });
                return;
              }
  
              if (registro === "") {
                return;
              }
  
              //si el registro no existe
              if (!registros.find((reg) => reg.nombre === result.value[1])) {
                Swal.fire({
                  title: "Error",
                  text: "El registro no existe",
                  icon: "error",
                });
                return;
              }
  
              const newInstruction = {
                id: instructions.length + 1,
                tipo: "MOV",
                value: direccionMemoria + ", " + registro,
              };
              setInstructions([...instructions, newInstruction]);
            }
          });
        }
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
        return [document.getElementById("swal-input1").value];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const direccion = result.value[0];
  
        if (direccion === "" || isNaN(direccion) || direccion < 0 || direccion > 31) {
          Swal.fire({
            title: "Error",
            text: "La dirección debe ser un número entre 0 y 31",
            icon: "error",
          });
          return;
        }
  
        const newInstruction = {
          id: instructions.length + 1,
          tipo: "JMP",
          value: direccion,
        };
        setInstructions([...instructions, newInstruction]);
      }
    });
  };
  //* LOAD R1, VALOR <-- direccionamiento inmediato
  const handleLoad = () => {
    //alerta con formulario

    let registrosDisponibles = "";
    registros.forEach((reg) => {
      registrosDisponibles += reg.nombre + " ";
    });

    Swal.fire({
      title: "LOAD",
      html:
        "Registros disponibles: " +
        registrosDisponibles +
        "<br>" +
        '<input id="swal-input1" class="swal2-input" placeholder="R1">' +
        '<input id="swal-input2" type="number" class="swal2-input" placeholder="Valor">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "") {
          return;
        }

        //si los registros no existen
        if (!registros.find((reg) => reg.nombre === result.value[0])) {
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

  //* MPY R1 R2 <-- direccionamiento por registros
  const handleMpy = () => {
    //alerta con formulario

    let registrosDisponibles = "";
    registros.forEach((reg) => {
      registrosDisponibles += reg.nombre + " ";
    });

    Swal.fire({
      title: "MPY",
      html:
        "Registros disponibles: " +
        registrosDisponibles +
        "<br>" +
        '<input id="swal-input1" class="swal2-input" placeholder="R1">' +
        '<input id="swal-input2" class="swal2-input" placeholder="R2">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "" || result.value[1] === "") {
          return;
        }

        //si los registros no existen
        if (
          !registros.find((reg) => reg.nombre === result.value[0]) ||
          !registros.find((reg) => reg.nombre === result.value[1])
        ) {
          Swal.fire({
            title: "Error",
            text: "Los registros no existen",
            icon: "error",
          });
          return;
        }

        const newInstruction = {
          id: instructions.length + 1,
          tipo: "MPY",
          value: result.value[0] + ", " + result.value[1],
        };
        setInstructions([...instructions, newInstruction]);
      }
    });
  };

  //* direccionamiento por registro
  const handleInc = () => {
    let registrosDisponibles = "";
    registros.forEach((reg) => {
      registrosDisponibles += reg.nombre + " ";
    });

    Swal.fire({
      title: "INC",
      html:
        "Registros disponibles: " +
        registrosDisponibles +
        "<br>" +
        '<input id="swal-input1" class="swal2-input" placeholder="R1">',
      focusConfirm: false,
      preConfirm: () => {
        return [document.getElementById("swal-input1").value];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "") {
          return;
        }

        //si los registros no existen
        if (!registros.find((reg) => reg.nombre === result.value[0])) {
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
    let registrosDisponibles = "";
    registros.forEach((reg) => {
      registrosDisponibles += reg.nombre + " ";
    });

    Swal.fire({
      title: "DEC",
      html:
        "Registros disponibles: " +
        registrosDisponibles +
        "<br>" +
        '<input id="swal-input1" class="swal2-input" placeholder="R1">',
      focusConfirm: false,
      preConfirm: () => {
        return [document.getElementById("swal-input1").value];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "") {
          return;
        }

        //si los registros no existen
        if (!registros.find((reg) => reg.nombre === result.value[0])) {
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
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="R1">' +
        '<input id="swal-input2" class="swal2-input" placeholder="R2">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value[0] === "" || result.value[1] === "") {
          return;
        }

        //si los registros no existen
        if (
          !registros.find((reg) => reg.nombre === result.value[0]) ||
          !registros.find((reg) => reg.nombre === result.value[1])
        ) {
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

  const realizarSecuencia = () => {
    //* 1. cargar instrucciones en la memoria de direcciones
    console.log("instrucciones", instructions);

    let t = 0;

    instructions.forEach((instrucion) => {
      const { tipo } = instrucion;

      if (tipo === "LOAD") {
        console.log("LOAD", t);
        //* direccionamiento por registro
        let codopOperacion = codops.find(
          (codop) => codop.nombre === instrucion.tipo
        ).valor;

        //* obtener el valor del registro
        let registro = identificadoresRegistros.find(
          (reg) => reg.nombre === instrucion.value.split(",")[0]
        ).valor;

        //*convertir el valor a cargar a binario
        let valorBinario = parseInt(instrucion.value.split(",")[1]).toString(2);

        let valor = `${codopOperacion} ${registro} ${valorBinario}`;
        let nombre = `${t}`;
        console.log(nombre, valor);
        agregarInstruccion(nombre, valor);

        t++;
      }
      if (tipo === "MPY") {
        //* direccionamiento por registros
        let codopOperacion = codops.find(
          (codop) => codop.nombre === instrucion.tipo
        ).valor;

        const registros = instrucion.value.split(",");

        const registro1 = identificadoresRegistros.find(
          (reg) => reg.nombre === registros[0].trim()
        ).valor;

        const registro2 = identificadoresRegistros.find(
          (reg) => reg.nombre === registros[1].trim()
        ).valor;

        const valor = `${codopOperacion} ${registro1} ${registro2}`;

        let nombre = `${t}`;
        agregarInstruccion(nombre, valor);

        t++;
      }
      if (tipo === "MOV") {
      }
      if (tipo === "JMP") {
      }
      if (tipo === "ADD") {
        //* direccionamiento por registros
        let codopOperacion = codops.find(
          (codop) => codop.nombre === instrucion.tipo
        ).valor;

        const registros = instrucion.value.split(",");

        const registro1 = identificadoresRegistros.find(
          (reg) => reg.nombre === registros[0].trim()
        ).valor;

        const registro2 = identificadoresRegistros.find(
          (reg) => reg.nombre === registros[1].trim()
        ).valor;

        const valor = `${codopOperacion} ${registro1} ${registro2}`;

        let nombre = `${t}`;
        agregarInstruccion(nombre, valor);

        t++;
      }
      if (tipo === "SUB") {
        //* direccionamiento por registros
        let codopOperacion = codops.find(
          (codop) => codop.nombre === instrucion.tipo
        ).valor;

        const registros = instrucion.value.split(",");

        const registro1 = identificadoresRegistros.find(
          (reg) => reg.nombre === registros[0].trim()
        ).valor;

        const registro2 = identificadoresRegistros.find(
          (reg) => reg.nombre === registros[1].trim()
        ).valor;

        const valor = `${codopOperacion} ${registro1} ${registro2}`;

        let nombre = `${t}`;
        agregarInstruccion(nombre, valor);

        t++;
      }
      if (tipo === "INC") {
        //* direccionamiento por registros
        let codopOperacion = codops.find(
          (codop) => codop.nombre === instrucion.tipo
        ).valor;

        const registros = instrucion.value.split(",");

        const registro1 = identificadoresRegistros.find(
          (reg) => reg.nombre === registros[0].trim()
        ).valor;

        const valor = `${codopOperacion} ${registro1}`;

        let nombre = `${t}`;
        agregarInstruccion(nombre, valor);

        t++;
      }

      if (tipo === "DEC") {
        //* direccionamiento por registros
        let codopOperacion = codops.find(
          (codop) => codop.nombre === instrucion.tipo
        ).valor;

        const registros = instrucion.value.split(",");

        const registro1 = identificadoresRegistros.find(
          (reg) => reg.nombre === registros[0].trim()
        ).valor;

        const valor = `${codopOperacion} ${registro1}`;

        let nombre = `${t}`;
        agregarInstruccion(nombre, valor);

        t++;
      }
      if (tipo === "CMP") {
        //* direccionamiento por registros
        let codopOperacion = codops.find(
          (codop) => codop.nombre === instrucion.tipo
        ).valor;

        const registros = instrucion.value.split(",");

        const registro1 = identificadoresRegistros.find(
          (reg) => reg.nombre === registros[0].trim()
        ).valor;

        const registro2 = identificadoresRegistros.find(
          (reg) => reg.nombre === registros[1].trim()
        ).valor;

        const valor = `${codopOperacion} ${registro1} ${registro2}`;

        let nombre = `${t}`;
        agregarInstruccion(nombre, valor);

        t++;
      }
    });

    //* 2. ejecutar las instrucciones con el ciclo de instruccion

    /*
    FI - Captar instrucción UC
    DI - La instrucción la decodifica la UC
    CO - Calcular la dirección del operando
    FO - Captar el operando
    EI - Ejecutar la instrucción lo hace la (ALU, CPU)
    WO - Escribir la salida 
    CI - Calcular siguiente instrucción
    */

    // pasos.forEach((paso, index) => {
    //   setTimeout(() => {
    //     setStart(paso.inicio);
    //     setEnd(paso.fin);
    //   }, index * 6000);
    // });
  };

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
            <button className="ejecutar" onClick={realizarSecuencia}>
              Ejecutar
            </button>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
            }}
          >
            <div>
              <button className="boton load" onClick={handleLoad}>
                LOAD
              </button>
              <button className="boton neg" onClick={handleMpy}>
                MPY
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
              <button className="boton inc" onClick={handleInc}>
                INC
              </button>
            </div>
            <div>
              <button className="boton dec" onClick={handleDec}>
                DEC
              </button>
              <button className="boton cmp" onClick={handleCmp}>
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
