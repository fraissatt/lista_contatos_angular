export interface Contact {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  groups?: string[];   
  isFavorite?: boolean;  
}
