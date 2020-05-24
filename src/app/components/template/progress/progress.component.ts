import { Component, OnInit } from '@angular/core';
import { ProgressService } from './progress.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  constructor(private progressService: ProgressService) { }

  get showProgress(): boolean{
    return  this.progressService.progress.show;
  }
  ngOnInit(): void {
  }

}
