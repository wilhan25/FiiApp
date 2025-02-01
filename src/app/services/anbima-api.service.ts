import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosTabela } from '../models/dados-tabela/dados-tabela.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnbimaApiService {

  private apiUrl = 'http://localhost:5170/api/FundosImobiliarios';

  constructor(private http: HttpClient) {}

  getFundosImobiliarios(): Observable<DadosTabela[]> {
    return this.http.get<DadosTabela[]>(this.apiUrl);
  }
}
