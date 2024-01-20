import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TypeUser } from 'src/app/enum/type_user';
import { ApartamentosService } from '../admin/apartamentos.service';
import { ConfiguracoesService } from '../admin/configuracoes.service';
import { VotacoesService } from '../admin/votacoes.service';
import { AlertsService } from '../alerts/alerts.service';
import { FormService } from '../forms/form.service';
import { AgendamentoAreaGourmetService } from '../user/agendamento-area-gourmet.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  db = this.fireDatabase.database;
  formAuthSignIn: FormGroup = this.formService.formSignIn;
  formAuthSignUp: FormGroup = this.formService.formSignUp;
  formSignUpFinish: FormGroup = this.formService.formSignUpFinish;
  formRecoveryPass: FormGroup = this.formService.formRecoveryPass;
  formProfile: FormGroup = this.formService.formProfile;

  idUser: string | undefined;
  idCondominio: string | undefined;
  public bsTypeUser = new BehaviorSubject<any>(null);
  typeUser = this.bsTypeUser.asObservable();
  public bsAuth = new BehaviorSubject(false);
  isAuth = this.bsAuth.asObservable();
  public bsDataCondominio = new BehaviorSubject<any>(null);
  dataCondominio = this.bsDataCondominio.asObservable();
  public bsDataApt = new BehaviorSubject<any>(null);
  dataApt = this.bsDataApt.asObservable();

  constructor(
    private formService: FormService,
    private fireAuth: AngularFireAuth,
    private fireDatabase: AngularFireDatabase,
    private fireStore: AngularFirestore,
    private navCtrl: NavController,
    private alertService: AlertsService,
    private configuracoesService: ConfiguracoesService,
    private agendamentoAreaGourmetService: AgendamentoAreaGourmetService,
    private apartamentosService: ApartamentosService,
    private votacoesService: VotacoesService
  ) {
    this.checkIfLogin();
  }

  checkIfLogin() {
    const idCondominio = localStorage.getItem('condominio');
    if (idCondominio) {
      this.idCondominio = idCondominio;
    }

    this.fireAuth.onAuthStateChanged((user) => {
      if (user?.uid != null) {
        this.navigationToHome();
      } else {
        this.navCtrl.navigateForward('entrar');
      }
    });
  }

  navigationToHome() {
    this.fireAuth.currentUser.then((user) => {
      if (user?.emailVerified) {
        this.getDataUser(user?.uid);
      } else {
        if (user?.email != null) {
          this.checkAndSendVerificationEmail(user?.email?.toString());
        }
      }
    });
  }

  getDataUser(idUser: string) {
    this.fireStore
      .collection('Apartamentos')
      .doc(this.idCondominio)
      .collection('dados', (q) => q.where('idUser', '==', idUser))
      .get()
      .subscribe((data) => {
        if (data.docs.length) {
          const userData: any = data.docs[0].data();
          if (userData && userData.typeUser == TypeUser.MORADOR) {
            if (userData.status == true) {
              this.sharedDataPages(
                TypeUser.MORADOR,
                userData.condominio,
                userData
              );
            } else {
              this.alertService.showAlert(
                'Acesso não permitido',
                'Seu acesso foi bloqueado.'
              );
              this.signOutAccount();
            }
          }
        }
      });

    this.fireStore
      .collection('Condominios')
      .doc(idUser)
      .get()
      .subscribe((res) => {
        if (res.exists) {
          const condominioData: any = res.data();
          if (
            condominioData &&
            condominioData.typeUser == TypeUser.CONDOMINIO
          ) {
            if (condominioData.perfilCompleto == true) {
              this.sharedDataPages(TypeUser.CONDOMINIO, condominioData, null);
            } else {
              this.navCtrl.navigateForward('finalizar-cadastro');
            }
          }
        }
      });
  }

  sharedDataPages(typeUser: TypeUser, dataCondominio: any, dataApt: any) {
    this.formService.resetDataForm();
    this.configuracoesService.condominio = dataCondominio;
    this.agendamentoAreaGourmetService.condominio = dataCondominio;
    this.apartamentosService.condominio = dataCondominio;
    this.votacoesService.condominio = dataCondominio;
    this.bsDataApt.next(dataApt);
    this.bsDataCondominio.next(dataCondominio);
    this.bsTypeUser.next(typeUser);
    this.navCtrl.navigateForward('inicio');
  }

  checkAndSendVerificationEmail(textEmail: string) {
    this.fireAuth.currentUser
      .then((user) => {
        if (user != null && !user?.emailVerified) {
          user.sendEmailVerification();
          this.alertService.showAlert(
            'Ative sua conta.',
            `Enviamos um link de ativação para seu e-mail ${textEmail}!`
          );
          this.navCtrl.navigateForward('entrar');
        } else {
          this.navCtrl.navigateForward('entrar');
        }
      })
      .catch((e) => {
        this.getError(e);
      });
  }

  signIn() {
    return new Promise<any>((resolve) => {
      const email = this.formAuthSignIn.controls['email'];
      const password = this.formAuthSignIn.controls['password'];
      if (email.valid && password.valid) {
        this.fireAuth
          .signInWithEmailAndPassword(email.value, password.value)
          .then((result) => {
            resolve(false);
            this.navigationToHome();
          })
          .catch((e) => {
            this.validateCompleteRegister();
            resolve(false);
            this.getError(e);
          });
      }
    });
  }

  signUp() {
    return new Promise<any>((resolve) => {
      const idApt = this.formAuthSignUp.controls['idApt'];
      const email = this.formAuthSignUp.controls['email'];
      const password = this.formAuthSignUp.controls['password'];
      if (email.valid && password.valid) {
        this.fireAuth
          .createUserWithEmailAndPassword(email.value, password.value)
          .then((res) => {
            const idUser = res.user!.uid.toString();
            this.fireStore
              .collection('Apartamentos')
              .doc(this.idCondominio)
              .collection('dados')
              .doc(idApt.value)
              .update({
                idUser: idUser,
                typeUser: TypeUser.MORADOR.toString(),
                dataCadastro: moment().format(),
                perfilCompleto: true,
              })
              .then((data) => {
                resolve(false);
                this.checkAndSendVerificationEmail(
                  res!.user!.email!.toString()
                );
              })
              .catch((e) => {
                resolve(false);
              });
          })
          .catch((e) => {
            resolve(false);
            this.getError(e);
          });
      }
    });
  }

  validateCompleteRegister() {
    const email = this.formAuthSignIn.controls['email'];

    if (email.valid) {
      this.fireStore
        .collection('Apartamentos')
        .doc(this.idCondominio)
        .collection('dados', (q) => q.where('email', '==', email.value))
        .get()
        .subscribe((data) => {
          if (data.docs.length) {
            const userData: any = data.docs[0].data();
            if (userData.perfilCompleto == false) {
              if (userData.status == true) {
                this.formAuthSignUp.patchValue({
                  idApt: userData.id.toString(),
                  email: userData.email.toString(),
                });
                this.navCtrl.navigateForward('criar-senha');
              } else {
                this.alertService.showToast('Seu acesso foi bloqueado!');
              }
            }
          } else {
            this.alertService.showToast('Usuário não encontrado!');
          }
        });
    }
  }

  sendPasswordResetEmail() {
    return new Promise<any>((resolve) => {
      const email = this.formRecoveryPass.controls['email'];

      if (email.valid) {
        this.fireAuth
          .sendPasswordResetEmail(email.value)
          .then(() => {
            resolve(false);
            this.alertService.showAlert(
              'Verifique seu e-mail',
              'Enviamos um e-mail de recuperação de senha!'
            );
          })
          .catch((error) => {
            this.getError(error.code);
            resolve(false);
          });
      } else {
        this.alertService.showToast('E-mail inválido, tente novamente!');
        resolve(false);
      }
    });
  }

  signOutAccount() {
    this.fireAuth
      .signOut()
      .then(() => {
        this.bsAuth.next(false);
        this.bsDataApt.next(null);
        this.bsDataCondominio.next(null);
        this.bsTypeUser.next(null);
        this.navCtrl.navigateBack('entrar');
      })
      .catch((error) => {
        this.alertService.showAlert(
          'Ops! Erro ao sair da conta.',
          'ERRO: ' + error.code
        );
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
