import { Component } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calc-bazin',
  imports: [
    ToolbarComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './calc-bazin.component.html',
  styleUrl: './calc-bazin.component.scss'
})
export class CalcBazinComponent {

  siglaAcao: string = '';
  cotacao: number = 0;
  yieldEsperado: number = 0;
  dividendosPagos: number = 0;
  precoTeto: number = 0;
  margem_seg: number = 0;

  calcularPrecoTeto(): void {
    if (this.yieldEsperado > 0) {
      this.precoTeto = (this.dividendosPagos / 3) / (this.yieldEsperado / 100);
    } else {
      this.precoTeto = 0;
    }
    this.margem_seg = parseFloat((((this.precoTeto / this.cotacao) - 1) * 100).toFixed(2));
  }

}
