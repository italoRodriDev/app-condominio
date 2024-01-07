import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TypeRegister } from 'src/app/enum/type_user';
import { CondominioModel } from 'src/app/models/condomio.model';
import { AlertsService } from '../alerts/alerts.service';
import { FormService } from '../forms/form.service';
import { AgendamentoAreaGourmetService } from '../user/agendamento-area-gourmet.service';
import { ApartamentosService } from '../admin/apartamentos.service';

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
  public bsAuth = new BehaviorSubject(false);
  isAuth = this.bsAuth.asObservable();
  public bsDataUser = new BehaviorSubject<any>(null);
  dataUser = this.bsDataUser.asObservable();

  constructor(
    private formService: FormService,
    private fireAuth: AngularFireAuth,
    private fireDatabase: AngularFireDatabase,
    private fireStore: AngularFirestore,
    private navCtrl: NavController,
    private alertService: AlertsService,
    private agendamentoAreaGourmetService: AgendamentoAreaGourmetService,
    private apartamentosService: ApartamentosService
  ) {
    this.getCurrentUser();
  }

  // -> Recuperando usuario atual
  getCurrentUser() {
    this.fireAuth.onAuthStateChanged((res) => {
      const idUser = res?.uid;
      this.idUser = idUser;
      if (idUser) {
        this.bsAuth.next(true);
        this.getData(idUser);
      } else {
        this.bsAuth.next(false);
      }
    });
  }

  // -> Verificar se o cadastro foi completado
  getData(idUser: string) {
    this.fireStore
      .collection('Registrations')
      .doc(idUser)
      .get()
      .subscribe((data) => {
        const docData: any = data.data();
        if (docData) {
          if (docData.name == null) {
            this.navCtrl.navigateForward('finalizar-cadastro');
          } else {
            this.sharedCurrentData(docData);
            this.bsDataUser.next(docData);
          }
        }
      });
  }

  // -> Compatilhando dados do usuario para outros servicos
  sharedCurrentData(data: CondominioModel) {
    this.agendamentoAreaGourmetService.condominio = data;
    this.apartamentosService.condominio = data;
    this.validateRouteInitApp(data.typeRegister);
  }

  // -> Logando usuario com email e senha
  signInAccount(persistenceType: string) {
    const email = this.formAuthSignIn.controls['email'].value;
    const password = this.formAuthSignIn.controls['password'].value;

    return new Promise<any>((resolve) => {
      this.fireAuth.setPersistence(persistenceType).then(() => {
        this.fireAuth
          .signInWithEmailAndPassword(email, password)
          .then((res) => {
            const idUser = res?.user?.uid;

            if (idUser) {
              this.formService.resetDataForm();
              this.getCurrentUser();
              resolve(false);
            }
          })
          .catch((error) => {
            resolve(false);
            this.getError(error?.code);
          });
      });
    });
  }

  // -> Criando conta do usuario
  createAccount(typeRegister: TypeRegister) {
    const email = this.formAuthSignUp.controls['email'];
    const password = this.formAuthSignUp.controls['password'];

    return new Promise<any>((resolve) => {
      if (email.valid && password.valid) {
        this.fireAuth
          .createUserWithEmailAndPassword(email.value, password.value)
          .then((res) => {
            res.user?.sendEmailVerification();
            const idUser = res?.user?.uid;
            if (idUser) {
              resolve(false);
              this.saveDataAuthUser(idUser, email.value, typeRegister);
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

  // -> Salvando id do usuário
  saveDataAuthUser(idUser: string, email: string, typeRegister: string) {
    this.fireStore
      .collection('Registrations')
      .doc(idUser)
      .set({ idUser: idUser, email: email, typeRegister: typeRegister })
      .then(() => {
        this.formService.resetDataForm();
        this.navCtrl.navigateForward('finalizar-cadastro');
      })
      .catch((error) => {
        this.alertService.showToast('Erro: ' + error.code);
      });
  }

  // -> Salvando dados do usuario finalizar cadastro
  saveDataFinishSignUp() {
    return new Promise<any>((resolve) => {
      if (this.formSignUpFinish.valid) {
        if (this.idUser != null) {
          this.fireStore
            .collection('Registrations')
            .doc(this.idUser)
            .update(this.formSignUpFinish.value)
            .then(() => {
              this.alertService.showAlert(
                'Sua conta foi criada com sucesso!',
                'Agora só aproveitar todos os nosso serviços.'
              );
              this.getCurrentUser();
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

  // -> Atualizando perfil
  updateProfileUser() {
    return new Promise<any>((resolve) => {
      if (this.formProfile.valid) {
        if (this.idUser != null) {
          this.fireStore
            .collection('Registrations')
            .doc(this.idUser)
            .update(this.formProfile.value)
            .then(() => {
              this.alertService.showToast('Dados atualizados com sucesso!');
              resolve(false);
            })
            .catch((error) => {
              resolve(false);
              this.alertService.showToast(
                'Erro ao atualizar dados! Erro: ' + error.code
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

  // -> Recuperando conta
  sendPasswordResetEmail() {
    const email = this.formRecoveryPass.controls['email'];

    return new Promise<any>((resolve) => {
      if (email.valid) {
        this.fireAuth
          .sendPasswordResetEmail(email.value)
          .then(() => {
            resolve(false);
            this.alertService.showAlert(
              'Enviamos um email para você!',
              'Agora só dar continuidade na recuperação da sua conta.'
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

  // -> Validando rotas de inicio
  validateRouteInitApp(typeRegister: string) {
    switch (typeRegister) {
      case TypeRegister.CONDOMINIO:
        this.navCtrl.navigateForward('inicio');
        break;
    }
  }

  // -> Sair da conta
  signOutAccount() {
    this.fireAuth
      .signOut()
      .then(() => {
        this.navCtrl.navigateBack('entrar');
      })
      .catch((error) => {
        this.alertService.showAlert(
          'Ops! Erro ao sair da conta.',
          'ERRO: ' + error.code
        );
      });
  }

  // -> Validadacao de autenticacao
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
      default:
        this.alertService.showToast(
          'Ops! Algo saiu errado. Verifique sua conexão.'
        );
    }
  }
}
