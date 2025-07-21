    import React from 'react';

    const InstitutionCard = ({ institution }) => {
    return (
        <div className="border p-4 rounded shadow-md">
        <h3 className="text-lg font-bold">{institution.nombre}</h3>
        <p>{institution.descripcion}</p>
        <p className="text-sm text-gray-500">{institution.ciudad}, {institution.pais}</p>
        </div>
    );
    };

    export default InstitutionCard;