import { useContext } from "react";
import { GlobalContext } from "../context/context";

export const useStore = () => {
  const {
    state,
    setState,
    agregarInstruccion,
    actualizarProgramCounter,
    asignarValorRegistro,
    obtenerValorRegistro,
  } = useContext(GlobalContext);

  return {
    state,
    setState,
    agregarInstruccion,
    actualizarProgramCounter,
    asignarValorRegistro,
    obtenerValorRegistro,
  };
};
