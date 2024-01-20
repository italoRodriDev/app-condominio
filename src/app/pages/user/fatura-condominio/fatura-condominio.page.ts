import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@Component({
  selector: 'app-fatura-condominio',
  templateUrl: './fatura-condominio.page.html',
  styleUrls: ['./fatura-condominio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedComponentsModule]
})
export class FaturaCondominioPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }

}
