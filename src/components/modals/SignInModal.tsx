import { Button, Checkbox, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, useDisclosure } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { LockIcon } from "../../assets/icons/LockIcon";
import { MailIcon } from "../../assets/icons/MailIcon";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function SignInModal() {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [email, setEmail] = useState<string | null>("");
    const [password, setPassword] = useState<string | null>("");
    const [message, setMessage] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const handleSubmit = async () => {

        if (!email || !password) {
            setMessage('Por favor, completa todos los campos.');
            return;
        }
    
        setLoading(true);

        try {
            await login(email, password); 
            onClose();
            window.location.reload();
        } catch (error: any) {
            if (error.message === "Credenciales inválidas. Por favor, inténtalo nuevamente.") {
                setMessage(error.message);
            } else {
                setMessage(error.message || "Error desconocido al iniciar sesión.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="light" color="danger" onPress={onOpen}><span className="text-red-700">Iniciar Sesión</span></Button>
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
                            <ModalHeader className="flex flex-col gap-1">Inicio de sesíon</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    endContent={
                                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Correo"
                                    placeholder="Digita tu correo"
                                    type="email"
                                    variant="bordered"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    endContent={
                                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Contraseña"
                                    placeholder="Digita tu contraseña"
                                    type="password"
                                    variant="bordered"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {
                                    message != null ? (
                                        <p className="text-red-500 text-sm pl-2">{message}</p>
                                    ) : (
                                        <></>
                                    )
                                }
                                <div className="flex py-2 px-1 justify-between">
                                    <Checkbox
                                        color="primary"
                                        classNames={{
                                            label: "text-small dark:text-white",
                                        }}
                                    >
                                        Remember me
                                    </Checkbox>
                                    <Link href="/auth/password" size="sm" color="danger">
                                        ¿Olvidastes tu contraseña?
                                    </Link>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex flex-col gap-3">
                                <Button color="danger" fullWidth radius="full" onClick={handleSubmit}>
                                    Iniciar Sesión
                                </Button>
                                <Button onClick={() => { window.location.href = '' }} variant="bordered" color="danger" radius="full" startContent={<FcGoogle size={20} />}>
                                    Continuar con google
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}