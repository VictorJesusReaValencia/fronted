import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Inicio } from '../componentes/pages/Inicio';
import { Registro } from '../componentes/pages/Registro';
import { Acervo } from '../componentes/pages/Acervo';
import { Instituciones } from '../componentes/pages/Instituciones';
import { Tienda } from '../componentes/pages/Tienda';
import { PagoSuccess } from '../componentes/pages/PagoSuccess';
import RequireRole from '../context/RequireRole';

import { RegFotografia } from '../componentes/pages/formularios/RegFotografia';
import { RegIconografia } from '../componentes/pages/formularios/RegIconografia';
import { RegLibros } from '../componentes/pages/formularios/RegLibros';
import { RegTemas } from '../componentes/pages/formularios/RegTemas';
import { RegCorrespondencia } from '../componentes/pages/formularios/RegCorrespondencia';
import { RegDocumentacion } from '../componentes/pages/formularios/RegDocumentacion';
import { RegObjetos } from '../componentes/pages/formularios/RegObjetos';
import { RegPartituras } from '../componentes/pages/formularios/RegPartituras';
import { RegMonumentos } from '../componentes/pages/formularios/RegMonumentos';
import { RegAudiovisuales } from '../componentes/pages/formularios/RegAudiovisuales';
import { RegVideo } from '../componentes/pages/formularios/RegVideo';


import { Cortejo } from '../componentes/pages/acervo/temas/Cortejo';
import { AlbumFotos } from '../componentes/pages/acervo/temas/AlbumFotos';
import { PublicLayout2 } from '../componentes/layout/publico/PublicLayout2';
import { Login } from '../componentes/layout/publico/Login';
import { Register } from '../componentes/layout/publico/Register';
import { PrivateLayout } from '../componentes/layout/privado/PrivateLayout';
import { AuthProvider } from '../context/AuthProvider';
import { Logout } from '../componentes/layout/publico/Logout';


import { EditarFotografia } from '../componentes/pages/formularios/Editores/EditarFotografia';
import { EditarHemerografia } from '../componentes/pages/formularios/Editores/EditarHemerografia';





import { EditarIconografia } from '../componentes/pages/formularios/Editores/EditarIconografia';

import { EditarLibros } from '../componentes/pages/formularios/Editores/EditarLibros';

import { EditarCorrespondencia } from '../componentes/pages/formularios/Editores/EditarCorrespondencia';

import { EditarDocumentacion } from '../componentes/pages/formularios/Editores/EditarDocumentacion';
import { EditarPartituras } from '../componentes/pages/formularios/Editores/EditarPartituras';
import { EditarObjetos } from '../componentes/pages/formularios/Editores/EditarObjetos';
import { EditarMonumentos } from '../componentes/pages/formularios/Editores/EditarMonumentos';
import { RegInstituciones } from '../componentes/pages/formularios/RegInstituciones';
import { InstitucionesDetalle } from '../componentes/pages/acervo/detalles/InstitucionesDetalles';
import { FotografiasInstitucion } from '../componentes/pages/instituciones/FotografiasInstitucion';
import { IconografiaInstitucion } from '../componentes/pages/instituciones/IconografiaInstitucion';
import { LibrosInstitucion } from '../componentes/pages/instituciones/LibrosInstitucion';
import { HemerografiaInstitucion } from '../componentes/pages/instituciones/HemerografiaInstitucion';
import { PartiturasInstitucion } from '../componentes/pages/instituciones/PartiturasInstitucion';
import { ObjetosInstitucion } from '../componentes/pages/instituciones/ObjetosInstitucion';
import { MonumentosInstitucion } from '../componentes/pages/instituciones/MonumentosInstitucion';
import { CorrespondenciaInstitucion } from '../componentes/pages/instituciones/CorrespondenciaInstitucion';
import { DocumentacionInstitucion } from '../componentes/pages/instituciones/DocumentacionInstitucion';
import { HemerografiaInstitucionTema } from '../componentes/pages/instituciones/temas/HemerografiaInstitucionTema';
import { IconografiaInstitucionTema } from '../componentes/pages/instituciones/temas/IconografiaInstitucionTema';
import { DocumentacionInstitucionTema } from '../componentes/pages/instituciones/temas/DocumentacionInstitucionTemas';
import { LibrosInstitucionTema } from '../componentes/pages/instituciones/temas/LibrosInstitucionTema';
import { PartiturasInstitucionTema } from '../componentes/pages/instituciones/temas/PartiturasInstitucionTema';
import { CorrespondenciaInstitucionTema } from '../componentes/pages/instituciones/temas/CorrespondenciaInstitucionTema';
import { ObjetosInstitucionTema } from '../componentes/pages/instituciones/temas/ObjetosInstitucionTemas';
import { MonumentosInstitucionTema } from '../componentes/pages/instituciones/temas/MonumentosInstitucionTemas';
import { FotografiaInstitucionTema } from '../componentes/pages/instituciones/temas/FotografiaInstitucionTema';
import { EditarInstitucion } from '../componentes/pages/formularios/Editores/EditarInstitucion';

