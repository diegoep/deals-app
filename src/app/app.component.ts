import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatActionList, MatListItem, MatNavList} from "@angular/material/list";
import {filter, map} from "rxjs";

@Component({
  selector: 'td-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSlideToggleModule,
    MatToolbar,
    MatButton,
    MatNavList,
    MatListItem,
    MatIconButton,
    MatIcon,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatActionList
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'termsheet-deals-app';

  selectedItem: string = 'myDeals';
  router = inject(Router);

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), map((event: NavigationEnd) => event.urlAfterRedirects.replace('/', '')))
      .subscribe((event: string) => {
        this.selectItem(event);
      });
  }

  navigateTo(route: string) {
    return this.router.navigate([route]);
  }

  selectItem(item: string) {
    this.selectedItem = item;
  }}
