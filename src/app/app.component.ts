import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsersService } from "./services/users-service/users.service";
import { DataService } from "./services/data-service/data.service";
import { SideNavService } from "./services/side-nav-service/side-nav.service";
import { Subscription } from "rxjs";
import { InitialisingService } from "./services/initialising-service/initialising.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  userName: string = "";
  sideNavSubscription: Subscription = new Subscription();
  loginStatusSubscription: Subscription = new Subscription();
  sideNavOpen: boolean = false;

  constructor(
    private userService: UsersService,
    private dataService: DataService,
    private sideNavService: SideNavService,
    private initialise: InitialisingService
  ) {}
  ngOnInit(): void {
    this.loggedIn = this.dataService.isLoggedIn(); // login check for already logged in user
    this.loginStatusSubscription = this.dataService.userLoginStatusObserver.subscribe(
      loggedIn => {
        this.loggedIn = loggedIn;
        if (this.loggedIn) {
          this.userName = this.dataService.getLoggedInUser();
        }
      }
    );
    this.sideNavSubscription = this.sideNavService.toggler.subscribe(
      sideNavOpen => {
        this.sideNavOpen = sideNavOpen;
      }
    );
  }

  ngOnDestroy() {
    this.sideNavSubscription.unsubscribe();
    this.loginStatusSubscription.unsubscribe();
  }
}
