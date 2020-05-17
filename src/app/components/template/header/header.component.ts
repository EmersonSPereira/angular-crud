import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';
import { HeaderData } from './header-data.model';
import { NavService } from '../nav/nav.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuIcon = 'menu';
  imageUrl = 'assets/logo_transparente.png';

  constructor(private headerService: HeaderService, private navService: NavService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 400px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.imageUrl = 'assets/logo_transparente.png';
        } else {
          this.imageUrl = 'assets/logo_transparente_mobile.png';
        }
      });
  }

  get title(): string {
    return this.headerService.headerData.title;
  }
  get icon(): string {
    return this.headerService.headerData.icon;
  }
  get routerUrl(): string {
    return this.headerService.headerData.routerUrl;
  }

  get opened(): boolean {
    return this.navService.headerData.opened;
  }
  set opened(opened: boolean) {
    this.navService.headerData.opened = opened;
  }

  openOrClosenav(): void {
    if (this.opened) {
      this.opened = false;
      this.menuIcon = 'menu';
    } else {
      this.opened = true;
      this.menuIcon = 'close';
    }
  }

}
