import React from "react";
import { TemasInstitucion } from "./TemasInstitucion";

export const CorrespondenciaInstitucion = () => {
    return (
        <TemasInstitucion
            apiEndpoint="http://localhost:3900/api/correspondencia"
            navigatePath="/admin/correspondencia"
            imagePath="http://localhost:3900/imagenes/correspondencia"
        />
    );
};

export const DocumentacionInstitucion = () => {
    return (
        <TemasInstitucion
            apiEndpoint="http://localhost:3900/api/documentacion"
            navigatePath="/admin/documentacion"
            imagePath="http://localhost:3900/imagenes/documentacion"
        />
    );
};

export const FotografiasInstitucion = () => {
    return (
        <TemasInstitucion
            apiEndpoint="http://localhost:3900/api/fotografia"
            navigatePath="/admin/fotografia"
            imagePath="http://localhost:3900/imagenes/fotografia"
        />
    );
};

export const HemerografiaInstitucion = () => {
    return (
        <TemasInstitucion
            apiEndpoint="http://localhost:3900/api/hemerografia"
            navigatePath="/admin/hemerografia"
            imagePath="http://localhost:3900/imagenes/hemerografia"
        />
    );
};

export const IconografiaInstitucion = () => {
    return (
        <TemasInstitucion
            apiEndpoint="http://localhost:3900/api/iconografia"
            navigatePath="/admin/iconografia"
            imagePath="http://localhost:3900/imagenes/iconografia"
        />
    );
};

export const LibrosInstitucion = () => {
    return (
        <TemasInstitucion
            apiEndpoint="http://localhost:3900/api/libros"
            navigatePath="/admin/libros"
            imagePath="http://localhost:3900/imagenes/libros"
        />
    );
};

export const MonumentosInstitucion = () => {
    return (
        <TemasInstitucion
            apiEndpoint="http://localhost:3900/api/monumentos"
            navigatePath="/admin/monumentos"
            imagePath="http://localhost:3900/imagenes/monumentos"
        />
    );
};

export const ObjetosInstitucion = () => {
    return (
        <TemasInstitucion
            apiEndpoint="http://localhost:3900/api/objetos"
            navigatePath="/admin/objetos"
            imagePath="http://localhost:3900/imagenes/objetos"
        />
    );
};

export const PartiturasInstitucion = () => {
    return (
        <TemasInstitucion
            apiEndpoint="http://localhost:3900/api/partituras"
            navigatePath="/admin/partituras"
            imagePath="http://localhost:3900/imagenes/partituras"
        />
    );
};