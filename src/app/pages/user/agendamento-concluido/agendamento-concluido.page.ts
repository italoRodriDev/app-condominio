import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-agendamento-concluido',
  templateUrl: './agendamento-concluido.page.html',
  styleUrls: ['./agendamento-concluido.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AgendamentoConcluidoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
