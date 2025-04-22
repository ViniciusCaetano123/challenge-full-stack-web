// types/student.ts
export interface IStudent {
    id?: string;
    ra: string;
    nome: string;
    cpf: string;
    email: string;
    created_at?: string;
    updated_at?: string;
  }

export interface IStudentQueryParams  {
    nome?: string;
    email?: string;
    cpf?: string;
    ra?: string;
    pagina: number;
    limite: number;
  }
  