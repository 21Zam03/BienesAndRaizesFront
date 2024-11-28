export interface BienRaizResponse {
    id: string,
    nombre: string,
    precio: number,
    ubicacion: string,
    descripcion: string,
    habitaciones: number,
    banos: number,
    imagen_url: string
}

/*---------------*/

export interface BienRaiz {
    banos: number;
    ubicacion: string;
    precio: number;
    descripcion: string;
    nombre: string;
    imagen_url: string;
    habitaciones: number;
    id: string;
    vendedor_id: string;
}

export interface BienRaizResponse2 {
    message: string;
    data: BienRaiz;
}

