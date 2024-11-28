import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { roles } from "../../assets/data/RoleData";
import { signUpService } from "../../services/AuthService";
import { SignUpRequest } from "../../types/AuthInterfaces";

export default function SignUpModal() {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    
    const [message, setMessage] = useState<string>("");  

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!email || !password || !name || !selectedValue) {
            setMessage('Por favor, completa todos los campos.');
            return;
        }
        //setLoading(true);
        const parameters:SignUpRequest = {
            email: email,
            password: password,
            nombre_completo: name,
            tipo_usuario: selectedValue
        }

        try {
            const response = await signUpService(parameters); 
            console.log("Registro exitoso:", response);
            onClose();
            window.location.reload();
        } catch (error: any) {
            console.error("Error al registrarse:", error);
            setMessage(error.message || "Error desconocido al registrarse.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Button variant="flat" color="danger" onPress={onOpen}><span className="text-red-700">Sign Up</span></Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                backdrop="opaque"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            {loading && (
                                <Progress
                                    color="danger"
                                    size="sm"
                                    isIndeterminate
                                    aria-label="Loading..."
                                    className="w-full"
                                />
                            )}
                            <ModalHeader className="flex flex-col gap-1 text-center">Create una cuenta</ModalHeader>
                            <ModalBody>
                                <Input type="text" label="Nombre completo" value={name} onChange={(e) => { setName(e.target.value) }} />
                                <Input type="email" label="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                <Input type="password" label="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                <Select
                                    label="Selecciona un rol"
                                    className="w-full"
                                    onChange={(e) => setSelectedValue(e.target.value)}
                                >
                                    {roles.map((rol) => (
                                        <SelectItem key={rol.key}>
                                            {rol.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <p className="text-red-600">{message}</p>
                            </ModalBody>
                            <ModalFooter className="flex flex-col gap-3">
                                <Button color="danger" fullWidth radius="full" onClick={handleSubmit}>
                                    Crear cuenta
                                </Button>
                            </ModalFooter>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}