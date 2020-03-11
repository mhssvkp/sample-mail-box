import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SideNavService {
  sideNavOpen: boolean = false;
  toggler: Subject<boolean> = new Subject();
  constructor() {}

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
    this.toggler.next(this.sideNavOpen);
  }
}
