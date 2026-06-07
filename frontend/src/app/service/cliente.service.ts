// frontend/src/app/service/cliente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8081/api/cliente';

  constructor(private http: HttpClient) { }

  gravar(obj: Cliente): Observable<any> {
    return this.http.post(this.apiUrl, obj);
  }

  alterar(obj: Cliente): Observable<any> {
    return this.http.put(this.apiUrl, obj);
  }

  carregar(codigo: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${codigo}`);
  }

  remover(codigo: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${codigo}`);
  }

  fazerLogin(obj: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/fazerLogin`, obj);
  }
}