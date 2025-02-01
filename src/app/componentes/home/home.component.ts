import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AnbimaApiService } from '../../services/anbima-api.service';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { DadosTabela } from '../../models/dados-tabela/dados-tabela.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    MatTableModule,
    CommonModule,
    ToolbarComponent,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  dataSource$: Observable<DadosTabela[]> | null = null;
  dataSource = new MatTableDataSource<DadosTabela>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'sigla',
    'dy',
    'pv',
    'liquidezDiaria',
    'patrimonioLiquido',
    'variacao12Meses',
  ];

  constructor(private fiiService: AnbimaApiService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.OrdenarPorId();
    }, 100);
  }

  FiltrarMaisDividendos(): void {
    this.dataSource$ = this.fiiService.getFundosImobiliarios().pipe(
      map((dados) => dados.sort((a, b) => b.dy - a.dy))
    );
    this.dataSource$.subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator; // Reatribua o paginator após atualizar os dados
    });
  }

  FiltrarMaiorPatrimonio(): void {
    this.dataSource$ = this.fiiService.getFundosImobiliarios().pipe(
      map((dados) => dados.sort((a, b) => b.patrimonioLiquido - a.patrimonioLiquido))
    );
    this.dataSource$.subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator; // Reatribua o paginator após atualizar os dados
    });
  }

  OrdenarPorId(): void {
    this.dataSource$ = this.fiiService.getFundosImobiliarios().pipe(
      map((dados) => dados.sort((a, b) => a.id - b.id)) // Ordena por ID de forma ascendente
    );
    this.dataSource$.subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator; // Reatribua o paginator após atualizar os dados
    });
  }
}