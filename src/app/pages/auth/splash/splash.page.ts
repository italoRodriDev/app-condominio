import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormService } from 'src/app/services/forms/form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SplashPage implements OnInit {
  constructor(
    private authService: AuthService,
    private formService: FormService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getParamsUrl();
  }

  async getParamsUrl() {
    
    this.route.params.subscribe((data: any) => {
      if (data.id != null) {
        const id = data.id;
        this.authService.idCondominio = id;
        localStorage.setItem('condominio', id);
      }
    });
  }
}
