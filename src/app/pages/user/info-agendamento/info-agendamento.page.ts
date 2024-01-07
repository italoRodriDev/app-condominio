import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';
import { AgendamentoModel } from 'src/app/models/agendamento.model';
import { AgendamentoAreaGourmetService } from 'src/app/services/user/agendamento-area-gourmet.service';

@Component({
  selector: 'app-info-agendamento',
  templateUrl: './info-agendamento.page.html',
  styleUrls: ['./info-agendamento.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class InfoAgendamentoPage implements OnInit {
  @Input() data: AgendamentoModel | undefined;

  constructor(
    private service: AgendamentoAreaGourmetService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async onClickCancel() {
    const alert = await this.alertCtrl.create({
      header: 'Deseja cancelar o evento?',
      message: 'Ao confirmar o evento será removido do calendário',
      buttons: [
        {
          text: 'Voltar',
          handler: () => {},
        },
        {
          text: 'Excluir',
          handler: () => {
            this.service.remove(this.data?.id!);
          },
        },
      ],
    });
    await alert.present();
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }
}
