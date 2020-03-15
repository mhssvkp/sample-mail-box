import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  RouterTestingModule,
  setupTestingRouter
} from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { UsersService } from "src/app/services/users-service/users.service";

import { DataService } from "src/app/services/data-service/data.service";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let usersService: UsersService;
  let dataService: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: "", redirectTo: "/login", pathMatch: "full" },
          { path: "login", component: LoginComponent },
          { path: "home", component: HomeComponent }
        ]),
        FormsModule
      ]
    }).compileComponents();
    usersService = TestBed.inject(UsersService);
    dataService = TestBed.inject(DataService);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(LoginComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("isMailValid() test validity of email addresses to be true", () => {
    component.email = "test@domain.com";
    component.isMailValid();
    expect(component.isInvalidEmail).toBeFalse();
  });

  it("isMailValid() test validity of email addresses to be false", () => {
    component.email = "test@domain";
    component.isMailValid();
    expect(component.isInvalidEmail).toBeTrue();
  });
});
