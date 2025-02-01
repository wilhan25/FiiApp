import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() filtroMaisDividendos = new EventEmitter<void>();
  @Output() filtroMaiorPatrimonio = new EventEmitter<void>();
  @Output() filtroOrdenarPorId = new EventEmitter<void>();

  filtrarMaisDividendos(): void {
    this.filtroMaisDividendos.emit();
  }

  filtrarMaiorPatrimonio(): void {
    this.filtroMaiorPatrimonio.emit();
  }

  ordenarPorId(): void {
    this.filtroOrdenarPorId.emit();
  }

}
