import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { CiCirclePlus } from "react-icons/ci";
import { BienRaizRequest, postBienRaizService } from "../../services/BienRaizService";
import { useState } from "react";

export default function CreateModal() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formData, setFormData] = useState<Omit<BienRaizRequest, 'imagen'>>({
        nombre: '',
        precio: 0,
        ubicacion: '',
        descripcion: '',
        habitaciones: 0,
        banos: 0,
    });

    const [imagen, setImagen] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'precio' || name === 'habitaciones' || name === 'banos' ? Number(value) : value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImagen(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!imagen) {
            alert('Por favor selecciona una imagen.');
            return;
        }

        const data: BienRaizRequest = { ...formData, imagen };

        try {
            await postBienRaizService(data);
            alert('Publicación creada con éxito!');
            window.location.reload();
            //onOpenChange();
        } catch (error) {
            alert('Hubo un error al crear la publicación.');
        }
    };

    return (
        <>
            <Button color="danger" variant="flat" isIconOnly onPress={onOpen}><CiCirclePlus size={20} /></Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                backdrop="opaque"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Publicar bien raiz</ModalHeader>
                            <ModalBody>
                                <div className="flex gap-2">
                                    <Input type="text" label="Nombre de la casa" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                                    <Input type="text" label="Ubicacion" name="ubicacion" value={formData.ubicacion} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <Input type="text" label="Descripcion" name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
                                </div>
                                <div className="flex gap-2">
                                    <Input type="number" label="Banos" name="banos" value={formData.banos.toString()} onChange={handleInputChange} />
                                    <Input type="number" label="Habitaciones" name="habitaciones" value={formData.habitaciones.toString()} onChange={handleInputChange} />
                                    <Input type="number" label="Precio" name="precio" value={formData.precio.toString()} onChange={handleInputChange} />
                                </div>
                                <div className="">
                                    <Input type="file" onChange={handleFileChange} />
                                </div>
                                <p>----</p>
                            </ModalBody>
                            <ModalFooter className="flex gap-3">
                                <Button variant="flat" fullWidth radius="full" onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="danger" fullWidth radius="full" onClick={handleSubmit}>
                                    Publicar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}