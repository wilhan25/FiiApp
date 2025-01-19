import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnbimaApiService {private tokenUrl = 'https://api.anbima.com.br/oauth/access-token';
  private clientId = 'h0jLn8xQhxYi';
  private clientSecret = 'x9xzHyfPPsRS';

  constructor(private http: HttpClient) {}

  getAccessToken(): Observable<any> {
    const credentials = btoa(`${this.clientId}:${this.clientSecret}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials}`,
    });

    const body = {
      grant_type: 'client_credentials',
    };

    return this.http.post(this.tokenUrl, body, { headers });
  }
}
