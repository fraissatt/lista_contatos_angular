// src/app/services/contact.service.ts
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contatos: Contact[] = [
    { id: 1, nome: 'João', email: 'joao@mail.com', telefone: '1234-5678' },
    { id: 2, nome: 'Maria', email: 'maria@mail.com', telefone: '8765-4321' }
  ];

  getContatos(): Contact[] {
    return this.contatos;
  }

  addContato(contato: Contact) {
    contato.id = Date.now(); // ID simples
    this.contatos.push(contato);
  }

  removeContato(id: number) {
    this.contatos = this.contatos.filter(c => c.id !== id);
  }

  getContatoById(id: number): Contact | undefined {
    return this.contatos.find(c => c.id === id);
  }
}
