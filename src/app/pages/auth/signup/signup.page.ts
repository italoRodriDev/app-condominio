import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AuthAdminService } from 'src/app/services/auth/auth-admin.service';
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

  constructor(
    private authAdminService: AuthAdminService,
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
    this.authAdminService
      .createAccount()
      .then((loading) => (this.isLoading = loading));
  }

  onClickBack() {
    this.navCtrl.navigateBack('entrar');
  }
}
