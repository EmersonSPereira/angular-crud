import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Progress } from './progress.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private _progress = new BehaviorSubject<Progress>({
    show: false,
  });

constructor() { }

get progress(): Progress {
  return this._progress.value;
}
set progress(progress: Progress){
  this._progress.next(progress);
}
}
