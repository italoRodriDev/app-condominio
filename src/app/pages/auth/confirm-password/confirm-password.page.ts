import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormService } from 'src/app/services/forms/form.service';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.page.html',
  styleUrls: ['./confirm-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class ConfirmPasswordPage implements OnInit {
  form: FormGroup = this.formService.formSignUp;
  isLoading: boolean = false;
  typePersistence: string = 'session';
  viewPass: boolean = false;

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private navCtrl: NavController,
    private alertService: AlertsService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    const idApt = this.form.controls['idApt'];
    if(!idApt.valid) {
      this.navCtrl.back();
    }
  }

  onClickLogin() {
    this.navCtrl.back();
  }

  onClickContinue() {
    this.isLoading = true;
    this.authService.signUp().then((loading) => {
      this.isLoading = loading;
    });
  }
}
