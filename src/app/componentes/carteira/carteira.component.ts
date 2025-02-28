import { Component } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Investidor } from '../../models/investidor';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvestidorService } from '../../services/investidor.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DadosTabela } from '../../models/dados-tabela/dados-tabela.module';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-carteira',
  imports: [ToolbarComponent, CommonModule, MatCardModule, MatTableModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './carteira.component.html',
  styleUrl: './carteira.component.scss'
})
export class CarteiraComponent {// Colunas que serão exibidas na tabela
  displayedColumns: string[] = ['id', 'sigla', 'dy', 'pv', 'liquidezDiaria', 'patrimonioLiquido', 'variacao12Meses'];
  // DataSource do Material Table
  dataSource: MatTableDataSource<DadosTabela> = new MatTableDataSource<DadosTabela>([]);
  // Formulário para buscar investidor pelo ID
  carteiraForm: FormGroup;
  investidorNome: string = '';
  mensagem: string = '';

  constructor(private fb: FormBuilder, private api: InvestidorService) {
    this.carteiraForm = this.fb.group({
      investidorId: ['', Validators.required]
    });
  }

  onBuscarCarteira() {
    if (this.carteiraForm.valid) {
      const investidorId = this.carteiraForm.value.investidorId;
      this.api.getInvestidor(investidorId).subscribe({
        next: (data: any) => {
          if (data) {
            this.investidorNome = data.nome;
            // Supondo que a API retorne um objeto com uma propriedade "carteira"
            // que é um array de DadosTabela
            const carteira: DadosTabela[] = data.carteira;
            if (carteira && carteira.length > 0) {
              this.dataSource.data = carteira;
              this.mensagem = '';
            } else {
              this.dataSource.data = [];
              this.mensagem = 'Nenhum dado de carteira encontrado para este investidor.';
            }
          } else {
            this.investidorNome = '';
            this.dataSource.data = [];
            this.mensagem = 'Investidor não encontrado.';
          }
        },
        error: (err) => {
          console.error(err);
          this.investidorNome = '';
          this.dataSource.data = [];
          this.mensagem = 'Erro ao buscar investidor.';
        }
      });
    }
  }
}