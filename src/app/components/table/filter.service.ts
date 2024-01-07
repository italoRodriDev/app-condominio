import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public bsChangeSelectOpts = new BehaviorSubject<any>(null);
  changeOnChangeSelectOpts = this.bsChangeSelectOpts.asObservable();

  public bsChangeOnChangeStars = new BehaviorSubject<any>(null);
  changeOnChangeOnChangeStars = this.bsChangeOnChangeStars.asObservable();

  public bsChangeOnChangeValueMoney = new BehaviorSubject<any>(null);
  changeOnChangeValueMoney = this.bsChangeOnChangeValueMoney.asObservable();

  constructor() { }
}
