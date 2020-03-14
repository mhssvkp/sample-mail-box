import { Component, OnInit, OnDestroy } from "@angular/core";
import { SideNavService } from "src/app/services/side-nav-service/side-nav.service";
import { Subscription } from "rxjs";
import { DataService } from "src/app/services/data-service/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  sideNavOpen: boolean = false;
  sideNavSubscription: Subscription = new Subscription();
  svgSrc: string = "assets/icons/menu.svg";
  unreadMails: number = 0;
  unreadMailsSubscription: Subscription = new Subscription();
  constructor(
    private sideNavService: SideNavService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sideNavSubscription = this.sideNavService.toggler.subscribe(
      sideNavOpen => {
        this.sideNavOpen = sideNavOpen;
      }
    );
    this.unreadMailsSubscription = this.dataService.unreadMailCountObserver.subscribe(
      count => {
        this.unreadMails = count;
      }
    );
    this.unreadMails = this.dataService.getUnreadMail(
      this.dataService.getLoggedInUser(),
      "inbox"
    );
  }
  changeSvg() {
    this.sideNavService.toggleSideNav();
    this.svgSrc = this.sideNavOpen
      ? "assets/icons/close.svg"
      : "assets/icons/menu.svg";
  }

  logout() {
    let loggedOut = this.dataService.logout();
    if (loggedOut) {
      this.router.navigateByUrl("/login");
    }
  }

  ngOnDestroy() {
    // console.log("header destroyed");
    this.sideNavSubscription.unsubscribe();
  }
}
