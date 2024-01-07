import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';

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
    private platform: Platform,
    private navCtrl: NavController,
    private activateRoute: ActivatedRoute,
    private modalCtrl: ModalController
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
      //his.authService.signOutAccount();
    } else {
      this.navCtrl.navigateRoot(router);
    }
  }
}
