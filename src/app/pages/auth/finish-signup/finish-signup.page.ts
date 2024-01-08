import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormService } from 'src/app/services/forms/form.service';

@Component({
  selector: 'app-finish-signup',
  templateUrl: './finish-signup.page.html',
  styleUrls: ['./finish-signup.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LazyLoadImageModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
})
export class FinishSignupPage implements OnInit {
  formSignUpFinish: FormGroup = this.formService.formSignUpFinish;
  isLoading: boolean = false;
  checkedTerms: boolean = false;

  constructor(
    private alertService: AlertsService,
    private authService: AuthService,
    private formService: FormService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  onClickSignIn() {
    this.navCtrl.navigateForward('entrar');
  }

  onClickRecoverPass() {
    this.navCtrl.navigateForward('recuperacao');
  }

  onClickContinue() {
    if (this.checkedTerms) {
    //  this.authService
    //    .saveDataFinishSignUp()
    //    .then((loading) => (this.isLoading = loading));
    } else {
      this.alertService.showAlert(
        'Aceite nossos termos primeiro!',
        'Marque a caixinha se concorda com os nossos termos de uso e politicas de privacidade.'
      );
    }
  }

  onClickBack() {
    this.navCtrl.navigateBack('entrar');
  }

  onChangeCheckTerms(ev: any) {
    const checked = ev.detail.checked;
    if (checked == true) {
      this.checkedTerms = true;
    } else {
      this.checkedTerms = false;
    }
  }
}
