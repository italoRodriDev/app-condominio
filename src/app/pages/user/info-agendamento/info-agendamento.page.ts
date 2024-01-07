import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-info-agendamento',
  templateUrl: './info-agendamento.page.html',
  styleUrls: ['./info-agendamento.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InfoAgendamentoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
