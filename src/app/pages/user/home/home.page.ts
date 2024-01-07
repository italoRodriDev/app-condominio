import { CadastroAgendamentoPage } from './../cadastro-agendamento/cadastro-agendamento.page';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { AgendamentoModel } from 'src/app/models/agendamento.model';
import { AgendamentoAreaGourmetService } from 'src/app/services/user/agendamento-area-gourmet.service';
import { InfoAgendamentoPage } from '../info-agendamento/info-agendamento.page';
import * as moment from 'moment';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedComponentsModule],
})
export class HomePage implements OnInit {
  listAgendamentos: Array<AgendamentoModel> = [];
  listDatesCalendar: Array<any> = [];
  constructor(
    private agendamentoAreaGourmetService: AgendamentoAreaGourmetService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getDataService();
  }

  getDataService() {
    this.agendamentoAreaGourmetService.getListItems();
    this.agendamentoAreaGourmetService.listItems.subscribe((list) => {
      this.listAgendamentos = list;
      this.addDaysToCalendar();
    });
  }

  addDaysToCalendar() {
    this.listDatesCalendar = [];
    this.listAgendamentos.forEach((el) => {
      this.listDatesCalendar.push({
        date: el.data,
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      });
    });
  }

  async onClickAgendar() {
    const modal = await this.modalCtrl.create({
      component: CadastroAgendamentoPage,
    });
    await modal.present();
  }

  onClickDateCalendar(ev: any) {
    const value = ev.detail.value;
    const item = this.listAgendamentos.find((el) => el.data == moment(value).format('YYYY-MM-DD'));
    if(item != null) {
      this.onClickItemCardCalendar(item);
    }
  }

  async onClickItemCardCalendar(item: AgendamentoModel) {
    const modal = await this.modalCtrl.create({
      component: InfoAgendamentoPage,
      componentProps: {
        data: item
      }
    });
    await modal.present();
  }

} 
