import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApartamentoModel } from 'src/app/models/apartamento.model';
import { ApartamentosService } from 'src/app/services/admin/apartamentos.service';
import { FormService } from 'src/app/services/forms/form.service';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { NgxMaskDirective } from 'ngx-mask';
import { VotacaoModel } from 'src/app/models/votacao.model';
import { VotacoesService } from 'src/app/services/admin/votacoes.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-votacao',
  templateUrl: './edit-votacao.page.html',
  styleUrls: ['./edit-votacao.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,  NgxMaskDirective, ReactiveFormsModule]
})
export class EditVotacaoPage implements OnInit {
  @Input() data: VotacaoModel | undefined;
  form = this.formService.formPautaVotacao;
  urlImagesUpload: Array<string> = [];
  mesInicial = moment().add(1, 'day').format();
  
  constructor(
    private service: VotacoesService,
    private formService: FormService,
    private modalCtrl: ModalController,
    private alertService: AlertsService
  ) {}

  ngOnInit() {
    this.formService.resetDataForm();
  }

  ionViewDidEnter() {
    this.getDataEditData();
  }

  getDataEditData() {
    if (this.data != null) {
      this.form.patchValue(this.data);
    }
  }

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