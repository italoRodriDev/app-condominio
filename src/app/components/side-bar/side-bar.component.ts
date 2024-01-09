import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { TypeUser } from 'src/app/enum/type_user';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  NAVBAR_DATA_MENU_CONDOMINIO,
  NAVBAR_DATA_MENU_MORADOR,
  NAVBAR_DATA_MENU_NULL,
} from './nav-data';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  isMobile = this.platform.is('mobile');
  collapsed: boolean = false;
  listMenuItems: Array<any> = NAVBAR_DATA_MENU_MORADOR;
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
    this.getTypeMenu();
    this.getCurrentRoute();
  }

  getTypeMenu() {
    this.authService.bsTypeUser.subscribe((type) => {
      switch (type) {
        case TypeUser.CONDOMINIO:
          this.listMenuItems = NAVBAR_DATA_MENU_CONDOMINIO;
          break;
        case TypeUser.MORADOR:
          this.listMenuItems = NAVBAR_DATA_MENU_MORADOR;
          break;
        default:
          this.listMenuItems = NAVBAR_DATA_MENU_NULL;
          break;
      }
    });
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
