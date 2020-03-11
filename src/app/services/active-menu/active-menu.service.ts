import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ActiveMenuService {
  activeMenu: string = "inbox";
  activeMenuSubscription: Subject<string> = new Subject();

  constructor() {}

  getActiveMenuInstant() {
    return this.activeMenu;
  }
  updateActiveMenu(title) {
    this.activeMenu = title;
    this.activeMenuSubscription.next(this.activeMenu);
  }
}
