import React, { useState, useEffect } from "react";

export const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  const cargarVideos = (categoria = "") => {
    let url = "http://localhost:3900/api/videos/lista-videos";
    if (categoria) {
      url += `?categoria=${encodeURIComponent(categoria)}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setVideos(data.videos);

          if (!categoria) {
            const todas = data.videos.map((v) => v.categoria).filter(Boolean);
            const unicas = [...new Set(todas.map((c) => c.toLowerCase()))];
            setCategorias(unicas);
          }
        } else {
          console.error("Error al obtener los videos:", data.message);
        }
      })
      .catch((err) => console.error("Error de red:", err));
  };
  useEffect(() => {
    cargarVideos();
  }, []);
  return (
    <main id="main2">
      <div className="contenedor_cronologia">
        <h1>Videos Registrados</h1>
        <div className="filtros-categorias">
          <button
            onClick={() => {
              setCategoriaSeleccionada("");
              cargarVideos();
            }}
          >
            Todos los vidios
          </button>
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategoriaSeleccionada(cat);
                cargarVideos(cat);
              }}
              style={{
                fontWeight: cat === categoriaSeleccionada ? "bold" : "normal",
                textTransform: "capitalize",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="lista-videos">
          {videos.length === 0 ? (
            <p>No hay videos para mostrar.</p>
          ) : (
            videos.map((video) => (
              <div key={video._id} className="video-card">
                {video.firebase_videos?.length > 0 && (
                  <video
                    width="100%"
                    height="auto"
                    controls
                    controlsList="nodownload"
                  >
                    <source
                      src={video.firebase_videos[0].url}
                      type="video/mp4"
                    />
                    Tu navegador no soporta video.
                  </video>
                )}
                <div className="video-info">
                  <h3>{video.titulo}</h3>
                  <p className="video-categoria">
                    <strong>Categoría:</strong> {video.categoria}
                  </p>
                  <p>{video.descripcion}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};
