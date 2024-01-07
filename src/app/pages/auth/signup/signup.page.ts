import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TypeRegister } from 'src/app/enum/type_user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormService } from 'src/app/services/forms/form.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LazyLoadImageModule,
    ReactiveFormsModule,
  ],
})
export class SignupPage implements OnInit {
  formSignUp: FormGroup = this.formService.formSignUp;
  isLoading: boolean = false;
  viewPass: boolean = false;
  private typeRegister = TypeRegister.CONDOMINIO;

  constructor(
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
    this.isLoading = true;
    this.authService
      .createAccount(this.typeRegister)
      .then((loading) => (this.isLoading = loading));
  }

  onClickBack() {
    this.navCtrl.navigateBack('entrar');
  }
}
