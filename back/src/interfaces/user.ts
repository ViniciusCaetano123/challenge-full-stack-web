export interface IUser {
    id?: string;
    nome: string;
    email: string;
    senha?: string;
    perfil?:string;
    created_at?: string;
    updated_at?: string;
}