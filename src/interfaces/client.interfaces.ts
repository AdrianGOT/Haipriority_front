export interface InitClient {
    id:          number;
    name:        string;
    email:       string;
    roles:       string;
    password?:   string; 
    createdAt?:   Date;
    phoneNumber: string;
}

export interface Client extends InitClient{
    creditCards?: string[];
    debitCards?:  string[];
    loans?:       string[];
}

export interface ClientRegisterInit extends InitClient{
    confirm_password: string;
}

export type ClientLogin = Pick<InitClient, "email" | "password">
export type ClientRegister = Omit<ClientRegisterInit, "id" | "roles" | "createdAt" >
export type ClientToSend = Omit<InitClient, "id" | "roles" | "createdAt" >


export interface LoginResponse { 
    ok     : boolean;
    token  : string;
    client : InitClient;
}