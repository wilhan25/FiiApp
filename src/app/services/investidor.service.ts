import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Investidor } from '../models/investidor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestidorService {

  private apiurl = 'http://localhost:5170/api/Investidor';


  constructor(private http: HttpClient) { }

  // GET: Buscar todos os investidores
  getInvestidores(): Observable<Investidor[]> {
    return this.http.get<Investidor[]>(this.apiurl);
  }

  // GET: Buscar um investidor pelo ID
  getInvestidor(id: number): Observable<Investidor> {
    return this.http.get<Investidor>(`${this.apiurl}/${id}`);
  }

  // POST: Cadastrar um novo investidor
  cadastrarInvestidor(investidor: Investidor): Observable<any> {
    return this.http.post(this.apiurl, investidor);
  }
}
