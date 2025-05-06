import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Compromisso } from '../../models/compromisso';
import { CompromissoService } from '../../services/compromisso.service';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agenda-list',
  standalone: true,
  imports: [
    CommonModule,
    AccordionModule,
    CardModule,
    CalendarModule,
    ButtonModule,
    ToastModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MessageService],
  templateUrl: './agenda-list.component.html',
})
export class AgendaListComponent implements OnInit {
  compromissosOriginais: Compromisso[] = [];
  compromissosFiltrados: Compromisso[] = [];
  compromissosAgrupados: { [data: string]: Compromisso[] } = {};

  dataInicio?: Date;
  dataFim?: Date;

  constructor(
    private compromissoService: CompromissoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.compromissoService.listar().subscribe((dados) => {
      this.compromissosOriginais = dados;
      this.aplicarFiltro(); // Inicializa com todos
    });
  }

  aplicarFiltro() {
    if (!this.dataInicio || !this.dataFim) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Filtro incompleto',
        detail: 'Selecione as duas datas!',
      });
      return;
    }

    const inicio = new Date(this.dataInicio);
    const fim = new Date(this.dataFim);
    fim.setHours(23, 59, 59, 999); // garante incluir o fim do dia

    const filtrados = this.compromissosOriginais.filter((c) => {
      const data = new Date(c.dataHora);
      return data >= inicio && data <= fim;
    });

    if (filtrados.length === 0) {
      this.messageService.add({
        severity: 'info',
        summary: 'Nenhum compromisso',
        detail: 'Nenhum compromisso neste período.',
      });
    }

    this.compromissosFiltrados = filtrados;
    this.agruparCompromissos();
  }

  agruparCompromissos() {
    const agrupado: { [data: string]: Compromisso[] } = {};

    this.compromissosFiltrados.forEach((comp) => {
      const data = new Date(comp.dataHora).toLocaleDateString('pt-BR');
      if (!agrupado[data]) {
        agrupado[data] = [];
      }
      agrupado[data].push(comp);
    });

    this.compromissosAgrupados = agrupado;
  }

  get datasAgrupadas(): string[] {
    return Object.keys(this.compromissosAgrupados);
  }
}
