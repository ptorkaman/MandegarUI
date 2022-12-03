import { Component, OnInit } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { MENU_ITEMS } from '../../shared/statics/pages-menu';

@Component({
  selector: 'app-pages',
  templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit {

  menu = MENU_ITEMS;

  constructor() {

  }

  ngOnInit() {
  }

}
