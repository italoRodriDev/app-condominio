import { Injectable } from '@angular/core';
import {
  AlertButton,
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  // -> Alerta
  async showAlert(headerText: string, messageText: string) {
    const alert = await this.alertCtrl.create({
      header: headerText,
      message: messageText,
      mode: 'md',
      buttons: [
        {
          text: 'Continuar',
          handler: () => {},
        },
      ],
    });

    alert.present();
  }

  // -> Alerta de senha fraca
  async showAlertPassword() {
    const alert = await this.alertCtrl.create({
      header: 'Sua senha é muito fraca! Levamos segurança a sério.',
      subHeader: 'Veja o exemplo de como criar uma senha forte a baixo.',
      message: `<p>◉ No mínimo 8 caracteres</p>
         <p>◉ No mínimo 1 numéro</p>
         <p>◉ No mínimo 1 letra minúscula</p>
         <p>◉ No mínimo 1 letra maiúscula</p>
         <p>◉ No mínimo 1 caráter especial</p>
         <p>Exemplo de senha forte:</p>
         <strong>• Italo-212</strong>
         <strong>• @Amanda-355</strong>`,

      buttons: [
        {
          text: 'Entendi',
          handler: () => {},
        },
      ],
      mode: 'md',
    });
    alert.present();
  }

  // -> Toast
  async showToast(messageText: string) {
    const toast = await this.toastCtrl.create({
      message: messageText,
      duration: 5000,
      mode: 'ios',
    });

    toast.present();
  }

  // -> Loading
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Aguarde um momento...',
      spinner: 'circles',
      mode: 'md',
      cssClass: 'loading-background',
    });
    //loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
    return loading;
  }

  async showLoadingUploadImage(text: string) {
    const loading = await this.loadingCtrl.create({
      message: text,
      spinner: 'circles',
      mode: 'md',
      cssClass: 'loading-background',
    });
    //loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
    return loading;
  }

  async showAlertDialogAction(
    headerText: string,
    subHeaderText: string,
    messageText: string,
    buttons: Array<AlertButton>
  ) {
    const alert = await this.alertCtrl.create({
      header: headerText,
      subHeader: subHeaderText,
      message: messageText,
      buttons: buttons,
    });
    await alert.present();
  }
}
