import React from 'react'
import { NavLink } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import { Api } from '../../../hooks/Api';
import { useState, useEffect } from 'react';

export const RegTemas2 = () => {
    const { formulario, enviado, cambiado, resetFormulario } = useForm({})
    const [resultado, setResultado] = useState(false)
    const [fileName, setFileName] = useState('');
    const [paises, setPaises] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [instituciones, setInstituciones] = useState([]);
    const [selectedPais, setSelectedPais] = useState('');
    const [selectedCiudad, setSelectedCiudad] = useState('');
    const [saved, setSaved] = useState('not sended');
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const url = `http://localhost:3900/api/instituciones/listar/todo`;
        try {
          const response = await fetch(url, {
            method: "GET"
          });
          const result = await response.json();
          if (result.status === "success") {
            setData(result.data);
            setPaises(Object.keys(result.data));
          } else {
            // Manejo de error
            console.error("Error al obtener los datos", result.message);
          }
        } catch (error) {
          console.error("Error al realizar la petición", error);
        }
      };
      fetchData();
    }, []);
    useEffect(() => {
        setSaved("")
    }, [formulario])

    useEffect(() => {

        if (formulario.pais) {
            const ciudades = Object.keys(data[formulario.pais]);
            setCiudades(ciudades);
            if (ciudades.length === 1) {
                setSelectedCiudad(ciudades[0]);

            } else {
                setSelectedCiudad('');
                setInstituciones([]);
            }
        }
    }, [formulario.pais]);

    useEffect(() => {
        if (formulario.ciudad && formulario.pais) {
            const instituciones = data[formulario.pais][formulario.ciudad];
            setInstituciones(instituciones);
        }
    }, [formulario.ciudad]);


    const guardar_foto = async (e) => {
        e.preventDefault();
        let nueva_foto = formulario;
        console.log("Formulario completo:", nueva_foto);
  console.log("Campo tomo:", nueva_foto.tomo);
        const { datos } = await Api("http://localhost:3900/api/temas/registrar", "POST", nueva_foto);
        console.log(nueva_foto)
        if (datos.status === "successs") {

            const fileInput = document.querySelector("#file");
            const formData = new FormData();
            Array.from(fileInput.files).forEach((file, index) => {
                formData.append(`files`, file);
            });

            const { subida2 } = await Api(`http://localhost:3900/api/temas/registrar-imagen/${datos.publicacionGuardada._id}`, "POST", formData, true);

            setResultado(true);
            setSaved("saved");
        } else {
            console.log("status error")
            setSaved("error");
        }
    };

    return (
        <div>
            <main className='main_registro'>
                <div className='contenedor_formulario_foto'>

                    <h1>Formulario de registro de bienes</h1>


                    <div className='frame_botones_registro' id="regresar_boton">
                        <NavLink to="/registro">
                            <button className="button">Regresar</button>
                        </NavLink>
                    </div>
                    <form onSubmit={guardar_foto}>
                        <h2>Campos generales</h2>

                        <div className='divisor_form'>
                        
                            <div className="form-group" id="nombreTema">
                                <label htmlFor="nombreTemaSelect">Tema</label>
                                <input
                                    type='text'
                                    id="nombreTemaSelect"
                                    name="nombre_tema"
                                    value={formulario.nombre_tema || ''}
                                    onChange={cambiado}
                                >
                    
                                

                                </input>
       
                            </div>
                            
                            <div className="form-group" id="numeroEdicion">
                                <label htmlFor="numeroEdicion">Número de registro</label>
                                <input
                                    type="number"
                                    id="numeroEdicionInput"
                                    name="numero_registro"
                                    value={formulario.numero_registro || ''}
                                    onChange={cambiado}
                                />
                            </div>
                            
                  
                           
                            
                     
                            <div className="form-group" id="periodicidad">
                                <label htmlFor="tipoPublicacion">Periodicidad</label>
                                <select
                                    type="text"
                                    id="periodicidadInput"
                                    name="periodicidad"
                                    placeholder="Tipo de publicación"
                                    value={formulario.periodicidad || ''}
                                    onChange={cambiado}
                                >
                                <option value="">Seleccionar periodicidad</option>
                                <option value="Diaria">Diaria</option>
                                <option value="Semanal">Semanal</option>
                                <option value="Mensual">Mensual</option>
                                </select>
                            </div>

                            <div className="form-group" id="tipoBien">
                                <label htmlFor="tipoBienInput">Tipo de bien</label>
                                <select
                                    type="text"
                                    id="tipoBienInput"
                                    name="tipo_bien"
                                    placeholder="Tipo de bien"
                                    value={formulario.tipo_bien || ''}
                                    onChange={cambiado}
                                >
                                <option value="">Seleccionar tipo de bien</option>
                                <option value="Fotografia">Fotografía</option>
                                <option value="Iconografia">Iconografía</option>
                                <option value="Libros">Libros</option>
                                <option value="Hemerografia">Hemerografía</option>
                                <option value="Correspondencia">Correspondencia</option>
                                <option value="Documentacion">Documentación</option>
                                <option value="Partituras">Partituras</option>
                                <option value="Objetos">Objetos</option>
                                <option value="Monumentos">Monumentos</option>
                                <option value="Audiovisuales">Audiovisuales</option>
                                </select>
                            </div>

                            <div className='form-group'>
                                <label htmlFor='file0'>Imagen</label>
                                <input type='file' name='file0' id="file" multiple/>
                            </div>
                            </div>
                            <div className='divisor_form2'>
                           
                           
                         
                            <div className="form-group"id="resumen">
                                <label htmlFor="resumen" id='resumenLabel'>Resumen</label>
                                <textarea
                                    type="text"
                                    id="resumenInput"
                                    name="resumen"
                                    placeholder="Resumen"
                                    value={formulario.resumen || ''}
                                    onChange={cambiado}
                                />
                            </div>

                            <div className="form-group"id="tomo">
                                <label htmlFor="tomo" id='tomoLabel'>Tomo</label>
                                <textarea
                                    type="text"
                                    id="tomoInput"
                                    name="tomo"
                                    placeholder="Tomo"
                                    value={formulario.tomo|| ''}
                                    onChange={cambiado}
                                />
                            </div>

                            

                            <div className="form-group"id="transcripcion">
                                <label htmlFor="transcripcion" id="transcripcionLabel">Pendiente</label>
                                <textarea
                                    type="text"
                                    id="transcripcionInput"
                                    name="pendiente"
                                    value={formulario.pendiente || ''}
                                    onChange={cambiado}
                                />
                            </div>
                        

                            <div className="form-group">
                                <label>País:</label>
                                <select
                                    id="pais"
                                    name='pais'
                                    value={formulario.pais || ''}
                                    onChange={cambiado}>

                                    <option value="">Seleccionar país</option>
                                    {paises.map((pais) => (
                                        <option key={pais} name="paises" value={pais}>
                                            {pais}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Ciudad:</label>
                                <select
                                    id="ciudad"
                                    name="ciudad"
                                    value={formulario.ciudad || ''}
                                    onChange={cambiado}
                                >
                                    <option value="">Seleccionar ciudad</option>
                                    {ciudades.map((ciudad) => (
                                        <option key={ciudad} value={ciudad}>
                                            {ciudad}
                                        </option>
                                    ))}
                                </select>
                            </div>

                           
                            

                          





                            

                            <div className="form-group">
                                <label>Persona que registra:</label>
                                <select name="persona_registra" value={formulario.persona_registra || ''} onChange={cambiado}>
                                    <option value="">Seleccionar persona que registra</option>
                                    <option value="Mayra Fonseca">Mayra</option>
                                    <option value="Robin">Robin</option>
                                    <option value="Xoely">Xoely</option>
                                    <option value="Perla">Perla</option>
                                </select>
                            </div>

                            
                            </div>
   
                          
                        <button className="button" onClick={guardar_foto}>Enviar</button>
              <strong id='saved_text'>{saved === 'saved' ? 'Fotografia registrada correctamente' : ''}</strong>
              <strong id="error_text">{saved === 'error' ? 'No se ha registrado la foto ' : ''}</strong>
                    </form>
                </div>
            </main>
        </div>
    )
}
