import { Injectable } from '@angular/core';
import { NavData } from './nav-data.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private _navData = new BehaviorSubject<NavData>({
    opened: false
  });

  constructor() { }

  get headerData(): NavData {
    return this._navData.value;
  }
  set headerData(headerData: NavData) {
    this._navData.next(headerData);
  }
}
