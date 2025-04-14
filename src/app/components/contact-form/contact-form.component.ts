import { Component } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ IMPORTAR

@Component({
  selector: 'app-contact-form',
  standalone: true, // ✅ ESSENCIAL
  imports: [FormsModule], // ✅ ESSENCIAL
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  contato: Contact = { id: 0, nome: '', email: '', telefone: '' };

  constructor(private service: ContactService, private router: Router) {}

  salvar() {
    this.service.addContato(this.contato);
    this.router.navigate(['/contatos']);
  }
}
