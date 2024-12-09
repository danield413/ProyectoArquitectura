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
  const { state, setState, agregarInstruccion, actualizarProgramCounter } = useStore();
  const { registros, pc, direcciones } = state;

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

  //* Por registro o por memoria
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
                direccionamiento: '0'
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

              if (!registros.find((reg) => reg.nombre === result.value[1])) {
                Swal.fire({
                  title: "Error",
                  text: "El registro no existe",
                  icon: "error",
                });
                return;
              }
              const direccionBinaria = parseInt(direccionMemoria).toString(2).padStart(5, '0'); // Asegurarse de que tenga un ancho fijo, por ejemplo, 5 bits

              const newInstruction = {
                id: instructions.length + 1,
                tipo: "MOV",
                value: direccionBinaria + ", " + registro,
                direccionamiento: '1'
              };
              setInstructions([...instructions, newInstruction]);
            }
          });
        }
      }
    });
  };

  //* inmediato
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
        const direccionBinaria = parseInt(direccion).toString(2).padStart(5, '0'); // Asegurarse de que tenga un ancho fijo, por ejemplo, 5 bits
        const newInstruction = {
          id: instructions.length + 1,
          tipo: "JMP",
          value: direccionBinaria,
        };
        setInstructions([...instructions, newInstruction]);
      }
    });
  };
  //* LOAD R1, VALOR <-- direccionamiento inmediato
  const handleLoad = () => {
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

  //* direccionamiento por registro (o inmediato <--falta) TODO
  const handleCmp = () => {
    let registrosDisponibles = "";
    registros.forEach((reg) => {
      registrosDisponibles += reg.nombre + " ";
    });
  
    Swal.fire({
      title: "CMP",
      html:
        '<select id="direccionamiento" class="swal2-select">' +
        '<option value="registro">Por Registro</option>' +
        '<option value="inmediato">Inmediato</option>' +
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
                direccionamiento: '0'
              };
              setInstructions([...instructions, newInstruction]);
            }
          });
        } else if (direccionamiento === "inmediato") {
          Swal.fire({
            title: "Inmediato",
            html:
              "<p>Registros disponibles:</p>" +
              "<ul>" +
              registrosDisponibles +
              "</ul>" +
              '<input id="swal-input1" class="swal2-input" placeholder="Registro">' +
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
              const valor= parseInt(result.value[1]);
              const registro = result.value[0];

              if (isNaN(valor) || valor < 0 || valor > 31) {
                Swal.fire({
                  title: "Error",
                  text: "El valor debe ser un número entre 0 y 31",
                  icon: "error",
                });
                return;
              }

              if (registro === "") {
                return;
              }
  
              //si el registro no existe
              if (!registros.find((reg) => reg.nombre === result.value[0])) {
                Swal.fire({
                  title: "Error",
                  text: "El registro no existe",
                  icon: "error",
                });
                return;
              }
                         
              const valorBinario = parseInt(valor).toString(2);

              const newInstruction = {
                id: instructions.length + 1,
                tipo: "CMP",
                value: registro + ", " + valorBinario,
                direccionamiento: '1'
              };
              setInstructions([...instructions, newInstruction]);
            }
          });
        }
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
        let tipoDireccionamiento = instrucion.direccionamiento;

        let codopOperacion = codops.find(
          (codop) => codop.nombre === instrucion.tipo
        ).valor;
        // direccionamiento por registro
        if (tipoDireccionamiento === '0') {
           
          const registros = instrucion.value.split(",");
  
          const registro1 = identificadoresRegistros.find(
            (reg) => reg.nombre === registros[0].trim()
          ).valor;
  
          const registro2 = identificadoresRegistros.find(
            (reg) => reg.nombre === registros[1].trim()
          ).valor;
  
          const valor = `${codopOperacion} ${registro1} ${registro2} ${tipoDireccionamiento}`;
  
          let nombre = `${t}`;
          agregarInstruccion(nombre, valor);
  
          t++;
        }
        // direccionamiento por memoria
        else if (tipoDireccionamiento === '1') {
          const registros = instrucion.value.split(",");
          const direccion = registros[0];
          const registro = identificadoresRegistros.find(
            (reg) => reg.nombre === registros[1].trim()
          ).valor;

          const valor = `${codopOperacion} ${direccion} ${registro} ${tipoDireccionamiento}`;
          let nombre = `${t}`;
          agregarInstruccion(nombre, valor);
          t++;
        }
      }
      if (tipo === "JMP") {
        const codopOperacion = codops.find((codop) => codop.nombre === "JMP").valor;
        const direccionBinaria = instrucion.value; 

        const valor = `${codopOperacion} ${direccionBinaria}`;
        let nombre = `${t}`;

        agregarInstruccion(nombre, valor);
        t++;
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
        let tipoDireccionamiento = instrucion.direccionamiento;

        let codopOperacion = codops.find(
          (codop) => codop.nombre === instrucion.tipo
        ).valor;
        // direccionamiento por registro
        if (tipoDireccionamiento === '0') {
           
          const registros = instrucion.value.split(",");
  
          const registro1 = identificadoresRegistros.find(
            (reg) => reg.nombre === registros[0].trim()
          ).valor;
  
          const registro2 = identificadoresRegistros.find(
            (reg) => reg.nombre === registros[1].trim()
          ).valor;
  
          const valor = `${codopOperacion} ${registro1} ${registro2} ${tipoDireccionamiento}`;
  
          let nombre = `${t}`;
          agregarInstruccion(nombre, valor);
  
          t++;
        }
        // direccionamiento inmediato
        else if (tipoDireccionamiento === '1') {
          const registros = instrucion.value.split(",");
          const numero = registros[1];
          const registro = identificadoresRegistros.find(
            (reg) => reg.nombre === registros[0].trim()).valor;

          const valor = `${codopOperacion} ${registro} ${numero} ${tipoDireccionamiento}`;
          let nombre = `${t}`;
          agregarInstruccion(nombre, valor);
          t++;
        }
      }
    });

    //* 2. ejecutar las instrucciones con el ciclo de instruccion

    direcciones.forEach((direccion) => {
      //* por cada instruccion guardada en direcciones hago este ciclo
      
      if (direccion.valor === "") {
        return;
      }

      //? FI - Captar instrucción UC (para todas)
      const pasosFI = [
        {
          inicio: 'pc',
          fin: 'mar'
        },
        {
          inicio: 'uc',
          fin: 'busControl'
        },
        {
          inicio: 'busControl',
          fin: 'mar'
        },
        {
          inicio: 'mar',
          fin: 'busDirecciones'
        },
        {
          inicio: 'busDirecciones',
          fin: 'memoria',
        },
        {
          inicio: 'memoria',
          fin: 'busDatos'
        },
        {
          inicio: 'busDatos',
          fin: 'mbr'
        },
        {
          inicio: 'mbr',
          fin: 'ir'
        },
        {
          inicio: 'pc',
          fin: 'alu'
        },
        {
          inicio: 'alu',
          fin: 'pc'
        }
      ]

      //? LOAD
      const pasosDI_LOAD = [
        {
          inicio: 'uc',
          fin: 'busControl'
        }
      ]

      const pasosFO_LOAD = []

      const pasosWO_LOAD = [
        {
          inicio: 'ir',
          fin: 'bancoRegistros'
        },
        {
          inicio: 'uc',
          fin: 'pc'
        }
      ]

      //? MPY, ADD, SUB
 
      //DECODE INSTRUCTION para MPY
      const pasosDI_MPY = [
        {
          inicio: 'uc',
          fin: 'busControl'
        },
        {
          inicio: 'bancoRegistros',
          fin: 'alu'
        }
      ]

      // WRITE OUTPUT para MPY
      const pasosWO_MPY = [
        {
          inicio: 'alu',
          fin: 'bancoRegistros'
        },
        {
          inicio: 'uc',
          fin: 'pc'
        }
      ]

      //? MOV CON DIRECCIONAMIENTO POR REGISTRO
      // DECODE INSTRUCTION para MOV
      const pasosDI_MOV = [
        {
          inicio: 'uc',
          fin: 'ir'
        }
      ]

      // FETCH OPERAND para MOV
      const pasosFO_MOV = [
        {
          inicio: 'uc',
          fin: 'bancoRegistros'
        }
      ]

      // WRITE OUTPUT para MPY <-- va al mismo sitio
      const pasosWO_MOV = [
        {
          inicio: 'bancoRegistros',
          fin: 'bancoRegistros'
        },
        {
          inicio: 'uc',
          fin: 'pc'
        }
      ]

      //? MOV CON DIRECCIONAMIENTO POR MEMORIA
      const pasosCO_MOV_MEMORIA = [
        {
          inicio: 'memoria',
          fin: 'busDirecciones'
        },
        {
          inicio: 'busDirecciones',
          fin: 'mar'
        },
      ]

      const pasosWO_MOV_MEMORIA = [
        {
          inicio: 'bancoRegistros',
          fin: 'mbr'
        },
        {
          inicio: 'mbr',
          fin: 'busDatos'
        },
        {
          inicio: 'busDatos',
          fin: 'memoria'
        }
      ]

      //? JMP
      const pasosDI_JMP = [
        {
          inicio: 'uc',
          fin: 'ir'
        },
        {
          inicio: 'ir',
          fin: 'pc'
        }
      ]

      //? INC, DEC
      const pasosDI_INC_DEC = [
        {
          inicio: 'uc',
          fin: 'ir'
        }
      ]

      const pasosCO_INC_DEC = [
        {
          inicio: 'uc',
          fin: 'bancoRegistros'
        },
        {
          inicio: 'bancoRegistros',
          fin: 'alu'
        }
      ]

      const pasosEI_INC_DEC = [
        {
          inicio: 'alu',
          fin: 'bancoRegistros'
        }
      ]

      const pasosWO_INC_DEC = [
        {
          inicio: 'uc',
          fin: 'pc'
        }
      ]
      

      
      //*VERIFICAR QUE INSTRUCCION ES
      const tipo = direccion.valor.split(" ")[0];
      const nombreTipo = codops.find((codop) => codop.valor === tipo).nombre;
      

      //* Dependiendo del tipo de operacion, realizamos todos los pasos correspondientes

      //* También debemos creanos metodos en el contextProvider para cambiar los estados, de la memoria, ir, mbr, pc, y asi... para que se actualicen en la interfaz

      if (nombreTipo === "LOAD") {

      }

      if (nombreTipo === "MPY") {

      }

      if (nombreTipo === "MOV") {

      }

      if (nombreTipo === "JMP") {

      }

      if (nombreTipo === "ADD" || nombreTipo === "SUB") {

      }

      if (nombreTipo === "INC" || nombreTipo === "DEC") {

      }

      if (nombreTipo === "CMP") {

      }
      
    })

    /*
    FI - Captar instrucción UC
    DI - La instrucción la decodifica la UC
    CO - Calcular la dirección del operando
    FO - Captar el operando
    EI - Ejecutar la instrucción lo hace la (ALU, CPU)
    WO - Escribir la salida 
    CI - Calcular siguiente instrucción
    */
    
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
          <div id="busDirecciones" className="direcciones" ref={busDireccionesRef}>
            Dir.
          </div>
          <div id="busDatos" className="datos" ref={busDatosRef}>
            Dat.
          </div>
          <div id="busControl" className="control" ref={busControlRef}>
            Ctrl
          </div>
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
        start={start} 
        end={end} 
      />
    </div>
  );
};

export default App;
