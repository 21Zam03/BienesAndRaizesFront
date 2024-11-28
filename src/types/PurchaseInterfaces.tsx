export interface GenerarVentaRequest {
    bien_raiz_id: string | undefined,
    fecha_venta: string | undefined,
    precio_final: number | undefined,
    forma_pago: string | undefined,
    estado: string | undefined,
}

export interface VentaResponse {
    id: string,
    date: string,
    bien_raiz_id: string,
    price: number
}

export interface CompraRespose {
    id: string,
    bien_raiz_id: string,
    vendedor_id: string,
    fecha_venta: string,
    precio_final: 5690,
    estado: string,
    forma_pago: string,
    notas: string
}