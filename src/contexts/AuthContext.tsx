import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SignInResponse, UserLoggedResponse } from '../types/AuthInterfaces';
import { loginService } from '../services/AuthService';

interface AuthContextType {
    error: string | null,
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    //const [user, setUser] = useState<UserLoggedResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const user:SignInResponse = await loginService({email, password});
            const userLogged:UserLoggedResponse = {
                id: user.id,
                email: user.email,
                nombre_completo: user.nombre_completo,
                tipo_usuario: user.tipo_usuario
            }
            localStorage.setItem('user', JSON.stringify(userLogged));
        } catch (err:any) {
            setError(err.message);
            throw err;
        }
    };

    const logout = async () => {
        try {
            // await signOutService();
            localStorage.removeItem("user");
            window.location.reload();
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <AuthContext.Provider value={{ error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};