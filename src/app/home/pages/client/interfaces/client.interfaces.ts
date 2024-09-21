export interface InitClient {
    id:          number;
    name:        string;
    email:       string;
    roles:       ROLES[];
    password?:   string; 
    createdAt?:   Date;
    state?:      boolean;
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
export type ClientUpdate = Pick<InitClient, "email" |"name" | "phoneNumber"|"password"> 

export interface LoginResponse { 
    ok     : boolean;
    token  : string;
    client : InitClient;
}

export enum ROLES {
    user = "USER",
    admin = "ADMIN",
}