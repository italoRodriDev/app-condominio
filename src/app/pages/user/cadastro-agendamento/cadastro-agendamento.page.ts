import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import * as moment from 'moment';
import { AgendamentoModel } from 'src/app/models/agendamento.model';
import { ApartamentoModel } from 'src/app/models/apartamento.model';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { AuthService } from 'src/app/services/auth/auth.service';
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
  dataApt: ApartamentoModel | undefined;
  form: FormGroup = this.formService.formAgendamento;
  listAgendamentos: Array<AgendamentoModel> = [];
  listDatasOcupadas: Array<any> = [];
  datasLivres: Array<any> = [];
  mesInicial = moment().add(1, 'day').format();
  mesLimite = moment().add(1, 'month').format();
  disabledItemUser: boolean = false;

  constructor(
    private authService: AuthService,
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
    this.authService.bsDataApt.subscribe((data: ApartamentoModel) => {
      if (data != null) {
        this.form.patchValue({
          nomeResponsavel: data.nome,
          apartamento: data.numeroBloco,
        });
        this.disabledItemUser = true;
      } else {
        this.disabledItemUser = false;
      }
    });

    this.service.listItems.subscribe((list) => {
      this.listAgendamentos = list;
      this.addDaysToCalendar();
    });
  }

  addDaysToCalendar() {
    this.listDatasOcupadas = [];
    this.listAgendamentos.forEach((el) => {
      this.listDatasOcupadas.push({
        date: moment(el.data).format('YYYY-MM-DD'),
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
