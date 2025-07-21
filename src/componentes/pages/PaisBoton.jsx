import React from "react";

const paisBoton = ({ pais, onClick }) => {
  return (
    <button
      onClick={() => onClick(pais)}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      {pais}
    </button>
  );
};

export default paisBoton;
