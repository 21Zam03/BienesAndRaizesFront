import { Image } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import HouseModal from "../modals/HouseModal";
import { useEffect, useState } from "react";
import { getBienRaizService } from "../../services/BienRaizService";
import { BienRaizResponse } from "../../types/BienRaizInterfaces";

export default function ViviendaSection() {

    const [bienesRaices, setBienesRaices] = useState<BienRaizResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchBienRaices = async () => {
            try {
                const data = await getBienRaizService();
                setBienesRaices(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unexpected error');
            }
        };

        fetchBienRaices();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-4 gap-5 px-20 py-10">
            {bienesRaices.map((item) => (
                <div key={item.id} className="col-span-1">
                    <div className="cursor-pointer">
                        <Image width={300} height={300} src={item.imagen_url} />
                    </div>
                    <div className="flex flex-col ">
                        <div className="flex flex-col py-3">
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-semibold">{item.ubicacion}</p>
                                </div>
                                <div className="flex justify-center items-center gap-2">
                                    <FaStar /><p>4.43</p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-500">A 84 kilometros de distancia</p>
                                <p className="text-gray-500">20 - 25 Nov</p>
                            </div>
                            <div>
                                <p><span className="font-semibold">S/ {item.precio}</span> de noche</p>
                            </div>
                            <HouseModal id={item.id} nombre={item.nombre} precio={item.precio} ubicacion={item.ubicacion} descripcion={item.descripcion} habitaciones={item.habitaciones} banos={item.banos} imagen_url={item.imagen_url}/>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}