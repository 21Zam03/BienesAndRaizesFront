export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignInResponse {
    id: string;
    email: string;
    nombre_completo: string;
    tipo_usuario: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
    nombre_completo: string;
    tipo_usuario: string;
}

export interface SignUpResponse {
    email: string;
    firstName: string;
    lastName: string;
    message: string;
    status: string;
    role: string;
}

export interface UserLoggedResponse {
    id: string;
    email: string;
    nombre_completo: string;
    tipo_usuario: string;
}
