// frontend/src/app/service/produto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8081/api/produto';

  constructor(private http: HttpClient) { }

  gravar(obj: Produto): Observable<any> {
    return this.http.post(this.apiUrl, obj);
  }

  alterar(obj: Produto): Observable<any> {
    return this.http.put(this.apiUrl, obj);
  }

  apagar(codigo: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${codigo}`);
  }

  carregar(codigo: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${codigo}`);
  }

  carregarVitrine(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/vitrine`);
  }

  fazerBusca(termo: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/busca/${termo}`);
  }
}