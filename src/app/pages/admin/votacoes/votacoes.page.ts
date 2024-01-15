import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApartamentoModel } from 'src/app/models/apartamento.model';
import { ApartamentosService } from 'src/app/services/admin/apartamentos.service';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { EditApartamentoPage } from '../apartamentos/edit-apartamento/edit-apartamento.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { VotacoesService } from 'src/app/services/admin/votacoes.service';
import { VotacaoModel } from 'src/app/models/votacao.model';
import { EditVotacaoPage } from './edit-votacao/edit-votacao.page';

@Component({
  selector: 'app-votacoes',
  templateUrl: './votacoes.page.html',
  styleUrls: ['./votacoes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedComponentsModule]
})
export class VotacoesPage implements OnInit {
  columns: Array<any> = [];
  lines: Array<any> = [];
  filters: Array<any> = [];
  listItems: Array<VotacaoModel> = [];

  constructor(
    private service: VotacoesService,
    private modalCtrl: ModalController,
    private alertService: AlertsService
  ) {}

  ngOnInit() {
    this.filters = [
      { title: 'Nome da pauta', value: 'pauta' },
    ];
    this.columns = [
      { title: '', value: 'pauta', size: '1', type: 'Letra' },
      { title: 'Pauta', value: 'pauta', size: '4' },
      { title: 'Ativa', value: 'status', size: '3', type: 'toggle' },
    ];
    this.lines = [];
  }

  ionViewDidEnter() {
    this.getDataServices();
  }

  onChangeFilterSearch(ev: any) {
    this.service.getListItemsSearch(ev?.typeFilter, ev?.query);
  }

  getDataServices() {
    this.service.getListItems();
    this.service.listItems.subscribe((list) => {
      this.listItems = list;
      this.lines = list;
    });
  }

  async onClickNew() {
    const modal = await this.modalCtrl.create({
      component: EditVotacaoPage,
      cssClass: 'custom-css-modal-desktop',
    });
    await modal.present();
  }

  async onClickEdit(data: any) {
    const modal = await this.modalCtrl.create({
      component: EditVotacaoPage,
      componentProps: {
        data: data,
      },
      cssClass: 'custom-css-modal-desktop',
    });
    await modal.present();
  }

  async onClickRemove(data: VotacaoModel) {
    this.alertService.showAlertDialogAction(
      `Deseja excluir?`,
      `Nome: ${data.pauta}`,
      `Ao confirmar será excluido.`,
      [
        {
          text: 'Cancelar',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.service.remove(data.id);
          },
        },
      ]
    );
  }

  onChangeToggleStatus(ev: any) {
    const dataCategory: any = ev?.data;
    const newStatus: boolean = ev?.value;
    if (dataCategory != null && newStatus != null) {
      this.service.updateStatus(dataCategory?.id, newStatus);
    }
  }

  onChangeScroll(ev: any) {
    this.service.nextPage();
  }
}
