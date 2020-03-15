import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users-service/users.service";
import { DataService } from "src/app/services/data-service/data.service";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  isInvalidEmail: boolean = false;
  emailRegex: RegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  isLoggedIn: boolean = false;
  constructor(
    private usersService: UsersService,
    private dataService: DataService,
    private router: Router
  ) {}

  isMailValid() {
    if (!this.emailRegex.test(this.email)) {
      this.isInvalidEmail = true;
    } else {
      this.isInvalidEmail = false;
    }
  }

  login() {
    if (!this.emailRegex.test(this.email)) {
      this.isInvalidEmail = true;
      return;
    }
    const validUser = this.usersService.validateUser(this.email, this.password);
    if (validUser) {
      this.dataService.login(validUser);
      this.routeToHome();
    } else {
      window.alert("Invalid Credentials");
    }
  }
  routeToHome() {
    this.router.navigateByUrl("/home");
  }

  ngOnInit(): void {
    this.isLoggedIn = this.dataService.isLoggedIn();
    if (this.isLoggedIn) {
      this.routeToHome();
    }
  }
}
