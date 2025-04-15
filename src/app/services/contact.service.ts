import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/contatos';

  constructor(private http: HttpClient) {}

  getContatos(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  addContato(contato: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contato);
  }

  removeContato(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getContatoById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }
}
