import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { VotacoesService } from 'src/app/services/admin/votacoes.service';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { VotacaoModel } from 'src/app/models/votacao.model';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import * as moment from 'moment';

@Component({
  selector: 'app-pautas-votacao',
  templateUrl: './pautas-votacao.page.html',
  styleUrls: ['./pautas-votacao.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedComponentsModule],
})
export class PautasVotacaoPage implements OnInit {
  
  listPautas: Array<VotacaoModel> = [];
  listDatesCalendar: Array<any> = [];
  currentMonth = moment().format();

  constructor(
    private service: VotacoesService,
    private modalCtrl: ModalController,
    private alertService: AlertsService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getDataServices();
  }

  getDataServices() {
    this.service.getListItemsMonth(this.currentMonth);
    this.service.listItems.subscribe((list) => {
      this.listPautas = list;
      this.addDaysToCalendar();
    });
  }

  onChangeCalendar(ev: any) {
    console.log(ev);
  }

  addDaysToCalendar() {
    this.listDatesCalendar = [];
    this.listPautas.forEach((el) => {
      this.listDatesCalendar.push({
        date: moment(el.data).format('YYYY-MM-DD'),
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      });
    });
  }
}
