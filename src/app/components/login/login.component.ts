import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users-service/users.service";
import { DataService } from "src/app/services/data-service/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userName: string = "";
  password: string = "";

  constructor(
    private usersService: UsersService,
    private dataService: DataService,
    private router: Router
  ) {
    console.log();
    if (this.dataService.isLoggedIn()) {
      this.routeToHome();
    }
  }

  login() {
    const validUser = this.usersService.validateUser(
      this.userName,
      this.password
    );
    if (validUser) {
      this.dataService.login(this.userName);
      this.routeToHome();
    }
  }
  routeToHome() {
    this.router.navigateByUrl("/home");
  }

  ngOnInit(): void {}
}
