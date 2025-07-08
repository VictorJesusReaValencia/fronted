import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthProvider';

export const Tema = ({
  apiBaseUrl,
  campoNombre,
  rutaDetalle,
  rutaEditar,
  componenteDetalle: ComponenteDetalle,
  campoImagen = "imagenes_fb",
}) => {
  const [registros, setRegistros] = useState([]);
  const [nombre, setNombre] = useState('');
  const [paginaActual, setPaginaActual] = useState(1); // Página actual
  const registrosPorPagina = 12; // Tamaño de página
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    obtenerRegistros();
  }, [id]);

  const obtenerRegistros = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/tema/${id}`);
      const datos = await res.json();

      if (datos.status === "success") {
        let items = datos.fotos || datos.items || [];

        if (auth?.role === "gratis") {
          const hoy = new Date();
          const hace30Dias = new Date(hoy.setDate(hoy.getDate() - 30));

          items = items.filter(item => {
            if (!item.fecha_registro) return true;
            const fecha = new Date(item.fecha_registro);
            return fecha < hace30Dias;
          });
        }

        setRegistros(items);
        if (items.length > 0 && campoNombre && items[0][campoNombre]) {
          setNombre(items[0][campoNombre]);
        }
      } else {
        console.error("❌ Error al obtener registros:", datos.message);
      }
    } catch (error) {
      console.error("❌ Error de red:", error);
    }
  };

  const handleClick = (item) => {
    navigate(`${rutaDetalle}/${item._id}`);
  };

  const handleDelete = async (event, idItem) => {
    event.stopPropagation();
    try {
      const res = await fetch(`${apiBaseUrl}/borrar/${idItem}`, { method: "DELETE" });
      const datos = await res.json();
      if (datos.status === "success") {
        obtenerRegistros();
      } else {
        console.error('❌ Error al eliminar:', datos.message);
      }
    } catch (error) {
      console.error('❌ Error de red al eliminar:', error);
    }
  };

  const handleEdit = (event, idItem) => {
    event.stopPropagation();
    navigate(`${rutaEditar}/${idItem}`);
  };

  // Calcular los registros visibles para la página actual
  const indiceInicio = (paginaActual - 1) * registrosPorPagina;
  const indiceFin = indiceInicio + registrosPorPagina;
  const registrosVisibles = registros.slice(indiceInicio, indiceFin);

  const avanzarPagina = () => {
    if (paginaActual < Math.ceil(registros.length / registrosPorPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const retrocederPagina = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  return (
    <main className='main_album'>
      <div className='container_fotografia'>
        <h1>{nombre}</h1>
        {ComponenteDetalle && <ComponenteDetalle />}
        <div className='fotografias-container'>
          {registrosVisibles.map((item) => {
            const imagen = item[campoImagen]?.[0]?.url || null;
            const pendiente = item.pendiente?.trim();
            const revisado = item.revisado?.trim();
            const tieneRevisionNoResuelta = item.revisiones?.some(rev => rev.revision_resuelta === false);

            let claseEstado = '';
            if (pendiente) claseEstado = 'pendiente';
            else if (tieneRevisionNoResuelta) claseEstado = 'revision-no-resuelta';
            else if (revisado !== 'Sí') claseEstado = 'no-revisado';
            else claseEstado = 'revisado';

            return (
              <div
                key={item._id}
                className={`hemerografia-item ${claseEstado}`}
                onClick={() => handleClick(item)}
              >
                {imagen ? (
                  <img src={imagen} className='fotografia-img' alt={`Item ${item.numero_registro}`} />
                ) : (
                  <p>No hay imagen</p>
                )}
                <p className='numero_foto'>{item.numero_registro}</p>
                {pendiente && <p className='pendiente-text'>Pendiente: {pendiente}</p>}

                <button onClick={(e) => handleEdit(e, item._id)}>Editar</button>
                <button onClick={(e) => handleDelete(e, item._id)}>Borrar</button>
              </div>
            );
          })}
        </div>
        <div className='paginacion'>
          <button onClick={retrocederPagina} disabled={paginaActual === 1}>
            Anterior
          </button>
          <span>Página {paginaActual} de {Math.ceil(registros.length / registrosPorPagina)}</span>
          <button onClick={avanzarPagina} disabled={paginaActual === Math.ceil(registros.length / registrosPorPagina)}>
            Siguiente
          </button>
        </div>
      </div>
    </main>
  );
};
