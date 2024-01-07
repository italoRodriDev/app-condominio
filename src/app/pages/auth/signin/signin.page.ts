import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { FormService } from 'src/app/services/forms/form.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LazyLoadImageModule, ReactiveFormsModule]
})
export class SigninPage implements OnInit {
  formSignIn: FormGroup = this.formService.formSignIn;
  isLoading: boolean = false;
  typePersistence: string = 'session';
  viewPass: boolean = false;

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser();
  }

  onChangePersistenceAuth(ev: any) {
    const checked = ev.detail.checked;
    if(checked == true) {
      this.typePersistence = 'local';
    } else {
      this.typePersistence = 'session';
    }
  }

  onClickSignUp() {
    this.navCtrl.navigateForward('cadastro');
  }

  onClickRecoverPassword() {
    this.navCtrl.navigateForward('recuperacao');
  }

  onClickContinue() {
    this.isLoading = true;
    this.authService.signInAccount(this.typePersistence).then((loading) => {
      this.isLoading = loading;
    });
  }

}
