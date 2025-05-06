export interface Compromisso {
    id: number;
    titulo: string;
    descricao?: string;
    dataHora: Date;
    local: string;
    contatoId: number;
    status?: 'pendente' | 'realizado' | 'cancelado';
  }
  