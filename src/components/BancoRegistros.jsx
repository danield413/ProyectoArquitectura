/*
 * Almacena valores temporales , usamos registros
 */

 export const BancoRegistros = () => {
  const registros = ["AX", "AL", "BL", "CL", "AX", "AL", "BL", "CL", "AX", "AL"]; // Nombres de los registros

  return (
    <div className="banco-registros">
      {registros.map((registro) => (
        <div key={registro} className="registro">{registro}</div>
      ))}
    </div>
  );
};
