import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaisBoton from './PaisBoton';
import InstitutionCard from './InstitucionCard';
import GenericList from './ListasGenericas';

export const Instituciones = () => {
  const [ciudades, setCiudades] = useState({});
  const navigate = useNavigate();

  const handleButtonClick = async (pais) => {
    try {
      const response = await fetch(`http://localhost:3900/api/instituciones/pais/${pais}`);
      const data = await response.json();
      const instituciones = data.insti;

      const ciudadesAgrupadas = instituciones.reduce((acc, institucion) => {
        const { ciudad } = institucion;
        if (!acc[ciudad]) {
          acc[ciudad] = [];
        }
        acc[ciudad].push(institucion);
        return acc;
      }, {});

      setCiudades(ciudadesAgrupadas);
    } catch (error) {
      console.error('Error fetching institutions:', error);
    }
  };

  const handleImageClick = (id) => {
    navigate(`/admin/instituciones/${id}`);
  };

  const handleEditClick = (event, fotografiaId) => {
    event.stopPropagation();
    navigate(`/admin/editar/institucion/${fotografiaId}`);
  };

  const paises = [
    'Argentina', 'Canadá', 'Cuba', 'España', 'Estados Unidos',
    'Francia', 'Inglaterra', 'México', 'Portugal', 'Uruguay', 'Venezuela'
  ];

  return (
    <main id="main2">
      <div className="contenedor_instituciones">
        <h1>Instituciones</h1>
        {/* Botones de países */}
        <div className="frame_botones_registro">
          <GenericList
            items={paises}
            renderItem={(pais) => (
              <PaisBoton key={pais} pais={pais} onClick={handleButtonClick} />
            )}
          />
        </div>

        {/* Listado de ciudades e instituciones */}
        <div className="contenedor_ciudades">
          {Object.keys(ciudades).map((ciudad) => (
            <div key={ciudad} className="ciudad">
              <h2>{ciudad}</h2>
              <GenericList
                items={ciudades[ciudad]}
                renderItem={(institucion) => (
                  <div
                    key={institucion.id}
                    className="institucion_contenedor"
                    onClick={() => handleImageClick(institucion.nombre)}
                    style={{ cursor: 'pointer' }}
                  >
                    {institucion.imagenes_fb && institucion.imagenes_fb.length > 0 && (
                      <img
                        src={`${institucion.imagenes_fb[0].url}`}
                        alt={institucion.nombre}
                      />
                    )}
                    <InstitutionCard institution={institucion} />
                    <button
                      onClick={(event) => handleEditClick(event, institucion.nombre)}
                    >
                      Editar
                    </button>
                    <button
                      onClick={(event) => handleEditClick(event, institucion.nombre)}
                    >
                      Borrar
                    </button>
                  </div>
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
