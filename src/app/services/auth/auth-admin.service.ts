import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertsService } from '../alerts/alerts.service';
import { FormService } from '../forms/form.service';
import { TypeUser } from 'src/app/enum/type_user';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminService {
  formAuthSignUp: FormGroup = this.formService.formSignUp;
  formSignUpFinish: FormGroup = this.formService.formSignUpFinish;
  idUser: string | undefined;

  constructor(
    private formService: FormService,
    private fireAuth: AngularFireAuth,
    private alertService: AlertsService,
    private fireStore: AngularFirestore,
    private navCtrl: NavController
  ) {
    this.checkIfLogin();
  }

  checkIfLogin() {
    this.fireAuth.onAuthStateChanged((user) => {
      if (user?.uid != null) {
        this.idUser = user.uid.toString();
      } else {
        this.navCtrl.navigateForward('entrar');
      }
    });
  }

  createAccount() {
    const email = this.formAuthSignUp.controls['email'];
    const password = this.formAuthSignUp.controls['password'];

    return new Promise<any>((resolve) => {
      if (email.valid && password.valid) {
        this.fireAuth
          .createUserWithEmailAndPassword(email.value, password.value)
          .then((res) => {
            const idUser = res?.user?.uid;
            if (idUser) {
              resolve(false);
              this.saveDataAuth(idUser, email.value);
            }
          })
          .catch((error) => {
            resolve(false);
            this.getError(error?.code);
          });
      } else {
        resolve(false);
      }
    });
  }

  saveDataAuth(idUser: string, email: string) {
    this.fireStore
      .collection('Condominios')
      .doc(idUser)
      .set({
        idUser: idUser,
        email: email,
        typeUser: TypeUser.CONDOMINIO,
        perfilCompleto: false,
      })
      .then(() => {
        this.formService.resetDataForm();
        this.navCtrl.navigateBack('entrar');
      })
      .catch((error) => {
        this.alertService.showToast('Erro: ' + error.code);
      });
  }

  saveDataFinishSignUp() {
    return new Promise<any>((resolve) => {
      if (this.formSignUpFinish.valid) {
        this.formSignUpFinish.patchValue({
          perfilCompleto: true,
          dataCadastro: moment().format(),
        });

        if (this.idUser != null) {
          this.fireStore
            .collection('Condominios')
            .doc(this.idUser)
            .update(this.formSignUpFinish.value)
            .then(() => {
              this.alertService.showAlert(
                'Sua conta foi criada com sucesso!',
                'Agora só aproveitar todos os nosso serviços.'
              );
              this.navCtrl.navigateForward('inicio');
              resolve(false);
            })
            .catch((error) => {
              resolve(false);
              this.alertService.showToast(
                'Erro ao cadastrar dados! Erro: ' + error.code
              );
            });
        } else {
          this.alertService.showToast('Faça o login novamente!');
        }
      } else {
        this.alertService.showToast('Dados inválidos, tente novamente!');
      }
    });
  }

  getError(res: any) {
    switch (res) {
      case 'auth/invalid-email':
        this.alertService.showToast('Ops! Digite um usuário válido.');
        break;
      case 'auth/user-disabled':
        this.alertService.showToast('Ops! Seu acesso foi desativado.');
        break;
      case 'auth/user-not-found':
        this.alertService.showToast(
          'Ops! Esse usuário ainda não foi cadastrado.'
        );
        break;
      case 'auth/wrong-password':
        this.alertService.showToast(
          'Ops! Seu usuário ou senha não batem. Verifique e tente novamente.'
        );
        break;
      case 'auth/email-not-verified':
        this.alertService.showToast(
          'Ops! Seu usuário ainda não foi verificado, enviamos um e-email de verificação para você.'
        );
        break;
      case 'auth/too-many-requests':
        this.alertService.showToast(
          'Ops! Por excesso de tentativas essa conta foi temporariamente bloqueada. Tente mais tarde.'
        );
        break;
      case 'auth/email-already-in-use':
        this.alertService.showToast(
          'Ops! Esse usuário já foi cadastrado, tente recuperar a senha.'
        );
        break;
      case 'auth/invalid-login-credentials':
        this.alertService.showToast('Ops! Cadastro não finalizado.');
        break;
    }
  }
}
