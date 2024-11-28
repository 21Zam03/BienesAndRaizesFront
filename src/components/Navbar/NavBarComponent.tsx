import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, User } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AcmeLogo } from "../../assets/icons/AcmeLogo";
import SignInModal from "../modals/SignInModal";
import { UserLoggedResponse } from "../../types/AuthInterfaces";
import { useAuth } from "../../contexts/AuthContext";
import SignUpModal from "../modals/SignUpModal";
import CreateModal from "../modals/CreateModal";
import { CiLogout } from "react-icons/ci";

export default function NavBarComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [user, setUser] = useState<UserLoggedResponse | null>(null);

    const { logout } = useAuth();

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

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <AcmeLogo />
                    <p className="font-bold text-inherit text-red-500">Bienes y raices</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <NavLink color="foreground" to="/">
                        Inicio
                    </NavLink>
                </NavbarItem>
                {
                    user === null ? (
                        <></>
                    ) : (
                        user?.tipo_usuario === "comprador" ? (
                            <NavbarItem isActive>
                                <NavLink color="foreground" to="/purchaseDetail">
                                    Mis compras
                                </NavLink>
                            </NavbarItem>
                        ) : (
                            <NavbarItem isActive>
                                <NavLink color="foreground" to="/purchaseDetail2">
                                    Mis ventas
                                </NavLink>
                            </NavbarItem>
                        )
                    )
                }
            </NavbarContent>
            <NavbarContent justify="end">
                {
                    user === null ? (
                        <>
                            <NavbarItem className="hidden lg:flex">
                                <SignInModal />
                            </NavbarItem>
                            <NavbarItem>
                                <SignUpModal />
                            </NavbarItem>
                        </>
                    ) : (
                        <>
                            <Dropdown placement="bottom-start">
                                <DropdownTrigger>
                                    <User
                                        as="button"
                                        avatarProps={{
                                            isBordered: true,
                                            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                                        }}
                                        className="transition-transform"
                                        description={user?.email}
                                        name={user.nombre_completo}
                                        aria-label={`Menú de usuario de ${user.tipo_usuario}`}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="User Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2" textValue={`Perfil de ${user.nombre_completo}`}>
                                        <p className="font-bold">Logueado como {user.tipo_usuario}</p>
                                        <p className="font-bold">{user.email}</p>
                                    </DropdownItem>
                                    {
                                        user.tipo_usuario === "comprador" ? (
                                            <DropdownItem key="settings" textValue="Configuraciones">
                                                <NavLink to="/purchaseDetail2" className="flex gap-2 items-center">
                                                    <span>Mis Compras</span>
                                                </NavLink>
                                            </DropdownItem>
                                        ) : (
                                            <DropdownItem key="settings" textValue="Configuraciones">
                                                <NavLink to="/purchaseDetail2" className="flex gap-2 items-center">
                                                    <span>Mis Ventas</span>
                                                </NavLink>
                                            </DropdownItem>
                                        )
                                    }
                                    <DropdownItem key="analytics" textValue="Analíticas">
                                        Analíticas
                                    </DropdownItem>
                                    <DropdownItem key="system" textValue="Sistema">
                                        Sistema
                                    </DropdownItem>
                                    <DropdownItem key="configurations" textValue="Configuraciones">
                                        Configuraciones
                                    </DropdownItem>
                                    <DropdownItem key="help_and_feedback" textValue="Ayuda y comentarios">
                                        Ayuda y comentarios
                                    </DropdownItem>
                                    <DropdownItem key="logout" color="primary" onClick={logout} textValue="Cerrar sesión">
                                        <div className="flex gap-2 items-center"><span>Cerrar Sesión</span> <CiLogout /></div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            {
                                user?.tipo_usuario === "vendedor" ? (
                                    <NavbarItem>
                                        <CreateModal />
                                    </NavbarItem>
                                ) : (
                                    <></>
                                )
                            }
                        </>
                    )
                }
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <NavLink
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            to="/"
                        >
                            {item}
                        </NavLink>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}