import { CarpetasRecortes } from '../componentes/pages/acervo/temas/CarpetasRecortes';
import { CarpetaRecortes } from '../componentes/pages/acervo/temas/CarpetaRecortes';
import { RegTemas2 } from '../componentes/pages/formularios/RegTemas2';
import { EditarTemas } from '../componentes/pages/formularios/Editores/EditarTemas';
import { Secciones } from '../componentes/pages/acervo/temas/Secciones';
import { Seccion } from '../componentes/pages/acervo/temas/Seccion';
import { PendientesHemerografia } from '../componentes/pages/acervo/temas/PendientesHemerografia';


import { Bien } from '../componentes/pages/acervo/Bien';
import { Tema } from '../componentes/pages/acervo/Tema';
import { TemaDetalle } from '../componentes/pages/acervo/detalles/TemaDetalle';
import { Detalle } from '../componentes/pages/acervo/Detalle';
import { Videos } from '../componentes/pages/Videos';

export const Rutas = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<PublicLayout2 />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="registrar" element={<Register />} />
            <Route path="inicio" element={<Inicio />} />
            <Route path="registro" element={<Registro />} />
            <Route path="acervo" element={<Acervo />} />
            <Route path="instituciones" element={<Instituciones />} />
            <Route path="registro/fotografia" element={<RegFotografia />} />
            <Route path="registro/iconografia" element={<RegIconografia />} />
            <Route path="registro/libros" element={<RegLibros />} />
            <Route path="registro/temas" element={<RegTemas />} />
            <Route path="registro/correspondencia" element={<RegCorrespondencia />} />
            <Route path="registro/documentacion" element={<RegDocumentacion />} />
            <Route path="registro/objetos" element={<RegObjetos />} />
            <Route path="registro/partituras" element={<RegPartituras />} />
            <Route path="registro/monumentos" element={<RegMonumentos />} />
            <Route path="registro/audiovisuales" element={<RegAudiovisuales />} />

            <Route path="tema/Cortejo fúnebre" element={<Cortejo />} />
            <Route path="album/:id" element={<AlbumFotos />} />
          </Route>

          <Route path="/admin" element={<PrivateLayout />}>
            <Route index element={<Inicio />} />
            <Route path="/admin/login" element={<RequireRole allowedRoles={["admin", "premium"]}><Login /> </RequireRole>} />
            <Route path="/admin/registrar" element={<Register />} />
            <Route path="/admin/inicio" element={
              <RequireRole allowedRoles={["admin", "premium"]}>
                <Inicio />
              </RequireRole>
            } />
            <Route path="/admin/registro" element={<Registro />} />
            <Route path="/admin/acervo" element={<Acervo />} />
            <Route path="/admin/Tienda" element={<Tienda />} />
            <Route path="/admin/success" element={<PagoSuccess />} />
            <Route path="/admin/videos" element={<Videos />} />

            <Route path="/admin/instituciones" element={
              <RequireRole allowedRoles={["admin", "premium"]}>
                <Instituciones />
              </RequireRole>
            } />
            <Route path="/admin/registro/fotografia" element={<RegFotografia />} />
            <Route path="/admin/editar/fotografia/:id" element={<EditarFotografia />} />
            <Route path="/admin/registro/iconografia" element={<RegIconografia />} />
            <Route path="/admin/registro/libros" element={<RegLibros />} />
            <Route path="/admin/registro/temas" element={<RegTemas />} />
            <Route path="/admin/registro/temas2" element={<RegTemas2 />} />
            <Route path="/admin/editar/temas/:id" element={<EditarTemas />} />
            <Route path="/admin/registro/correspondencia" element={<RegCorrespondencia />} />
            <Route path="/admin/registro/documentacion" element={<RegDocumentacion />} />
            <Route path="/admin/registro/objetos" element={<RegObjetos />} />
            <Route path="/admin/registro/partituras" element={<RegPartituras />} />
            <Route path="/admin/registro/monumentos" element={<RegMonumentos />} />
            <Route path="/admin/registro/audiovisuales" element={<RegAudiovisuales />} />
            <Route path="/admin/registro/instituciones" element={<RegInstituciones />} />
            <Route path="/admin/registro/video" element={<RegVideo />} />

            <Route path="/admin/fotografias" element={<Bien
              titulo="Temas de Fotografías"
              apiTemasUrl="https://backend-prueba-apel.onrender.com/api/fotografia/listar-temas"
              apiItemsUrl="https://backend-prueba-apel.onrender.com/api/temas/listar"
              apiBuscarUrl="http://localhost:3900/api/fotografia/buscar"
              rutaItem="/admin/fotografia"
              camposBusqueda={["texto", "anioInicio", "anioFin", "fecha_publicacion", "pais", "ciudad", "tema", "autor", "institucion"]} // No se necesita búsqueda aquí, pero puedes poner campos si lo agregas después
            />} />
            <Route path="/admin/fotografia/tema/:id" element={<Tema
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/fotografia"
              campoNombre="nombre_tema"
              rutaDetalle="/admin/fotografia"
              rutaEditar="/admin/editar/fotografia"
            />} />
            <Route path="/admin/fotografia/:id" element={<Detalle
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/fotografia/foto"
              campoInfo="foto"
              campoImagenes="imagenes_fb"
              camposFicha={[
                { etiqueta: "Título", valor: "titulo" },
                { etiqueta: "Autor", valor: "autor" },
                {
                  etiqueta: "Fecha", valor: (registro) =>
                    `${registro.anio ?? ''}${registro.mes ? `/${registro.mes}` : ''}${registro.dia ? `/${registro.dia}` : ''}`
                },
                { etiqueta: "Colección", valor: "coleccion" },
                { etiqueta: "Álbum", valor: "numero_album" },
                { etiqueta: "Número de Foto", valor: "numero_foto" },
                { etiqueta: "Descripción", valor: "descripcion" },
                { etiqueta: "Ubicación del bien", valor: "institucion" }
              ]}
              camposNavegacion={["pais", "institucion", "tema"]}
              tituloCampo="tema"

            />} />
            <Route path="/admin/tema/Repatriación de los restos de Amado Nervo" element={<Cortejo />} />
            <Route path="/admin/album/:id" element={<AlbumFotos />} />


            <Route path="/admin/hemerografia" element={<Bien
              titulo="Periódicos y Revistas"
              apiTemasUrl="https://backend-prueba-apel.onrender.com/api/hemerografia/listar-temas"
              apiItemsUrl="https://backend-prueba-apel.onrender.com/api/temas/listar"
              apiBuscarUrl="https://backend-prueba-apel.onrender.com/api/hemerografia/buscar"
              rutaItem="/admin/hemerografia"
              camposBusqueda={["texto", "anioInicio", "anioFin", "fecha_publicacion", "pais", "ciudad", "tema"]}
            />} />
            <Route path="/admin/hemerografia/tema/:id" element={<Tema
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/hemerografia"
              campoNombre="nombre_tema"
              rutaDetalle="/admin/hemerografia"
              rutaEditar="/admin/editar/hemerografia"
              componenteDetalle={TemaDetalle}//!ojito
            />} />
            <Route path="/admin/hemerografia/:id" element={<Detalle
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/hemerografia/hemero"
              campoImagenes="imagenes_fb"
              campoPDFs="pdfs"
              tituloCampo="tema"
              camposNavegacion={["pais", "institucion", "tema"]}
              camposFicha={[
                { etiqueta: "Título", valor: "encabezado" },
                { etiqueta: "Periódico", valor: "nombre_tema" },
                { etiqueta: "Número de edición", valor: "numero_edicion" },
                { etiqueta: "Fecha de publicación", valor: "fecha_publicacion" },
                { etiqueta: "Autor", valor: "autor" },
                { etiqueta: "Seudónimo", valor: "seudonimo" },
                { etiqueta: "Páginas", valor: "numero_paginas" },
                { etiqueta: "Columnas", valor: "columnas" },
                { etiqueta: "Género periodístico", valor: "genero_periodistico" },
                { etiqueta: "Lugar de publicación", valor: "lugar_publicacion" },
                { etiqueta: "Periodicidad", valor: "periodicidad" },
              ]}
            />} />
            <Route path="/admin/hemerografia/tema/Recortes de prensa" element={<CarpetasRecortes />} />
            <Route path="/admin/hemerografia/tema/Secciones" element={<Secciones />} />
            <Route path="/admin/hemerografia/tema/pendientes" element={<PendientesHemerografia />} />

            <Route path="/admin/editar/hemerografia/:id" element={<EditarHemerografia />} />
            <Route path="/admin/hemerografia/carpeta/:id" element={<CarpetaRecortes />} />
            <Route path="/admin/hemerografia/seccion/:id" element={<Seccion />} />


            <Route path="/admin/iconografia" element={<Bien
              titulo="iconografia"
              apiTemasUrl="https://backend-prueba-apel.onrender.com/api/iconografia/listar-temas"
              apiItemsUrl="https://backend-prueba-apel.onrender.com/api/temas/listar"
              apiBuscarUrl="https://backend-prueba-apel.onrender.com/api/iconografia/buscar"
              rutaItem="/admin/iconografia"
              camposBusqueda={["institucion", "fecha_registro", "fecha_adquisicion", "ubicacion_fisica"]}
            />} />
            <Route path="/admin/iconografia/tema/:id" element={<Tema
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/iconografia"
              campoNombre="nombre_tema"
              rutaDetalle="/admin/iconografia"
              rutaEditar="/admin/editar/iconografia"
            />} />
            <Route path="/admin/iconografia/:id" element={<Detalle
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/iconografia/icon"
              campoImagenes="imagenes_fb"
              campoPDFs="pdfs"
              tituloCampo="tema"
              campoInfo='icon'
              camposNavegacion={["pais", "institucion", "tema"]}
              camposFicha={[
                { etiqueta: "Título", valor: "encabezado" },
                { etiqueta: "Autor", valor: "autor" },
                { etiqueta: "Fecha", valor: "fecha_publicacion" },
                { etiqueta: "Colección", valor: "coleccion" },
                { etiqueta: "Número Edición", valor: "numero_edicion" },
                { etiqueta: "Número de Foto", valor: "numero_foto" },
                { etiqueta: "Descripción", valor: "descripcion" },
                { etiqueta: "Ubicación del bien", valor: "institucion" }
              ]}
            />} />
            <Route path="/admin/editar/iconografia/:id" element={<EditarIconografia />} />



            <Route path="/admin/libros" element={<Bien
              titulo="Libros"
              apiTemasUrl="https://backend-prueba-apel.onrender.com/api/libros/listar-temas"
              apiItemsUrl="https://backend-prueba-apel.onrender.com/api/temas/listar"
              apiBuscarUrl="https://backend-prueba-apel.onrender.com/api/libros/buscar"
              rutaItem="/admin/libros"
              camposBusqueda={["texto", "anioInicio", "anioFin", "fecha_publicacion", "ciudad", "editorial", "isbn"]}
            />} />
            <Route path="/admin/libros/tema/:id" element={<Tema
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/libros"
              campoNombre="nombre_tema"
              rutaDetalle="/admin/libros"
              rutaEditar="/admin/editar/libros"
            />} />
            <Route path="/admin/libros/:id" element={<Detalle
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/libros/libro"
              campoImagenes="imagenes_fb"
              campoPDFs="pdfs"
              tituloCampo="tema"
              campoInfo='libro'
              camposNavegacion={["pais", "institucion", "tema"]}
              camposFicha={[
                { etiqueta: "Título", valor: "titulo" },
                { etiqueta: "Autor", valor: "autor" },
                { etiqueta: "Prólogo", valor: "prologo" },
                { etiqueta: "Compilador (es)", valor: "compiladores" },
                { etiqueta: "Editorial", valor: "editorial" },
                { etiqueta: "Año de publicación", valor: "fecha_publicacion" },
                { etiqueta: "Lugar de edición", valor: "lugar_edicion" },
                { etiqueta: "Año de reimpresión", valor: "fehca_reimpresion" },
                { etiqueta: "Volumen", valor: "volumen" },
                { etiqueta: "Número de páginas", valor: "numero_paginas" },
                { etiqueta: "ISBN", valor: "isbn" },
                { etiqueta: "Colección/Serie", valor: "coleccion_serie" }
              ]}
            />} />


            <Route path="/admin/editar/libros/:id" element={<EditarLibros />} />






            <Route path="/admin/correspondencia" element={<Bien
              titulo="Correspondencia"
              apiTemasUrl="https://backend-prueba-apel.onrender.com/api/correspondencia/listar-temas"
              apiItemsUrl="https://backend-prueba-apel.onrender.com/api/temas/listar"
              apiBuscarUrl="http://localhost:3900/api/correspondencia/buscar"
              rutaItem="/admin/correspondencia"
              camposBusqueda={["autor", "ciudad", "destinatario", "fecha", "fecha_envio"]} // No se necesita búsqueda aquí, pero puedes poner campos si lo agregas después
              campoComparacion="nombre_tema" // No se compara con otro dataset, así que este campo será irrelevante
            />} />
            <Route path="/admin/correspondencia/tema/:id" element={<Tema
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/correspondencia"
              campoNombre="nombre_tema"
              rutaDetalle="/admin/correspondencia"
              rutaEditar="/admin/editar/correspondencia"
            />} />
            <Route path="/admin/correspondencia/:id" element={<Detalle
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/correspondencia/icon"
              campoImagenes="imagenes_fb"
              campoInfo='Corresp'
              campoPDFs="pdfs"  // Si no hay PDFs, puedes omitir esta prop
              camposFicha={[
                { etiqueta: "Título", valor: "encabezado" },
                { etiqueta: "Autor", valor: "autor" },
                { etiqueta: "Fecha", valor: "fecha_publicacion" },
                { etiqueta: "Colección", valor: "coleccion" },
                { etiqueta: "Número de Edición", valor: "numero_edicion" },
                { etiqueta: "Número de Foto", valor: "numero_foto" },
                { etiqueta: "Descripción", valor: "descripcion" },
                { etiqueta: "Ubicación del bien", valor: "institucion" }
              ]}
              camposNavegacion={["pais", "institucion", "tema"]}
              tituloCampo="tema"
            />
            } />
            <Route path="/admin/editar/correspondencia/:id" element={<EditarCorrespondencia />} />


            <Route path="/admin/documentacion" element={<Bien
              titulo="Documentación"
              apiTemasUrl="https://backend-prueba-apel.onrender.com/api/documentacion/listar-temas"
              apiItemsUrl="https://backend-prueba-apel.onrender.com/api/temas/listar"
              apiBuscarUrl="http://localhost:3900/api/documentacion/buscar"
              rutaItem="/admin/documentacion"
              camposBusqueda={["texto", "titulo", "institucion", "pais", "ciudad", "autor"]} // No se necesita búsqueda aquí, pero puedes poner campos si lo agregas después
              campoComparacion="nombre_tema" // No se compara con otro dataset, así que este campo será irrelevante
            />} />
            <Route path="/admin/documentacion/tema/:id" element={<Tema
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/documentacion"
              campoNombre="nombre_tema"
              rutaDetalle="/admin/documentacion"
              rutaEditar="/admin/editar/documentacion"
            />} />
            <Route path="/admin/documentacion/:id" element={<Detalle
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/documentacion/docu"
              campoInfo="docu"
              campoImagenes="imagenes_fb" // campo que contiene las imágenes
              campoPDFs="pdf" // si no deseas mostrar el PDF con embed, puedes ignorar esta prop
              camposFicha={[
                { etiqueta: "Título", valor: "titulo" },
                { etiqueta: "Institución emisora", valor: "emisor" },
                { etiqueta: "Fecha de emisión", valor: "fecha_emision" },
                { etiqueta: "Lugar de emisión", valor: "lugar_emision" },
                { etiqueta: "Destinatario", valor: "destinatario" },
                { etiqueta: "Número de expediente/carpeta", valor: "numero_expediente" },
                { etiqueta: "Contenido del documento", valor: "contenido" },
                { etiqueta: "Notas", valor: "notas" }
              ]}
              camposNavegacion={["pais", "institucion", "tema"]}
              tituloCampo="tema"
            />
            } />
            <Route path="/admin/editar/documentacion/:id" element={<EditarDocumentacion />} />

            <Route path="/admin/partituras" element={<Bien
              titulo="Partituras"
              apiTemasUrl="https://backend-prueba-apel.onrender.com/api/partituras/listar-temas"
              apiItemsUrl="https://backend-prueba-apel.onrender.com/api/temas/listar"
              apiBuscarUrl="http://localhost:3900/api/partituras/buscar"
              rutaItem="/admin/partituras"
              camposBusqueda={["texto", "anioInicio", "anioFin", "fecha_publicacion", "ciudad", "autor"]}
            />} />
            <Route path="/admin/partituras/tema/:id" element={<Tema
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/partituras"
              campoNombre="nombre_tema"
              rutaDetalle="/admin/partituras"
              rutaEditar="/admin/editar/partituras"
            />} />
            <Route path="/admin/partituras/:id" element={<Detalle
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/partituras/icon"
              campoImagenes="imagenes_fb"
              campoPDFs="pdfs"
              tituloCampo="tema"
              campoInfo='part'
              camposNavegacion={["pais", "institucion", "tema"]}
              camposFicha={[
                { etiqueta: "Título", valor: "encabezado" },
                { etiqueta: "Autor", valor: "autor" },
                { etiqueta: "Fecha", valor: "fecha_publicacion" },
                { etiqueta: "Colección", valor: "coleccion" },
                { etiqueta: "Número Edición", valor: "numero_edicion" },
                { etiqueta: "Número de Foto", valor: "numero_foto" },
                { etiqueta: "Descripción", valor: "descripcion" },
                { etiqueta: "Ubicación del bien", valor: "institucion" }
              ]}
            />} />
            <Route path="/admin/editar/partituras/:id" element={<EditarPartituras />} />

            <Route path="/admin/objetos" element={<Bien
              titulo="Objetos"
              apiTemasUrl="https://backend-prueba-apel.onrender.com/api/objetos/listar-temas"
              apiItemsUrl="https://backend-prueba-apel.onrender.com/api/temas/listar"
              apiBuscarUrl="http://localhost:3900/api/objetos/buscar"
              rutaItem="/admin/objetos"
              camposBusqueda={["texto", "pais", "institucion", "ciudad", "autor"]}
            />} />
            <Route path="/admin/objetos/tema/:id" element={<Tema
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/objetos"
              campoNombre="nombre_tema"
              rutaDetalle="/admin/objetos"
              rutaEditar="/admin/editar/objetos"
            />} />
            <Route path="/admin/objetos/:id" element={<Detalle
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/objetos/icon"
              campoImagenes="imagenes_fb"
              campoPDFs="pdfs"
              tituloCampo="tema"
              campoInfo='obj'
              camposNavegacion={["pais", "institucion", "tema"]}
              camposFicha={[
                { etiqueta: "Título", valor: "encabezado" },
                { etiqueta: "Autor", valor: "autor" },
                { etiqueta: "Fecha", valor: "fecha_publicacion" },
                { etiqueta: "Colección", valor: "coleccion" },
                { etiqueta: "Número Edición", valor: "numero_edicion" },
                { etiqueta: "Número de Foto", valor: "numero_foto" },
                { etiqueta: "Descripción", valor: "descripcion" },
                { etiqueta: "Ubicación del bien", valor: "institucion" }
              ]}
            />} />
            <Route path="/admin/editar/objetos/:id" element={<EditarObjetos />} />

            <Route path="/admin/monumentos" element={<Bien
              titulo="monumentos"
              apiTemasUrl="https://backend-prueba-apel.onrender.com/api/monumentos/listar-temas"
              apiItemsUrl="https://backend-prueba-apel.onrender.com/api/temas/listar"
              apiBuscarUrl="http://localhost:3900/api/monumentos/buscar"
              rutaItem="/admin/monumentos"
              camposBusqueda={["texto", "pais", "institucion", "ciudad", "autor"]}
            />} />
            <Route path="/admin/monumentos/tema/:id" element={<Tema
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/monumentos"
              campoNombre="nombre_tema"
              rutaDetalle="/admin/monumentos"
              rutaEditar="/admin/editar/monumentos"
            />} />
            <Route path="/admin/monumentos/:id" element={<Detalle
              apiBaseUrl="https://backend-prueba-apel.onrender.com/api/monumentos/icon"
              campoImagenes="imagenes_fb"
              campoPDFs="pdfs"
              tituloCampo="tema"
              campoInfo='monu'
              camposNavegacion={["pais", "institucion", "tema"]}
              camposFicha={[
                { etiqueta: "Título", valor: "encabezado" },
                { etiqueta: "Autor", valor: "autor" },
                { etiqueta: "Fecha", valor: "fecha_publicacion" },
                { etiqueta: "Colección", valor: "coleccion" },
                { etiqueta: "Número Edición", valor: "numero_edicion" },
                { etiqueta: "Número de Foto", valor: "numero_foto" },
                { etiqueta: "Descripción", valor: "descripcion" },
                { etiqueta: "Ubicación del bien", valor: "institucion" }
              ]}
            />} />
            <Route path="/admin/editar/monumentos/:id" element={<EditarMonumentos />} />

            <Route path="/admin/instituciones/:id" element={<InstitucionesDetalle />} />
            <Route path="/admin/fotografias/institucion/:id" element={<FotografiasInstitucion />} />
            <Route path="/admin/iconografia/institucion/:id" element={<IconografiaInstitucion />} />
            <Route path="/admin/libros/institucion/:id" element={<LibrosInstitucion />} />
            <Route path="/admin/hemerografia/institucion/:id" element={<HemerografiaInstitucion />} />
            <Route path="/admin/correspondencia/institucion/:id" element={<CorrespondenciaInstitucion />} />
            <Route path="/admin/documentacion/institucion/:id" element={<DocumentacionInstitucion />} />
            <Route path="/admin/partituras/institucion/:id" element={<PartiturasInstitucion />} />
            <Route path="/admin/objetos/institucion/:id" element={<ObjetosInstitucion />} />
            <Route path="/admin/monumentos/institucion/:id" element={<MonumentosInstitucion />} />

            <Route path="/admin/fotografia/:institucionId/:tema" element={<FotografiaInstitucionTema />} />
            <Route path="/admin/hemerografia/:institucionId/:tema" element={<HemerografiaInstitucionTema />} />
            <Route path="/admin/iconografia/:institucionId/:tema" element={<IconografiaInstitucionTema />} />
            <Route path="/admin/documentacion/:institucionId/:tema" element={<DocumentacionInstitucionTema />} />
            <Route path="/admin/libros/:institucionId/:tema" element={<LibrosInstitucionTema />} />
            <Route path="/admin/partituras/:institucionId/:tema" element={<PartiturasInstitucionTema />} />
            <Route path="/admin/correspondencia/:institucionId/:tema" element={<CorrespondenciaInstitucionTema />} />
            <Route path="/admin/objetos/:institucionId/:tema" element={<ObjetosInstitucionTema />} />
            <Route path="/admin/monumentos/:institucionId/:tema" element={<MonumentosInstitucionTema />} />

            <Route path="/admin/editar/institucion/:id" element={<EditarInstitucion />} />

            <Route path='/admin/logout' element={<Logout />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
