import { useState } from "react";
import { GlobalContext } from "../context/context";

// Crea el Provider para manejar el estado global
export const GlobalProvider = ({ children }) => {
  // Define el estado global
  const [state, setState] = useState({
    instrucciones: [],
    registros: [
      { nombre: "AL", valor: '' },
      { nombre: "BL", valor: '' },
      { nombre: "CL", valor: '' },
      { nombre: "DL", valor: '' },
    ],
    direcciones: [
      { nombre: "0", valor: ''},
      { nombre: "1", valor: ''},
      { nombre: "2", valor: ''},
      { nombre: "3", valor: ''},
      { nombre: "4", valor: ''},
      { nombre: "5", valor: ''},
      { nombre: "6", valor: ''},
      { nombre: "7", valor: ''},
      { nombre: "8", valor: ''},
      { nombre: "9", valor: ''},
      { nombre: "10", valor: '' }, 
      { nombre: "11", valor: '' },
      { nombre: "12", valor: '' },
      { nombre: "13", valor: '' },
      { nombre: "14", valor: '' },
      { nombre: "15", valor: '' },
      { nombre: "16", valor: '' },
      { nombre: "17", valor: '' },
      { nombre: "18", valor: '' },
      { nombre: "19", valor: '' },
      { nombre: "20", valor: '' },
      { nombre: "21", valor: '' },
      { nombre: "22", valor: '' },
      { nombre: "23", valor: '' },
      { nombre: "24", valor: '' },
      { nombre: "25", valor: '' },
      { nombre: "26", valor: '' },                                 
      { nombre: "27", valor: '' },
      { nombre: "28", valor: '' },
      { nombre: "29", valor: '' },
      { nombre: "30", valor: '' },
      { nombre: "31", valor: '' },
    ],
    datos: [
      { nombre: "0", valor: '' },
      { nombre: "1", valor: '' },
      { nombre: "2", valor: '' },
      { nombre: "3", valor: '' },
      { nombre: "4", valor: '' },
      { nombre: "5", valor: '' },
      { nombre: "6", valor: '' },
      { nombre: "7", valor: '' },
      { nombre: "8", valor: '' },
      { nombre: "9", valor: '' },
      { nombre: "10", valor: '' }, 
      { nombre: "11", valor: '' },
      { nombre: "12", valor: '' },
      { nombre: "13", valor: '' },
      { nombre: "14", valor: '' },
      { nombre: "15", valor: '' },
      { nombre: "16", valor: '' },
      { nombre: "17", valor: '' },
      { nombre: "18", valor: '' },
      { nombre: "19", valor: '' },
      { nombre: "20", valor: '' },
      { nombre: "21", valor: '' },
      { nombre: "22", valor: '' },
      { nombre: "23", valor: '' },
      { nombre: "24", valor: '' },
      { nombre: "25", valor: '' },
      { nombre: "26", valor: '' },                                 
      { nombre: "27", valor: '' },
      { nombre: "28", valor: '' },
      { nombre: "29", valor: '' },
      { nombre: "30", valor: '' },
      { nombre: "31", valor: '' },
    ],
    mar: '',
    mbr: '',
    pc: 0,
    ir: '',
    instruccionActual: 0,
    alu: 0,
  });

  const actualizarProgramCounter = () => {
    setState({
      ...state,
      pc: state.pc + 1,
    });
  };

  const asignarValorRegistro = ( registro, valor) => {
    const registros = state.registros.map((r) => {
      if (r.nombre === registro) {
        r.valor = valor;
      }
      return r;
    });

    setState({
      ...state,
      registros,
    });
  }

  const obtenerValorRegistro = (registro) => {
    const re = state.registros.find((r) => r.nombre === registro);
    return re.valor;
  }


  const agregarInstruccion = (nombre, valor) => {
    
    //* buscar la instruccion en el array de instrucciones
    const instruccion = state.direcciones.find((i) => i.nombre === nombre);

    console.log(instruccion)

    //* modificar el valor de la instruccion
    instruccion.valor = valor;
    //* crear un nuevo array de instrucciones
    const instrucciones = state.instrucciones.map((i) => {
      if (i.nombre === nombre) {
        return instruccion;
      }
      return i;
    });

    //* actualizar el estado
    setState({
      ...state,
      instrucciones,
    });

  };

  

  const asignarDireccion = (direccion, valor) => {
    const direcciones = state.direcciones.map((d) => {
      if (d.nombre === direccion) {
        d.valor = valor;
      }
      return d;
    });

    setState({
      ...state,
      direcciones,
    });
  }

  // Define el valor que se pasará a los consumidores
  const value = {
    state,
    setState,
    actualizarProgramCounter,
    agregarInstruccion,
    asignarValorRegistro,
    obtenerValorRegistro
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
