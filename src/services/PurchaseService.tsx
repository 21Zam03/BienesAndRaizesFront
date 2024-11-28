import { CompraRespose, GenerarVentaRequest } from "../types/PurchaseInterfaces";

const API_URL = import.meta.env.VITE_APP_URL;
const END_POINT_SERVICE_1 = import.meta.env.VITE_APP_GENERAR_VENTA;
const END_POINT_SERVICE_2 = import.meta.env.VITE_APP_OBTENER_COMPRA;

export const generarVentaService = async (request:GenerarVentaRequest): Promise<void> => {
    const response = await fetch(`${API_URL}${END_POINT_SERVICE_1}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(request),
    });
    return response.json();
};

export const obtenerComprasService = async (): Promise<CompraRespose[]> => {
    const response = await fetch(`${API_URL}${END_POINT_SERVICE_2}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return response.json();
};