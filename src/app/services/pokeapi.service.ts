import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

export interface PokemonListResponse {
  results: { name: string; url: string }[];
}

export interface PokemonDetails {
  position: number;
  name: string;
  url: string;
  type1: string;
  type2: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  // Busca lista de Pokémon
  getPokemonList(): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.apiUrl}?limit=20`);
  }

  // Busca detalhes dos Pokémon e substitui valores null por '-'
  getPokemonWithDetails(): Observable<PokemonDetails[]> {
    return this.getPokemonList().pipe(
      switchMap((response) => {
        const detailsRequests = response.results.map((pokemon, index) =>
          this.http.get<any>(pokemon.url).pipe(
            map((details) => ({
              position: index + 1,
              name: pokemon.name,
              url: pokemon.url,
              type1: details.types[0]?.type?.name ?? '-',
              type2: details.types[1]?.type?.name ?? '-',
            }))
          )
        );
        return forkJoin(detailsRequests);
      })
    );
  }
}