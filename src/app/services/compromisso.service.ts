import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compromisso } from '../models/compromisso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompromissoService {
  private readonly api = 'http://localhost:3000/compromissos';

  constructor(private http: HttpClient) {}

  criar(compromisso: Compromisso): Observable<Compromisso> {
    return this.http.post<Compromisso>(this.api, compromisso);
  }

  listar(): Observable<Compromisso[]> {
    return this.http.get<Compromisso[]>(this.api);
  }

  listarPorContato(contatoId: number): Observable<Compromisso[]> {
    return this.http.get<Compromisso[]>(`${this.api}?contatoId=${contatoId}`);
  }  
  
}
