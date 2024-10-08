import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormService } from 'src/app/services/forms/form.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LazyLoadImageModule,
    ReactiveFormsModule,
  ],
})
export class RecoverPasswordPage implements OnInit {
  formRecoveryPass: FormGroup = this.formService.formRecoveryPass;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  onClickSignIn() {
    this.navCtrl.navigateBack('entrar');
  }

  onClickContinue() {
    this.isLoading = true;
    this.authService
      .sendPasswordResetEmail()
      .then((loading) => (this.isLoading = loading));
  }

  onClickBack() {
    this.navCtrl.navigateBack('entrar');
  }
}
