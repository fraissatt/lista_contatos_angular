import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {
  contatos: Contact[] = [];
  contatosFiltrados: Contact[] = [];
  gruposDisponiveis: string[] = ['Família', 'Trabalho', 'Amigos'];
  grupoSelecionado: string = '';
  somenteFavoritos: boolean = false; // ✅ Novo controle

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.somenteFavoritos = this.router.url.includes('favoritos'); // ✅ Detecta se é a rota /favoritos
    this.contactService.getContatos().subscribe(dados => {
      this.contatos = dados;
      this.filtrarContatos();
    });
  }

  remover(id: number) {
    this.contactService.removeContato(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  verDetalhes(id: number) {
    this.router.navigate(['/contatos', id]);
  }

  alternarFavorito(contato: Contact) {
    contato.isFavorite = !contato.isFavorite;
    this.contactService.addContato(contato).subscribe(() => {
      this.ngOnInit();
    });
  }

  filtrarPorGrupo() {
    this.filtrarContatos();
  }

  private filtrarContatos() {
    let filtrados = [...this.contatos];

    if (this.somenteFavoritos) {
      filtrados = filtrados.filter(c => c.isFavorite);
    }

    if (this.grupoSelecionado) {
      filtrados = filtrados.filter(c => c.groups?.includes(this.grupoSelecionado));
    }

    this.contatosFiltrados = filtrados;
  }
}
