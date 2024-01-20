import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.scss'],
})
export class DatetimeComponent implements OnInit {
  @Input() title: string = 'Hora';
  @Input() subtitle: string = 'Selecione a hora.';
  @Input() typeDateTime: string = 'time';
  @Input() minDate: string = moment().format();
  @Input() data: any | undefined;
  @Input() typeDate: string | undefined;
  dataTimeValue: string | any;
  currentDate: string = moment().format();

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    switch (this.typeDate) {
      case 'OPEN_HOUR':
        this.currentDate = moment(this.data?.openHour).format();
        break;
      case 'CLOSE_HOUR':
        this.currentDate = moment(this.data?.closeHour).format();
        break;
    }
  }

  // -> Recuperando eventos do datetime
  onChangeDateTime(ev: any) {
    let value = ev.detail.value;
    this.dataTimeValue = value;
  }

  // -> Voltar
  saveDate() {
    if (this.dataTimeValue) {
      this.modalCtrl.dismiss({ data: this.dataTimeValue });
    } else {
      this.modalCtrl.dismiss({ data: this.currentDate });
    }
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }
}
