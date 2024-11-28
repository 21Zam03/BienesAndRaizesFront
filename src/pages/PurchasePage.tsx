import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBienRaizOneService } from "../services/BienRaizService";
import { BienRaiz } from "../types/BienRaizInterfaces";
import { Button, Image, Input } from "@nextui-org/react";
import { GenerarVentaRequest } from "../types/PurchaseInterfaces";
import { generarVentaService } from "../services/PurchaseService";

export default function PurchasePage() {
    const { houseId } = useParams<{ houseId: string }>();

    const [house, setHouse] = useState<BienRaiz>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBienRaizOneService(houseId);
                setHouse(response.data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log('Error desconocido');
                }
            }
        };
        fetchData();
    }, []);

    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const makePurchase = async () => {

        const request: GenerarVentaRequest = {
            bien_raiz_id: house?.id,
            fecha_venta: new Date().toISOString(),
            precio_final: house?.precio,
            estado: "cancelada",
            forma_pago: "transferencia bancaria"
        };

        setLoading(true);

        try {
            await generarVentaService(request);
            navigate("/purchaseDetail")
        } catch (error) {
            console.log('Hubo un error');
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="h-screen grid grid-cols-5 gap-2 p-2">
            <div className="col-span-3 flex flex-col border rounded-md px-5 py-2 gap-3">
                <p className="text-2xl">{house?.nombre}</p>
                <Image
                    src={house?.imagen_url}
                    className="h"
                />
                <p className="">{house?.descripcion}</p>
                <p className=""></p>
            </div>
            <div className="col-span-2 rounded-sm px-5">
                <div className="border rounded-lg w-11/12">
                    <div className="flex flex-col gap-3 p-5 border-b">
                        <div>
                            <p className="text-red-600 font-semibold text-lg">Resumen de compra</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="">Sub total</p>
                            <p className="text-red-600 font-semibold text-lg">S/{house?.precio}</p>
                        </div>
                    </div>
                    <div className="p-5 border-b">
                        <div className="flex justify-between">
                            <p className="text-red-600 font-semibold text-lg">Total</p>
                            <p className="">S/{house?.precio}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-5 border-b">
                        <div>
                            <p className="text-sm">¿Tienes un cupo de descuento o codigo?</p>
                        </div>
                        <div className="flex justify-between gap-2">
                            <Input placeholder="Cupon o codigo" />
                            <Button color="danger" variant="bordered">Aplicar</Button>
                        </div>
                    </div>
                    <div className="p-5">
                        <Button onClick={makePurchase} isLoading={loading} color="danger" fullWidth className="p-6"><p className="text-lg font-bold">Proceder al pago</p></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}