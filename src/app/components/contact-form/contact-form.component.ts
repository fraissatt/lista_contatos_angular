import { Component } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  contato: Contact = { id: 0, nome: '', email: '', telefone: '', groups: [], isFavorite: false };
  gruposDisponiveis: string[] = ['Família', 'Trabalho', 'Amigos']; // Exemplos iniciais

  constructor(private service: ContactService, private router: Router) {}

  salvar() {
    this.service.addContato(this.contato).subscribe(() => {
      this.router.navigate(['/contatos']);
    });
  }
}
