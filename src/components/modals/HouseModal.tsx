import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { UserLoggedResponse } from "../../types/AuthInterfaces";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoBedOutline, IoPricetagOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { BiBath } from "react-icons/bi";

interface HouseModalProps {
    id: string,
    nombre: string,
    precio: number,
    ubicacion: string,
    descripcion: string,
    habitaciones: number,
    banos: number,
    imagen_url: string
}

const HouseModal: React.FC<HouseModalProps> = ({ id, nombre, precio, ubicacion, descripcion, habitaciones, banos, imagen_url }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [user, setUser] = useState<UserLoggedResponse | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser: UserLoggedResponse = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
            }
        }
    }, []);

    const navigate = useNavigate();

    const buyHandle = () => {
        navigate(`/purchase/${id}`);
    }

    return (
        <>
            <Button variant="light" color="danger" onPress={onOpen}><span className="text-red-700">Ver mas</span></Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                backdrop="opaque"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{nombre}</ModalHeader>
                            <ModalBody>
                                <div className="flex gap-2">
                                    <div className="flex justify-between items-center">
                                        <Image
                                            src={imagen_url}
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 justify-start items-start">
                                        <div className="">
                                            <p className="text-3xl text-red-400">Detalles</p>
                                        </div>
                                        <div className="flex justify-center items-center gap-1">
                                            <IoPricetagOutline />
                                            <p>{precio}</p>
                                        </div>
                                        <div className="flex justify-center items-center gap-1">
                                            <CiLocationOn />
                                            <p>{ubicacion}</p>
                                        </div>
                                        <div className="flex justify-center items-center gap-1">
                                            <IoBedOutline />
                                            <p>{habitaciones} habitaciones</p>
                                        </div>
                                        <div className="flex justify-center items-center gap-1">
                                            <BiBath size={20} />
                                            <p>{banos} baños</p>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex gap-3">
                                <Button className="w-1/2" variant="flat" fullWidth radius="full" onClick={onClose}>
                                    Cerrar
                                </Button>
                                {
                                    user != null ? (
                                        <Button color="danger" fullWidth radius="full" onClick={buyHandle}>
                                            Obtener
                                        </Button>
                                    ) : (
                                        <></>
                                    )
                                }
                            </ModalFooter>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default HouseModal;