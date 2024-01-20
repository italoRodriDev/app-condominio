import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CondominioModel } from 'src/app/models/condomio.model';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { ConfiguracoesService } from 'src/app/services/admin/configuracoes.service';
import { FormService } from 'src/app/services/forms/form.service';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import * as QRCode from 'qrcode';
import * as moment from 'moment';
import { NgxMaskDirective } from 'ngx-mask';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NgxMaskDirective, SharedComponentsModule, ReactiveFormsModule]
})
export class ConfiguracoesPage implements OnInit {
  @ViewChild('qrcode', { static: false }) qrcode: ElementRef | undefined;
  @ViewChild('inputFile') inputFile: ElementRef | undefined;
  form: FormGroup = this.formService.formSettings;

  condominio: CondominioModel | undefined;
  listThemes: Array<any> = this.formService.listThemes;
  listDaysGourmet: Array<any> = [];
  urlImagesUpload: Array<string> = [];

  userCode: string = '';
  authorizationCode: string = '';

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private service: ConfiguracoesService,
    private modalCtrl: ModalController,
    private alertService: AlertsService,
  ) {}

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.formService.resetDataForm();
    this.getDataService();
  }

  getDataService() {
    this.authService.bsDataCondominio.subscribe((data: CondominioModel) => {
      if (data?.idUser) {
        this.condominio = data;

        if (this.condominio?.logo != null) {
          this.urlImagesUpload[0] = this.condominio?.logo.url;
          this.form.patchValue({
            logo: this.condominio.logo
          });
        }

        this.form.patchValue({
          idUser: this.condominio.idUser,
          perfilCompleto: this.condominio.perfilCompleto,
          typeUser: this.condominio.typeUser,
          name: this.condominio?.name,
          phone: this.condominio?.phone,
          cnpj: this.condominio?.cnpj,
          address: this.condominio?.address,
          color: this.condominio?.color,
          daysGourmet: this.condominio?.daysGourmet,
        });
        if (this.condominio?.daysGourmet) {
          this.listDaysGourmet = this.condominio.daysGourmet;
        }
        this.generateQRCode();
      }
    });
  }

  onChangeListFilesImages(ev: any) {
    this.service.listFilesUpload = ev;
  }

  saveData() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.service.saveData();
    } else {
      this.alertService.showToast(
        'Preencha todos os campos do formulário antes de salvar!'
      );
    }
  }

  generateQRCode() {
    const site = `${this.formService.urlSiteOficial}/splash/${this.condominio?.idUser}`;
    if (site != null) {
      QRCode.toCanvas(this.qrcode!.nativeElement, site, (error) => {
        if (error) {
        }
      });
    }
  }

  onClickCopyLink() {
    const idEnterprise = `${this.formService.urlSiteOficial}/splash/${this.condominio?.idUser}`;
    navigator.clipboard.writeText(idEnterprise);
    this.alertService.showToast('Link da loja copiado com sucesso.');
  }

  printQrCode() {
    let content = document.getElementById('card-qrcode')!.innerHTML;
    let canvas = this.qrcode!.nativeElement as HTMLCanvasElement;
    let imagemBase64 = canvas.toDataURL('image/png');
    let i = window.open('', '', 'width=800,height=600');
    i!.document.write('<html><head><title>Impressão</title></head><body>');
    i!.document.write(content);
    i!.document.write('<img src="' + imagemBase64 + '">');
    i!.document.write('</body></html>');
    i!.document.close();
    i!.print();
  }

  onChangeSelectDays(listDays: Array<any>) {
    if (listDays.length) {
      this.form.patchValue({ availability: listDays });
    }
  }
}