import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { UsersService } from "src/app/services/users-service/users.service";
import ConstantUtils from "src/app/utils/constant-utils";
import { DataService } from "src/app/services/data-service/data.service";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let usersService: UsersService;
  let dataService: DataService;
  let usersServiceStub = {
    validateUser: (mail, pwd) => {
      if (mail === "test@domain.com" && pwd === "test") {
        return "test11111";
      }
      return "";
    }
  };

  let dataServiceStub = {
    login: user => {
      localStorage.setItem(
        ConstantUtils.LOGGEDIN,
        JSON.stringify({ userName: user, status: true })
      );
    },
    isLoggedIn: () => {
      return false;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: "home", component: HomeComponent }
        ]),
        FormsModule
      ],
      providers: [
        { provide: UsersService, useValue: usersServiceStub },
        { provide: DataService, useValue: dataServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    // usersService = fixture.debugElement.injector.get(UsersService);
    usersService = TestBed.inject(UsersService);
    dataService = TestBed.inject(DataService);
    localStorage.clear();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should login the user and route to home", () => {
    localStorage.clear();
    fixture.detectChanges();
    usersService = fixture.debugElement.injector.get(UsersService);
    dataService = fixture.debugElement.injector.get(DataService);
  });

  // expect(component.emailRegex.test(component.email)).toBeTrue();
  // let el = fixture.debugElement.nativeElement.querySelector(".btn-primary");
  // el.click();
  // expect(dataService.login).toHaveBeenCalledTimes(1);
  // expect(usersService.validateUser).toHaveBeenCalledTimes(1);
  // expect(component.login).toHaveBeenCalledTimes(1);
  // fixture.detectChanges();
  // expect(component.routeToHome).toHaveBeenCalledTimes(1);
  // expect(router.navigateByUrl).toHaveBeenCalledWith("/home");

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
