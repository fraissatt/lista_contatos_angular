import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {
  contatos: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.contactService.getContatos().subscribe(dados => {
      this.contatos = dados;
    });
  }

  remover(id: number) {
    this.contactService.removeContato(id).subscribe(() => {
      this.ngOnInit(); // Atualiza lista após remoção
    });
  }

  verDetalhes(id: number) {
    this.router.navigate(['/contatos', id]);
  }
}
