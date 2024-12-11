//? FI - Captar instrucción UC (para todas)
export const pasosFI = [
    // este no, sería solo que el pc 'cambie de color' para indicar que se está ejecutando
    {
        inicio: 'pc',
        fin: 'mar'
    },
    // aqui empezaría lo de las flechas
    {
        inicio: 'uc',
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
        inicio: 'uc',
        fin: 'pc'
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
export const pasosDI_LOAD = [{
        inicio: 'uc',
        fin: 'busControl'
    },
    {
        inicio: 'busControl',
        fin: 'ir'
    }
]

//? podría ser una función que le entre el registro y el valor?
export const pasosWO_LOAD = [{
        inicio: 'ir',
        fin: 'bancoRegistros'
    },
    {
        inicio: 'uc',
        fin: 'pc'
    }
]

//? MPY, ADD, SUB

//DECODE INSTRUCTION para MPY¿
export const pasosDI_MPY = [{
        inicio: 'uc',
        fin: 'busControl'
    },
    {
        inicio: 'busControl',
        fin: 'ir'
    },
    {
        inicio: 'uc',
        fin: 'busControl'
    },
    {
        inicio: 'busControl',
        fin: 'bancoRegistros'
    },
    {
        inicio: 'bancoRegistros',
        fin: 'alu'
    }
]

// WRITE OUTPUT para MPY
export const pasosWO_MPY = [{
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
export const pasosDI_MOV = [{
        inicio: 'uc',
        fin: 'busControl'
    },
    {
        inicio: 'busControl',
        fin: 'ir'
    }
]

// FETCH OPERAND para MOV
export const pasosFO_MOV = [{
        inicio: 'uc',
        fin: 'busControl'
    },
    {
        inicio: 'busControl',
        fin: 'bancoRegistros'
    },
]

// WRITE OUTPUT para MOV <-- va al mismo sitio
export const pasosWO_MOV = [{
        inicio: 'bancoRegistros',
        fin: 'bancoRegistros'
    },
    {
        inicio: 'uc',
        fin: 'pc'
    }
]

//? MOV CON DIRECCIONAMIENTO POR MEMORIA
export const pasosCO_MOV_MEMORIA = [{
        inicio: 'uc',
        fin: 'busControl'
    },
    {
        inicio: 'busControl',
        fin: 'memoria'
    },
    {
        inicio: 'memoria',
        fin: 'busDirecciones'
    },
    {
        inicio: 'busDirecciones',
        fin: 'mar'
    },
]

export const pasosWO_MOV_MEMORIA = [{
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
    },
    {
        inicio: 'uc',
        fin: 'pc'
    }
]

//? JMP
export const pasosDI_JMP = [{
        inicio: 'uc',
        fin: 'busControl'
    },
    {
        inicio: 'busControl',
        fin: 'ir'
    },
    {
        inicio: 'ir',
        fin: 'pc'
    },
    {
        inicio: 'uc',
        fin: 'pc'
    }
]

//? INC, DEC
export const pasosDI_INC_DEC = [{
        inicio: 'uc',
        fin: 'busControl'
    },
    {
        inicio: 'busControl',
        fin: 'ir'
    }
]

export const pasosCO_INC_DEC = [{
        inicio: 'uc',
        fin: 'bancoRegistros'
    },
    {
        inicio: 'bancoRegistros',
        fin: 'alu'
    }
]

export const pasosEI_INC_DEC = [{
    inicio: 'alu',
    fin: 'bancoRegistros'
}]

export const pasosWO_INC_DEC = [{
    inicio: 'uc',
    fin: 'pc'
}]

// ? CMP
//? CMP CON DIRECCIONAMIENTO POR REGISTRO
export const pasosDI_CMP = [{
        inicio: 'uc',
        fin: 'busControl'
    },
    {
        inicio: 'busControl',
        fin: 'ir'
    }
]

// FETCH OPERAND para CMP, se hace 2 veces
export const pasosFO_CMP = [{
        inicio: 'uc',
        fin: 'busControl'
    },
    {
        inicio: 'busControl',
        fin: 'bancoRegistros'
    },
    {
        inicio: 'bancoRegistros',
        fin: 'alu'
    }
]

// WRITE OUTPUT para CMP <-- se hace 1 vez, el resultado de la comparación se va a guardar
// en el primer registro
export const pasosWO_CMP = [{
        inicio: 'alu',
        fin: 'bancoRegistros'
    },
    {
        inicio: 'uc',
        fin: 'pc'
    }
]

//? CMP CON DIRECCIONAMIENTO INMEIDATO
// aquí se hace 1 vez el FETCH OPERAND de CMP
export const pasosFO_CMP_INMEDIATO = [{
        inicio: 'uc',
        fin: 'busControl'
    },
    {
        inicio: 'busControl',
        fin: 'ir'
    },
    {
        inicio: 'ir',
        fin: 'alu'
    }
]
export const pasosWO_CMP_INMEDIATO = [{
        inicio: 'alu',
        fin: 'bancoRegistros'
    },
    {
        inicio: 'uc',
        fin: 'pc'
    }
]
