import React from 'react'
import { NavLink } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import { Api } from '../../../hooks/Api';
import { useState, useEffect } from 'react';

export const RegObjetos = () => {
    const { formulario, enviado, cambiado, resetFormulario } = useForm({})
    //----------------------------------Paises, ciudades e instituciones ----------------------------------//
    const [data, setData] = useState(null);
    const [paises, setPaises] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [instituciones, setInstituciones] = useState([]);
    const [selectedPais, setSelectedPais] = useState('');
    const [selectedCiudad, setSelectedCiudad] = useState('');
    //----------------------------------Formulario y sugerencias ----------------------------------//
    const [selectedImages, setSelectedImages] = useState([]);
    const [pdfUrls, setPdfUrls] = useState([]);
    const [value, setValue] = useState('');
    const [sugerencias, setSugerencias] = useState([]);
    const [fieldName, setFieldName] = useState('');
    //----------------------------------Guardar y enviar ----------------------------------//
    const [resultado, setResultado] = useState(false)
    const [fileName, setFileName] = useState('');
    const [saved, setSaved] = useState('not sended');
    const [statuses, setStatuses] = useState({ peticion1: '', peticion2: '', peticion3: '', peticion4: '' });
    const [mensajes, setMensajes] = useState({ mensaje1: '', mensaje2: '', mensaje3: '', mensaje4: '' });
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Este useEffect se encarga de obtener los datos de las instituciones para la parte final del formulario
    // Se hace la peticion la la API y se guardan los datos en data y el primer cammpo en los paises para su seleccion ene l formulario
    useEffect(() => {
        const fetchData = async () => {
            const url = `https://backend-prueba-apel.onrender.com/api/instituciones/listar/todo`;
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
                    console.error("Error al obtener los datos", result.mesage);
                }
            } catch (error) {
                console.error("Error al realizar la petición", error);
            }
        };
        fetchData();
    }, []);
    // Al modificar el campo pais, se actualizan las ciudades y se selecciona la primera si solo hay una
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
    // Una vez seleccionado el pais y la ciudad, se cargan las instituciones correspondientes a la ciudad
    useEffect(() => {
        if (formulario.ciudad && formulario.pais) {
            const instituciones = data[formulario.pais][formulario.ciudad];
            setInstituciones(instituciones);
        }
    }, [formulario.ciudad]);


    // Obtiene las sugerencias de autocompletado desde la API cuando el valor del input cambia y tiene mas de 1 caracter
    useEffect(() => {
        if (value.length > 1 && fieldName) {
            const fetchSugerencias = async () => {
                try {
                    const response = await fetch(`https://backend-prueba-apel.onrender.com/api/objetos/search?query=${value}&campo=${fieldName}`);
                    if (!response.ok) {
                        throw new Error('Error fetching suggestions');
                    }
                    const data = await response.json();
                    setSugerencias(data);
                } catch (err) {
                    console.error('Error fetching suggestions:', err);
                }
            };

            fetchSugerencias();
        } else {
            setSugerencias([]);
        }
    }, [value, fieldName]);
    // NO se que hace
    useEffect(() => {
        return () => {
            // Liberar URLs cuando el componente se desmonte o se cambien los PDFs
            pdfUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [pdfUrls]);
    // Aqui manejamos el estado del formlario, reiniciamos la barra de progreso y los mensajes de error dependiendo de cada peticion
    useEffect(() => {
        setSaved("")
        setLoadingProgress(0);
        setStatuses({
            peticion1: '',
            peticion2: '',
            peticion3: '',
            peticion4: ""
        });
        setMensajes({
            mensaje1: '',
            mensaje2: '',
            mensaje3: '',
            mensaje4: ''
        });
    }, [formulario])

    const handleSelect = (sugerencia) => {
        const e = { target: { name: fieldName, value: sugerencia } }
        if (fieldName) {
            cambiado(e);
            setSugerencias([]);
            console.log(formulario.seccion)
            //setValue(sugerencia); // Actualizar el valor del input con la sugerencia seleccionada
        }
    };

    const handleChange = (e) => {

        if (!e || !e.target) {
            console.error("El evento o el target están indefinidos:", e);
            return;
        }

        const name = e.target.name;
        const value = e.target.value
        setValue(value); // Actualizar el valor del input
        setFieldName(name); // Guardar el nombre del campo para el autocompletado
        cambiado(e); // Actualizar el estado del formulario
    };

    const guardar_foto = async (e) => {
        e.preventDefault();
        let nueva_foto = formulario;
        const { datos } = await Api("https://backend-prueba-apel.onrender.com/api/objetos/registrar", "POST", nueva_foto);
        setLoadingProgress(25); // Incrementa el progreso
        setStatuses(prev => ({ ...prev, peticion1: datos.status }));
        setMensajes(prev => ({ ...prev, mensaje1: datos.mensaje }));

        if (datos.status === "success") {
            //   console.log("status success")
            const fileInput = document.querySelector("#file");
            const formData = new FormData();
            Array.from(fileInput.files).forEach((file, index) => {
                formData.append(`files`, file);
            });
            // console.log("formdata",formData)
            /*const subida2 = await Api(`https://backend-prueba-apel.onrender.com/api/objetos/registrar-imagen/${datos.publicacionGuardada._id}`, "POST", formData, true);
            setLoadingProgress(50); // Incrementa el progreso
            setStatuses(prev => ({ ...prev, peticion2: subida2.datos.status }));
            setMensajes(prev => ({ ...prev, mensaje2: subida2.datos.message }));*/

            const subida = await Api(`https://backend-prueba-apel.onrender.com/api/objetos/registrar-imagen/${datos.publicacionGuardada._id}`, "POST", formData, true);
            setLoadingProgress(75); // Incrementa el progreso
            setStatuses(prev => ({ ...prev, peticion3: subida.datos.status }));
            setMensajes(prev => ({ ...prev, mensaje3: subida.datos.message }));
            // Nueva sección para subir los archivos PDF
            const pdfInput = document.querySelector("#pdf");
            const pdfFormData = new FormData();
            Array.from(pdfInput.files).forEach((file) => {
                pdfFormData.append('pdfs', file);
            });

            //const { pdfSubida } = await Api(`https://backend-prueba-apel.onrender.com/api/objetos/registrar-pdf/${datos.publicacionGuardada._id}`, "POST", pdfFormData, true);
            const pdfSubida2 = await Api(`https://backend-prueba-apel.onrender.com/api/objetos/registrar-pdfs/${datos.publicacionGuardada._id}`, "POST", pdfFormData, true);
            setLoadingProgress(100); // Incrementa el progreso
            setStatuses(prev => ({ ...prev, peticion4: pdfSubida2.datos.status }));
            setMensajes(prev => ({ ...prev, mensaje4: pdfSubida2.datos.message }));
            setResultado(true);
            setSaved("saved");
        } else {
            console.log("status error")
            setSaved("error");
        }
    };
    const handleImageChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setSelectedImages((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // Avoid memory leaks
            );
        }
    };
    const handlePDFChange = (e) => {
        const files = e.target.files;
        const newPdfUrls = Array.from(files).map(file => URL.createObjectURL(file));
        setPdfUrls(prevPdfUrls => [...prevPdfUrls, ...newPdfUrls]); // Agrega las nuevas URLs al estado existente
    };
    return (
        <div>
            <main className='main_registro_hemerografia'>
                <div className='contenedor_registro_hemerografia'>

                    <h1>Formulario de registro de Objetos</h1>



                    <form onSubmit={guardar_foto}>


                        <div className='divisor_form'>
                            <div className="form-group" id='titulo_objetos'>
                                <label>Título</label>
                                <input id='encabezado' type="textarea" name="titulo" placeholder="Título" value={formulario.titulo || ''} onChange={cambiado} />
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
                            <div className="form-group" id="default_objetos">
                                <label htmlFor="nombreTema">Tipo de objetos</label>
                                <input
                                    id="nombreTemaSelect"
                                    type='text'
                                    name="tipo_objetos"
                                    value={formulario.tipo_objetos || ''}
                                    onChange={cambiado}
                                >

                                </input>
                            </div>

                            <div className="form-group" id='default_objetos'>
                                <label>Descripción física :</label>
                                <input type="text" className='autor' name="descripcion_fisica" placeholder="descripcion física" value={formulario.descripcion_fisica || ''} onChange={cambiado} />
                            </div>

                            <div className="form-group" id="default_objetos">
                                <label id='fecha_publicacionLabel'>procedencia</label>
                                <input
                                    type="text"
                                    name="procedencia"
                                    value={formulario.procedencia}
                                    onChange={cambiado}
                                />
                            </div>







                        </div>

                        <div className='form-group' id='imagenes_hemerografia'>
                            <label htmlFor='file0'>Imágenes: </label>
                            <input type='file' onChange={handleImageChange} name='file0' id="file" multiple />
                        </div>
                        <div className="form-group" id='edicion_hemerografia'>
                            <label>Edición:</label>
                            <select id='hallazgo' name="edicion" value={formulario.edicion || ''} onChange={cambiado}>
                                <option value="No">No</option>
                                <option value="Sí">Sí</option>
                            </select>
                        </div>
                        <div className='form-group' id='pdf2'>
                            <label htmlFor='pdfs'>Pdfs: </label>
                            <input type='file' onChange={handlePDFChange} name='pdfs' id='pdf' multiple />
                        </div>


                        <div className='divisor_form_objetos_1'>


                            <div className="form-group" id="resumen_hemerografia">
                                <p id='resumen_hemerografia_p'>Resumen:</p>
                                <textarea
                                    type="text"

                                    name="resumen"
                                    placeholder="Resumen"
                                    value={formulario.resumen || ''}
                                    onChange={handleChange}
                                />
                                {(sugerencias.length > 0 && fieldName === "nombre_tema") && (
                                    <ul className="sugerencias-list">
                                        {sugerencias.map((sugerencia, index) => (
                                            <li key={index} onClick={() => handleSelect(sugerencia)}>
                                                {sugerencia}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="form-group" id="pendientes_hemerografia">
                                <p id='pendientes_hemerografia_p'>Pendientes:</p>
                                <textarea
                                    type="text"
                                    id="transcripcionInput"
                                    name="pendiente"
                                    value={formulario.pendiente || ''}
                                    onChange={cambiado}
                                />
                            </div>
                            <div className='divisor_form'>
                                <div className="form-group" id="transcripcion_hemerografia">
                                    <p>Transcripciòn</p>
                                    <textarea
                                        type="text"
                                        id="transcripcionInput2"
                                        name="transcripcion"
                                        value={formulario.transcripcion || ''}
                                        onChange={cambiado}
                                    />
                                </div>
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
                                <label>Institución:</label>
                                <select id="institucion" name='institucion' value={formulario.institucion || ""} onChange={cambiado}>
                                    <option value="">Seleccionar institución</option>
                                    {instituciones.map((institucion, index) => (
                                        <option key={index} value={institucion}>
                                            {institucion}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group" id='ubicacion_fisica_documentacion'>
                                <label>Ubicación física:</label>
                                <input type='text' name="ubicacion_fisica" value={formulario.ubicacion_fisica || ''} onChange={handleChange}>

                                </input>
                                {(sugerencias.length > 0 && fieldName === "ubicacion_fisica") && (
                                    <ul className="sugerencias-list">
                                        {sugerencias.map((sugerencia, index) => (
                                            <li key={index} onClick={() => handleSelect(sugerencia)}>
                                                {sugerencia}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="form-group" id='coleccion_hemerografia'>
                                <label>Colección:</label>
                                {(sugerencias.length > 0 && fieldName === "coleccion") && (
                                    <ul className="sugerencias-list">
                                        {sugerencias.map((sugerencia, index) => (
                                            <li key={index} onClick={() => handleSelect(sugerencia)}>
                                                {sugerencia}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <input type='text' name="coleccion" value={formulario.coleccion || ''} onChange={handleChange}>
                                    {/*
                                             <option value="">Seleccionar la colección</option>
                                    <option value="Privada">Privada</option>
                                    <option value="Pública">Pública</option>
                                */}

                                </input>
                            </div>
                            <div className="form-group">
                                <label>Año de adquisición:</label>
                                <select id='adq' name="fecha_adquisicion" value={formulario.fecha_adquisicion || ''} onChange={cambiado} >
                                    <option value="">Seleccionar año</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                    <option value="2014">2014</option>
                                    <option value="2013">2013</option>
                                    <option value="2012">2012</option>
                                    <option value="2011">2011</option>
                                    <option value="2010">2010</option>
                                    <option value="2009">2009</option>
                                    <option value="2008">2008</option>
                                    <option value="2007">2007</option>
                                    <option value="2006">2006</option>
                                    <option value="2005">2005</option>
                                    <option value="2004">2004</option>
                                    <option value="2003">2003</option>
                                    <option value="2002">2002</option>

                                </select>
                            </div>
                            <div className="form-group" id='tema_hemerografia'>
                                <label>Tema:</label>
                                {(sugerencias.length > 0 && fieldName === "tema") && (
                                    <ul className="sugerencias-list">
                                        {sugerencias.map((sugerencia, index) => (
                                            <li key={index} onClick={() => handleSelect(sugerencia)}>
                                                {sugerencia}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <input type='text' name="tema" value={formulario.tema || ''} onChange={handleChange}>
                                    {/*
                                       
                                    <option value="">Seleccionar el tema</option>
                                    <option value="El Nacional">El Nacional</option>
                                    <option value="El Imparcial">El Imparcial</option>
                                    <option value="El Mundo">El Mundo</option>
                                    <option value="El Mundo Ilustrado">El Mundo Ilustrado</option>
                                    <option value="El País">El País</option>
                                    <option value="El Paladín">El Paladín</option>
                                    <option value="El Plata">El Plata</option>
                                    <option value="El Siglo">El Siglo</option>
                                    <option value="El Telégrafo">El Telégrafo</option>
                                    <option value="La Defensa">La Defensa</option>
                                    <option value="La Gaceta de Guadalajara">La Gaceta de Guadalajara</option>
                                    <option value="La Mañana">La Mañana</option>
                                    <option value="La Nación">La Nación</option>
                                    <option value="La Razón">La Razón </option>
                                    <option value="La Prensa">La Prensa</option>
                                    <option value="México Libre">México Libre</option>
                                    <option value="Recortes de prensa">Recortes de prensa</option>
                                    */}

                                </input>
                            </div>


                            <div className="form-group" id='hallazgo_deocumentacion'>
                                <label>Hallazgo:</label>
                                <select id='hallazgo' name="hallazgo" value={formulario.hallazgo || ''} onChange={cambiado}>
                                    <option value="No">No</option>
                                    <option value="Sí">Sí</option>
                                </select>
                            </div>

                            <div className="form-group" id='edicion_hemerografia'>
                                <label>Mostrar:</label>
                                <select id='hallazgo' name="mostrar" value={formulario.mostrar || ''} onChange={cambiado}>
                                    <option value="No">No</option>
                                    <option value="Sí">Sí</option>
                                </select>
                            </div>
                            <div className="form-group" id='edicion_hemerografia' >
                                <label>Revisado:</label>
                                <select id='hallazgo' name="revisado" value={formulario.revisado || ''} onChange={cambiado}>
                                    <option value="No">No</option>
                                    <option value="Sí">Sí</option>
                                </select>
                            </div>

                            <div className="form-group" id='persona_registra_documentacion'>
                                <label>Persona que registra:</label>
                                <input type='text' name="persona_registra" value={formulario.persona_registra || ''} onChange={handleChange}>
                                </input>
                                {(sugerencias.length > 0 && fieldName === "persona_registra") && (
                                    <ul className="sugerencias-list">
                                        {sugerencias.map((sugerencia, index) => (
                                            <li key={index} onClick={() => handleSelect(sugerencia)}>
                                                {sugerencia}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <button className="button" onClick={guardar_foto}>Enviar</button>

                        <strong id='saved_text'>{saved === 'saved' ? 'Fotografia actualizada correctamente' : ''}</strong>
                        <strong id="error_text">{saved === 'error' ? 'No se ha registrado la foto ' : ''}</strong>

                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${loadingProgress}%` }}></div>
                            <p className="progress-text">{loadingProgress}%</p>

                        </div>

                        <div className='mensajes_peticiones'>
                            {mensajes.mensaje1 ?
                                <div className='mensajes'>
                                    <strong id='saved_text'>{statuses.peticion1 === 'success' ? 'Información registrada correctamente' : ''}</strong>
                                    <strong id='error_text'>{statuses.peticion1 === 'error' ? 'Error al registrar en base de datos' : ''}</strong>
                                    <h4>Mensaje:</h4>
                                    <p>{mensajes.mensaje1}</p>
                                </div>
                                : ""}
                            {mensajes.mensaje2 ?
                                <div className='mensajes'>
                                    <strong id='saved_text'>{statuses.peticion2 === 'success' ? 'Foto subida al servidor Node' : ''}</strong>
                                    <strong id='error_text'>{statuses.peticion2 === 'error' ? 'Error al registrar en el servidor node' : ''}</strong>
                                    <h4>Mensaje:</h4>
                                    <p> {mensajes.mensaje2}</p>
                                </div>
                                : ""}
                            {mensajes.mensaje3 ?
                                <div className='mensajes'>
                                    <strong id='saved_text'>{statuses.peticion3 === 'success' ? 'Foto subida correctamente a Drive' : ''}</strong>
                                    <strong id='error_text'>{statuses.peticion3 === 'error' ? 'Error al subir foto a Drive' : ''}</strong>
                                    <h4>Mensaje:</h4>
                                    <p>{mensajes.mensaje3}</p>
                                </div>
                                : ""}
                            {mensajes.mensaje4 ?
                                <div className='mensajes'>
                                    <strong id='saved_text'>{statuses.peticion4 === 'success' ? 'PDFs subida correctamente a Drive' : ''}</strong>
                                    <strong id='error_text'>{statuses.peticion4 === 'error' ? 'Error al subir pdf a Drive' : ''}</strong>
                                    <h4>Mensaje:</h4>
                                    <p> {mensajes.mensaje4}</p>
                                </div>
                                : ""}
                        </div>
                        <div className="images-preview">
                            {selectedImages[0] ? <h1>Fotografias subidas</h1> : ""}

                            {selectedImages.map((image, index) => (
                                <div key={index} className="image-preview">
                                    <div className='marco2'>
                                        <img src={image} alt={`Imagen ${index + 1}`} />
                                    </div>
                                </div>
                            ))}

                        </div>
                        {pdfUrls.length > 0 && (
                            <div className="pdf-preview">
                                {pdfUrls[0] ? <h1>PDFs subidos</h1> : ""}
                                {pdfUrls.map((url, index) => (
                                    <div key={index} className="pdf-container">
                                        <embed
                                            src={url}
                                            width="100%"
                                            height="500px"
                                            type="application/pdf"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </form>
                </div>
            </main>
        </div>
    )
}