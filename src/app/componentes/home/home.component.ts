import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PokeapiService, PokemonDetails } from '../../services/pokeapi.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

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

  constructor(private pokemonService: PokeapiService) {}

  ngOnInit(): void {
    this.dataSource$ = this.pokemonService.getPokemonWithDetails();
  }
}