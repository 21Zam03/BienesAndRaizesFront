import { BienRaizResponse, BienRaizResponse2 } from "../types/BienRaizInterfaces";

const API_URL = import.meta.env.VITE_APP_URL;
const END_POINT_SERVICE_1 = import.meta.env.VITE_APP_BIENES_RAIZES_ENDPOINT;

export interface BienRaizRequest {
    nombre: string;
    precio: number;
    ubicacion: string;
    descripcion: string;
    habitaciones: number;
    banos: number;
    imagen: File;
}

export const postBienRaizService = async (data: BienRaizRequest): Promise<void> => {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('precio', data.precio.toString());
    formData.append('ubicacion', data.ubicacion);
    formData.append('descripcion', data.descripcion);
    formData.append('habitaciones', data.habitaciones.toString());
    formData.append('banos', data.banos.toString());
    formData.append('imagen', data.imagen);

    try {
        const response = await fetch(`${API_URL}${END_POINT_SERVICE_1}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Real Estate created successfully:', result);
    } catch (error) {
        console.error('Error creating Real Estate:', error);
        throw error;
    }
};

export const getBienRaizService = async (): Promise<BienRaizResponse[]> => {
    const response = await fetch(`${API_URL}${END_POINT_SERVICE_1}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return response.json();
};

export const getBienRaizOneService = async(houseId:string | undefined): Promise<BienRaizResponse2> => {
    const response = await fetch(`${API_URL}${END_POINT_SERVICE_1}/${houseId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return response.json();

}
