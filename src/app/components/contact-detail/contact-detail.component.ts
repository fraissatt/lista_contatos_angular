import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { CompromissoService } from '../../services/compromisso.service';
import { Contact } from '../../models/contact';
import { Compromisso } from '../../models/compromisso';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, TabViewModule, CardModule],
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent implements OnInit {
  contato?: Contact;
  compromissos: Compromisso[] = [];

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private compromissoService: CompromissoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.getContatoById(id).subscribe(dado => {
      this.contato = dado;
    });    

    this.compromissoService
      .listarPorContato(id)
      .subscribe((dados) => {
        const agora = new Date();
        this.compromissos = dados.filter((c) => new Date(c.dataHora) > agora);
      });
  }
}
