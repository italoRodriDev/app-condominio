import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { NAVBAR_DATA_MENU } from 'src/app/components/side-bar/nav-data';
import { ApartamentoModel } from 'src/app/models/apartamento.model';
import { ModalController } from '@ionic/angular/standalone';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { ApartamentosService } from 'src/app/services/admin/apartamentos.service';
import { EditApartamentoPage } from './edit-apartamento/edit-apartamento.page';

@Component({
  selector: 'app-apartamentos',
  templateUrl: './apartamentos.page.html',
  styleUrls: ['./apartamentos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedComponentsModule]
})
export class ApartamentosPage implements OnInit {
  sideBarItems = NAVBAR_DATA_MENU;
  columns: Array<any> = [];
  lines: Array<any> = [];
  filters: Array<any> = [];
  listItems: Array<ApartamentoModel> = [];

  constructor(
    private service: ApartamentosService,
    private modalCtrl: ModalController,
    private alertService: AlertsService
  ) {}

  ngOnInit() {
    this.filters = [
      { title: 'Nome', value: 'nome' },
      { title: 'email', value: 'email' },
      { title: 'telefone', value: 'telefone' },
    ];
    this.columns = [
      { title: '', value: 'nome', size: '1', type: 'Letra' },
      { title: 'Nome', value: 'nome', size: '4' },
      { title: 'email', value: 'email', size: '3' },
      { title: 'telefone', value: 'telefone', size: '3' },
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
      component: EditApartamentoPage,
      cssClass: 'custom-css-modal-desktop',
    });
    await modal.present();
  }

  async onClickEdit(data: any) {
    const modal = await this.modalCtrl.create({
      component: EditApartamentoPage,
      componentProps: {
        data: data,
      },
      cssClass: 'custom-css-modal-desktop',
    });
    await modal.present();
  }

  async onClickRemove(data: ApartamentoModel) {
    this.alertService.showAlertDialogAction(
      `Deseja excluir?`,
      `Nome: ${data.nome}`,
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
