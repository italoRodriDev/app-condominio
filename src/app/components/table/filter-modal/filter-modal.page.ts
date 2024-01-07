import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class FilterModalPage implements OnInit {

  @Input() listOpts: Array<any>|undefined;
  @Input() enableSelectOpts: boolean|undefined;
  @Input() enableStars: boolean|undefined;
  @Input() enableValueMoney: boolean|undefined;
  @Input() minValueRangeMoney: boolean|undefined;
  @Input() maxValueRangeMoney: boolean|undefined;

  optsSelected = null;
  lowerUpperMoney: any = { lower: null, upper: null };
  numberStars = null;

  constructor(
    private filterService: FilterService,
    private modalCtrl: ModalController) {}

  ngOnInit() {}

  ionViewDidEnter(){
    this.getDataFilter();
  }

  getDataFilter() {
    this.filterService.changeOnChangeSelectOpts.subscribe((value) => {
     this.optsSelected = value;
    });
 
    this.filterService.changeOnChangeOnChangeStars.subscribe((value) => {
     this.numberStars = value;
    });
 
    this.filterService.changeOnChangeValueMoney.subscribe((value) => {
     this.lowerUpperMoney = value;
    });
   }

  onChangeSelectOpts(ev: any) {
    const value = ev.detail.value;
    if(value) {
      this.optsSelected = value;
      this.filterService.bsChangeSelectOpts.next(value);
    } 
  }

  onChangeStars(ev: any) {
    const value = ev.detail.value;
    if(value) {
      this.numberStars = value;
      this.filterService.bsChangeOnChangeStars.next(value);
    }
  }

  onChangeValueMoney(ev: any) {
    const value = ev.detail.value;
    if(value) {
      this.lowerUpperMoney = value;
      this.filterService.bsChangeOnChangeValueMoney.next(value);
    }
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }
}
