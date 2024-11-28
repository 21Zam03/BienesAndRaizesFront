import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../types/AuthInterfaces";

const API_URL = import.meta.env.VITE_APP_URL; 
const END_POINT_SERVICE_1 = import.meta.env.VITE_APP_LOGIN_ENDPOINT;
const END_POINT_SERVICE_2 = import.meta.env.VITE_APP_SIGN_UP_ENDPOINT;

export const loginService = async (data: SignInRequest): Promise<SignInResponse> => {
    const response = await fetch(`${API_URL}${END_POINT_SERVICE_1}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });

    if (!response.ok) {
        
        const errorData = await response.json();
        
        if(response.status === 401) {
            throw new Error("Credenciales inválidas. Por favor, inténtalo nuevamente.");
        }

        throw new Error(errorData.message || "Error al iniciar sesión");

    }

    return response.json();
};


export const signUpService = async (data: SignUpRequest): Promise<SignUpResponse> => {
    const response = await fetch(`${API_URL}${END_POINT_SERVICE_2}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
    }

    return response.json();
};






