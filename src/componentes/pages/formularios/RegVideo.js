import React, { useState, useRef } from 'react';
import { useForm } from '../../../hooks/useForm';
import { Api } from '../../../hooks/Api';

export const RegVideo = () => {
    const { formulario, cambiado, resetFormulario } = useForm({});
    const fileInputRef = useRef(null);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [saved, setSaved] = useState('');
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [resultado, setResultado] = useState(false);
    const [statuses, setStatuses] = useState({
        peticion1: '',
        peticion2: ''
    });
    const [mensajes, setMensajes] = useState({
        mensaje1: '',
        mensaje2: ''
    });

    const handleVideoChange = (e) => {
        if (e.target.files) {
            setSelectedVideos(Array.from(e.target.files));
        }
    };
    const guardar_video = async (e) => {
        e.preventDefault();
        setSaved('');
        setResultado(false);
        setLoadingProgress(10);
        // 1. Registrar los datos del video
        const { datos } = await Api("http://localhost:3900/api/videos/registrar", "POST", formulario);
        console.log("Respuesta registrar video:", datos);
        setLoadingProgress(33);
        setStatuses(prev => ({ ...prev, peticion1: datos.status }));
        setMensajes(prev => ({ ...prev, mensaje1: datos.mensaje }));
        // 2. Si fue exitoso, subir los archivos de video
        if (datos.status === "success" && datos.publicacionGuardada?._id) {
            const videoInput = document.querySelector("#video");
            if (!videoInput || videoInput.files.length === 0) {
                console.warn("No se han seleccionado archivos de video.");
                return;
            }
            const videoFormData = new FormData();
            selectedVideos.forEach((file) => {
                videoFormData.append('files', file);
            });
            const subidaVideo = await Api(
                `http://localhost:3900/api/videos/cargar-videos/${datos.publicacionGuardada._id}`,
                "POST",
                videoFormData,
                true
            );
            setLoadingProgress(66);
            setStatuses(prev => ({ ...prev, peticion2: subidaVideo.datos.status }));
            setMensajes(prev => ({ ...prev, mensaje2: subidaVideo.datos.message }));
            // 3. Finalizar
            setLoadingProgress(100);
            setResultado(true);
            setSaved("saved");
            resetFormulario();
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setSelectedVideos([]);
        } else {
            console.warn("Error al registrar video:", datos);
            setSaved("error");
        }
    };
    return (
        <div>
            <main className="main_registro_video">
                <div className="contenedor_registro_video">
                    <h1>Formulario de registro de Video</h1>
                    <form className="form_video" onSubmit={guardar_video}>
                        <div className="field field--w-100" id="titulo_video">
                            <label htmlFor="titulo">Título:</label>
                            <input
                                className="field--inp-78"
                                type="text"
                                name="titulo"
                                value={formulario.titulo || ''}
                                onChange={cambiado}
                            />
                        </div>

                        <div className="field field--w-100" id="descripcion_video">
                            <label htmlFor="descripcion">Descripción:</label>
                            <textarea
                                className="field--inp-100"
                                name="descripcion"
                                value={formulario.descripcion || ''}
                                onChange={cambiado}
                            />
                        </div>

                        <div className="field field--w-40" id="autor_video">
                            <label htmlFor="autor">Autor:</label>
                            <input
                                className="field--inp-90"
                                type="text"
                                name="autor"
                                value={formulario.autor || ''}
                                onChange={cambiado}
                            />
                        </div>

                        <div className="field field--w-40" id="fecha_video">
                            <label htmlFor="fecha_publicacion">Fecha de publicación:</label>
                            <input
                                className="field--inp-60"
                                type="date"
                                name="fecha_publicacion"
                                value={formulario.fecha_publicacion || ''}
                                onChange={cambiado}
                            />
                        </div>

                        <div className="field field--w-40" id="duracion_video">
                            <label htmlFor="duracion">Duración (segundos):</label>
                            <input
                                className="field--inp-60"
                                type="number"
                                name="duracion"
                                value={formulario.duracion || ''}
                                onChange={cambiado}
                            />
                        </div>

                        <div className="field field--w-40" id="categoria_video">
                            <label htmlFor="categoria">Categoría:</label>
                            <input
                                className="field--inp-60"
                                type="text"
                                name="categoria"
                                value={formulario.categoria || ''}
                                onChange={cambiado}
                            />
                        </div>

                        <div className="field field--w-80" id="etiquetas_video">
                            <label htmlFor="etiquetas">Etiquetas:</label>
                            <input
                                className="field--inp-90"
                                type="text"
                                name="etiquetas"
                                placeholder="ej: cultura,poesía,evento"
                                value={formulario.etiquetas || ''}
                                onChange={cambiado}
                            />
                        </div>

                        <div className="field field--w-100" id="video_files">
                            <label htmlFor="video">Videos:</label>
                            <input
                                ref={fileInputRef}
                                className="field--inp-100"
                                type="file"
                                name="video"
                                id="video"
                                multiple
                                accept="video/*"
                                onChange={handleVideoChange}
                            />
                        </div>

                        <button className="button" type="submit">Enviar</button>
                        <strong id="saved_text">
                            {saved === 'saved' && 'Video registrado correctamente'}
                        </strong>
                        <strong id="error_text">
                            {saved === 'error' && 'No se ha registrado el video'}
                        </strong>

                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${loadingProgress}%` }}></div>
                            <p className="progress-text">{loadingProgress}%</p>
                        </div>

                        <div className="videos-preview">
                            {selectedVideos.length > 0 && <h2>Videos seleccionados</h2>}
                            {selectedVideos.map((file, idx) => (
                                <div key={idx}>
                                    <video width="320" height="240" controls>
                                        <source src={URL.createObjectURL(file)} type={file.type} />
                                        Tu navegador no soporta la reproducción de video.
                                    </video>
                                    <p>{file.name}</p>
                                </div>
                            ))}
                        </div>
                    </form>
                </div>
            </main>
        </div>

    );
};