import { Component, OnInit } from "@angular/core";
import { SideNavService } from "src/app/services/side-nav-service/side-nav.service";
import { Subscription } from "rxjs";
import { DataService } from "src/app/services/data-service/data.service";
import { ActiveMenuService } from "src/app/services/active-menu/active-menu.service";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.css"]
})
export class SideNavComponent implements OnInit {
  sideNavSubscription: Subscription = new Subscription();
  sideNavOpen: boolean = false;
  menuItems: any = [];
  loggedInUser: string = "";
  activeMenu: string = "";

  constructor(
    private sideNavService: SideNavService,
    private dataService: DataService,
    private activeMenuSvc: ActiveMenuService
  ) {}

  ngOnInit(): void {
    this.dataService.getMenus().subscribe(resp => {
      // console.log(resp);
      this.menuItems = resp;
    });
    this.activeMenu = this.activeMenuSvc.getActiveMenuInstant();
    if (this.activeMenu === "inbox") {
      this.activeMenu = "Inbox";
    }
    this.loggedInUser = this.dataService.getLoggedInUser();

    this.sideNavSubscription = this.sideNavService.toggler.subscribe(
      sideNavOpen => {
        this.sideNavOpen = sideNavOpen;
      }
    );
  }

  ngOnDestroy() {
    this.sideNavService.toggler.next(false);
    this.sideNavSubscription.unsubscribe();
  }
}
