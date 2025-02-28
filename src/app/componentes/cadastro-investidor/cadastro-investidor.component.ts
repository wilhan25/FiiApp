import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvestidorService } from '../../services/investidor.service';
import { Router } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-cadastro-investidor',
  imports: [CommonModule, ReactiveFormsModule, ToolbarComponent],
  templateUrl: './cadastro-investidor.component.html',
  styleUrl: './cadastro-investidor.component.scss'
})
export class CadastroInvestidorComponent {
  investidorForm: FormGroup;
  mensagem: string = '';

  constructor(private fb: FormBuilder, private api: InvestidorService, private router: Router) {
    this.investidorForm = this.fb.group({
      nome: ['', Validators.required],
      fiis: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.investidorForm.valid) {
      const { nome, fiis } = this.investidorForm.value;
      // Converte a string de FIIs em um array de números
      const carteiraArray = fiis.split(',')
                             .map((id: string) => id.trim())
                             .filter((id: string) => id !== '')
                             .map(Number);
  
      // Validação: todos os IDs devem estar entre 1 e 48
      const fiisValidos = carteiraArray.every((id: number) => id >= 1 && id <= 48);
      if (!fiisValidos) {
        this.mensagem = 'Todos os IDs devem estar entre 1 e 48.';
        return;
      }
  
      // Monta o payload com a propriedade "carteira" conforme o esperado
      const payload = { nome, carteira: carteiraArray };
  
      console.log('Payload a ser enviado:', payload);
  
      this.api.cadastrarInvestidor(payload).subscribe({
        next: (response) => {
          this.mensagem = 'Investidor cadastrado com sucesso!';
          this.investidorForm.reset();
        },
        error: (err) => {
          this.mensagem = 'Erro ao cadastrar investidor.';
          console.error(err);
        }
      });
    }
  }
  
}
