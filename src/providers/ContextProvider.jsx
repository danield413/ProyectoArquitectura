import { useState } from "react";
import { GlobalContext } from "../context/context";

// Crea el Provider para manejar el estado global
export const GlobalProvider = ({ children }) => {
  // Define el estado global
  const [state, setState] = useState({
    registros: [
      { nombre: "AL", valor: 0 },
      { nombre: "BL", valor: 0 },
      { nombre: "CL", valor: 0 },
      { nombre: "DL", valor: 0 },
    ],
    direcciones: [
      { nombre: "0", valor: 0 },
      { nombre: "1", valor: 0 },
      { nombre: "2", valor: 0 },
      { nombre: "3", valor: 0 },
      { nombre: "4", valor: 0 },
      { nombre: "5", valor: 0 },
      { nombre: "6", valor: 0 },
      { nombre: "7", valor: 0 },
      { nombre: "8", valor: 0 },
      { nombre: "9", valor: 0 },
      { nombre: "10", valor: 0 }, 
      { nombre: "11", valor: 0 },
      { nombre: "12", valor: 0 },
      { nombre: "13", valor: 0 },
      { nombre: "14", valor: 0 },
      { nombre: "15", valor: 0 },
      { nombre: "16", valor: 0 },
      { nombre: "17", valor: 0 },
      { nombre: "18", valor: 0 },
      { nombre: "19", valor: 0 },
      { nombre: "20", valor: 0 },
      { nombre: "21", valor: 0 },
      { nombre: "22", valor: 0 },
      { nombre: "23", valor: 0 },
      { nombre: "24", valor: 0 },
      { nombre: "25", valor: 0 },
      { nombre: "26", valor: 0 },                                 
      { nombre: "27", valor: 0 },
      { nombre: "28", valor: 0 },
      { nombre: "29", valor: 0 },
      { nombre: "30", valor: 0 },
      { nombre: "31", valor: 0 },
    ],
    datos: [
      { nombre: "0", valor: 0 },
      { nombre: "1", valor: 0 },
      { nombre: "2", valor: 0 },
      { nombre: "3", valor: 0 },
      { nombre: "4", valor: 0 },
      { nombre: "5", valor: 0 },
      { nombre: "6", valor: 0 },
      { nombre: "7", valor: 0 },
      { nombre: "8", valor: 0 },
      { nombre: "9", valor: 0 },
      { nombre: "10", valor: 0 }, 
      { nombre: "11", valor: 0 },
      { nombre: "12", valor: 0 },
      { nombre: "13", valor: 0 },
      { nombre: "14", valor: 0 },
      { nombre: "15", valor: 0 },
      { nombre: "16", valor: 0 },
      { nombre: "17", valor: 0 },
      { nombre: "18", valor: 0 },
      { nombre: "19", valor: 0 },
      { nombre: "20", valor: 0 },
      { nombre: "21", valor: 0 },
      { nombre: "22", valor: 0 },
      { nombre: "23", valor: 0 },
      { nombre: "24", valor: 0 },
      { nombre: "25", valor: 0 },
      { nombre: "26", valor: 0 },                                 
      { nombre: "27", valor: 0 },
      { nombre: "28", valor: 0 },
      { nombre: "29", valor: 0 },
      { nombre: "30", valor: 0 },
      { nombre: "31", valor: 0 },
    ],
    mar: 0,
    mbr: 0,
    pc: 0,
    ir: 0,
  });

  // Define el valor que se pasará a los consumidores
  const value = {
    state,
    setState,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
