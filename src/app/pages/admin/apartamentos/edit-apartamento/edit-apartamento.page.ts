import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApartamentoModel } from 'src/app/models/apartamento.model';
import { ApartamentosService } from 'src/app/services/admin/apartamentos.service';
import { FormService } from 'src/app/services/forms/form.service';
import { ModalController } from '@ionic/angular/standalone';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-edit-apartamento',
  templateUrl: './edit-apartamento.page.html',
  styleUrls: ['./edit-apartamento.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,  NgxMaskDirective, ReactiveFormsModule]
})
export class EditApartamentoPage implements OnInit {
  @Input() data: ApartamentoModel | undefined;
  form = this.formService.formApartamento;
  urlImagesUpload: Array<string> = [];

  constructor(
    private service: ApartamentosService,
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
