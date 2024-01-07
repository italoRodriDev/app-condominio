import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import * as moment from 'moment';
import { AgendamentoModel } from 'src/app/models/agendamento.model';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { FormService } from 'src/app/services/forms/form.service';
import { AgendamentoAreaGourmetService } from 'src/app/services/user/agendamento-area-gourmet.service';

@Component({
  selector: 'app-cadastro-agendamento',
  templateUrl: './cadastro-agendamento.page.html',
  styleUrls: ['./cadastro-agendamento.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CadastroAgendamentoPage implements OnInit {
  form: FormGroup = this.formService.formAgendamento;
  listAgendamentos: Array<AgendamentoModel> = [];
  listDatasOcupadas: Array<any> = [];
  datasLivres: Array<any> = [];
  mesInicial = moment().add(1, 'day').format();
  mesLimite = moment().add(1, 'month').format();

  constructor(
    private service: AgendamentoAreaGourmetService,
    private formService: FormService,
    private modalCtrl: ModalController,
    private alertService: AlertsService
  ) {}

  ngOnInit() {
    this.formService.resetDataForm();
  }

  ionViewDidEnter() {
    this.getDataService();
  }

  getDataService() {
    this.service.listItems.subscribe((list) => {
      this.listAgendamentos = list;
      this.addDaysToCalendar();
    });
  }

  addDaysToCalendar() {
    this.listDatasOcupadas = [];
    this.listAgendamentos.forEach((el) => {
      this.listDatasOcupadas.push({
        date: el.data,
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      });
    });
  }

  isWeekday = (dateString: string) => {
    const date = this.listDatasOcupadas.find((el) => el.date == dateString);
    if (date != null) {
      return false;
    } else {
      return true;
    }
  };

  onClickSave() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.service.validateFormPreSave();
    } else {
      this.alertService.showToast(
        'Preencha todos os campos do formulário antes de salvar!'
      );
    }
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }
}
