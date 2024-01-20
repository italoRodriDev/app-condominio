import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { DatetimeComponent } from './datetime/datetime.component';
import * as moment from 'moment';

@Component({
  selector: 'app-select-days',
  templateUrl: './select-days.component.html',
  styleUrls: ['./select-days.component.scss'],
})
export class SelectDaysComponent implements OnInit {
  @Input() label: string | undefined = 'Selecione os dias';
  @Input() currentListDays: Array<any> | undefined;
  @Output() onChangeData: EventEmitter<any> = new EventEmitter();
  listDays: Array<any> = [
    {
      day: 1,
      open: false,
      name: 'Segunda',
      openHour: '2023-01-10T08:00:00-03:00',
      closeHour: '2023-01-10T18:30:00-03:00',
    },
    {
      day: 2,
      open: false,
      name: 'Terça',
      openHour: '2023-01-10T08:00:00-03:00',
      closeHour: '2023-01-10T18:30:00-03:00',
    },
    {
      day: 3,
      open: false,
      name: 'Quarta',
      openHour: '2023-01-10T08:00:00-03:00',
      closeHour: '2023-01-10T18:30:00-03:00',
    },
    {
      day: 4,
      open: false,
      name: 'Quinta',
      openHour: '2023-01-10T08:00:00-03:00',
      closeHour: '2023-01-10T18:30:00-03:00',
    },
    {
      day: 5,
      open: false,
      name: 'Sexta',
      openHour: '2023-01-10T08:00:00-03:00',
      closeHour: '2023-01-10T18:30:00-03:00',
    },
    {
      day: 6,
      open: false,
      name: 'Sábado',
      openHour: '2023-01-10T08:00:00-03:00',
      closeHour: '2023-01-10T18:30:00-03:00',
    },
    {
      day: 0,
      open: false,
      name: 'Domingo',
      openHour: '2023-01-10T08:00:00-03:00',
      closeHour: '2023-01-10T18:30:00-03:00',
    },
  ];

  constructor(
    private modalCtrl: ModalController,
    private alertService: AlertsService
  ) {}

  ngOnInit() {
    if (this.currentListDays?.length) {
      this.listDays = this.currentListDays;
    }
  }

  async showModalDateTime(day: any, typeDate: string) {
    const modal = await this.modalCtrl.create({
      component: DatetimeComponent,
      componentProps: {
        title: 'Horário',
        subtitle: `Selecione o horário 
        arrastando para baixo ou para cima ou rolando com o mouse.`,
        typeDate: typeDate,
        data: day,
        minDate: moment('2023-01-10T00:00:00-03:00').format(),
      },
      cssClass: 'custom-css-modal-datetime',
    });
    this.alertService.showLoading().then(async (loading) => {
      await loading.present();
      await modal.present();
      await loading.dismiss();
    });

    const { data } = await modal.onWillDismiss();
    if (data) {
      switch (typeDate) {
        case 'OPEN_HOUR':
          day.openHour = data.data;
          break;
        case 'CLOSE_HOUR':
          day.closeHour = data.data;
          break;
      }
    }
  }

  onChangeSelectDays(ev: any, day: any) {
    const value = ev.detail.value;
    if (value) {
      day.open = value;
      this.onChangeData.emit(this.listDays);
    }
  }
}
