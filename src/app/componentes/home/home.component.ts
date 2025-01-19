import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PokeapiService, PokemonDetails } from '../../services/pokeapi.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AnbimaApiService } from '../../services/anbima-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'type1', 'type2'];
  dataSource$: Observable<PokemonDetails[]> = of([]); // Inicializa com um array vazio
  accessToken: string | null = null;

  constructor(private pokemonService: PokeapiService, private anbima: AnbimaApiService) {}

  ngOnInit(): void {
    this.dataSource$ = this.pokemonService.getPokemonWithDetails();

    this.anbima.getAccessToken().subscribe({
      next: (response) => { 
        this.accessToken = response.access_token; 
        console.log('Access Token:', this.accessToken); 
      },
      error: (error) => { 
        console.error('Erro ao obter o access token', error); 
      },
      complete: () => { 
        console.log('Requisição concluída'); 
      }
    });
    
  }
}