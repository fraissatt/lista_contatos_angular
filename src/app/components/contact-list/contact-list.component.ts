import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ IMPORTAR

@Component({
  selector: 'app-contact-list',
  standalone: true, // ✅ ESSENCIAL
  imports: [CommonModule], // ✅ ESSENCIAL
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {
  contatos: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.contatos = this.contactService.getContatos();
  }

  remover(id: number) {
    this.contactService.removeContato(id);
    this.contatos = this.contactService.getContatos();
  }

  verDetalhes(id: number) {
    this.router.navigate(['/contatos', id]);
  }
}
