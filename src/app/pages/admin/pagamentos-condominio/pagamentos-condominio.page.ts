import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { FaturaModel } from 'src/app/models/fatura.model';
import { FaturaService } from 'src/app/services/admin/fatura.service';
import { ModalController } from '@ionic/angular/standalone';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-pagamentos-condominio',
  templateUrl: './pagamentos-condominio.page.html',
  styleUrls: ['./pagamentos-condominio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedComponentsModule]
})
export class PagamentosCondominioPage implements OnInit {
  columns: Array<any> = [];
  lines: Array<any> = [];
  filters: Array<any> = [];
  listItems: Array<FaturaModel> = [];

  constructor(
    private service: FaturaService,
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
   
  }

  async onClickEdit(data: any) {
    
  }

  async onClickRemove(data: FaturaModel) {
    
  }

  onChangeScroll(ev: any) {
    this.service.nextPage();
  }
}
