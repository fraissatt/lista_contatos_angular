import { Component, OnInit } from '@angular/core';
import { Compromisso } from '../../models/compromisso';
import { CompromissoService } from '../../services/compromisso.service';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-compromisso-form',
  standalone: true,
  templateUrl: './compromisso-form.component.html',
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    TextareaModule,
    ToastModule,
    ButtonModule
  ]
})
export class CompromissoFormComponent implements OnInit {
  compromisso: Compromisso = {
    id: 0,
    titulo: '',
    descricao: '',
    dataHora: new Date(),
    local: '',
    contatoId: 0,
    status: 'pendente'
  };

  contatos: any[] = [];

  constructor(
    private compromissoService: CompromissoService,
    private contatoService: ContactService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.contatoService.getContatos().subscribe(dados => {
      this.contatos = dados;
    });
  }

  salvar() {
    const agora = new Date();

    if (new Date(this.compromisso.dataHora) < agora) {
      this.messageService.add({
        severity: 'error',
        summary: 'Data inválida',
        detail: 'Não é permitido agendar compromissos no passado.'
      });
      return;
    }

    this.compromissoService.criar(this.compromisso).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Compromisso cadastrado com sucesso!'
      });
      this.router.navigate(['/agenda']);
    });
  }
}
