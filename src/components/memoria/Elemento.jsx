import React, { useState } from "react";
import { Popover } from "react-tiny-popover"

const Elemento = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      positions={["top", "bottom", "left", "right"]} // preferred positions by priority
      content={<div
        style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",                                                      
        }}
      >
        <p>Nombre: {data.nombre}</p>
        <p>Valor: {data.valor}</p>
      </div>}
    >
      <div className="memoria-celda"
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {data.nombre}
      </div>
    </Popover>
  );
};

export default Elemento;
