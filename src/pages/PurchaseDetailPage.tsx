import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CompraRespose } from "../types/PurchaseInterfaces";
import { obtenerComprasService } from "../services/PurchaseService";

export default function PurchaseDetailPage() {

    const [loading, setLoading] = useState<boolean>(true);
    const [purchases, setPurchases] = useState<CompraRespose[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await obtenerComprasService();
                console.log(response);
                setPurchases(response);
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

    return (
        <div className="h-screen grid grid-cols-5 gap-2 p-2">
            <div className="col-span-3">
                {
                    purchases.length > 0 ? (
                        <Table
                            color="primary"
                            selectionMode="single"
                            defaultSelectedKeys={[purchases[0].id]}
                            aria-label="Example static collection table"
                        >
                            <TableHeader>
                                <TableColumn>ID DE COMPRA</TableColumn>
                                <TableColumn>FECHA</TableColumn>
                                <TableColumn>TOTAL</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {
                                    purchases.map((purchase) => (
                                        <TableRow key={purchase.id}>
                                            <TableCell>{purchase.id}</TableCell>
                                            <TableCell>{purchase.fecha_venta}</TableCell>
                                            <TableCell>S/ {purchase.precio_final}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    ) : (
                        <p>No tienes ni una compra aun</p>
                    )
                }
            </div>
            <div>

            </div>
        </div>
    );
}