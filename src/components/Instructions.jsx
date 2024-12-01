import React from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';

export const Instructions = () => {
  const instructions = [
    { id: 1, name: 'add' },
    { id: 2, name: 'move' },
    { id: 3, name: 'sub' },
    { id: 4, name: 'jmp' },
  ];

  const [parentRef, values, setValues] = useDragAndDrop(instructions.map(inst => inst.name), { sortable: true });

  return (
    <div className="instructions" ref={parentRef}>
      {values.map((instruction, index) => (
        <div key={index} className="instruction">
          {instruction}
        </div>
      ))}
    </div>
  );
};