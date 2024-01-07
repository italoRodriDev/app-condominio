import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  isMobile = this.platform.is('mobile');
  collapsed: boolean = false;
  @Input() listMenuItems: Array<any> | undefined;
  showMenu: boolean = false;
  currentRoute: string = '';
  operationStore: boolean = false;

  constructor(
    private authService: AuthService,
    private platform: Platform,
    private navCtrl: NavController,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCurrentRoute();
  }

  getCurrentRoute() {
    this.activateRoute.url.subscribe((data) => {
      this.currentRoute = data[0]?.path;
    });
  }

  onClickShowMenu() {
    this.showMenu = !this.showMenu;
  }

  onClickItemMenu(router: any) {
    if (router == 'SAIR_DA_CONTA') {
      this.authService.signOutAccount();
    } else {
      this.navCtrl.navigateRoot(router);
    }
  }
}
