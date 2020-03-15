import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { InitialisingService } from "./services/initialising-service/initialising.service";
import { DataService } from "./services/data-service/data.service";
import { UsersService } from "./services/users-service/users.service";
import { SideNavService } from "./services/side-nav-service/side-nav.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let initialisingService: InitialisingService;
  let dataService: DataService;
  let userService: UsersService;
  let sideNavSerivce: SideNavService;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: "", pathMatch: "full", redirectTo: "login" },
          { path: "login", component: LoginComponent }
        ]),
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [AppComponent, LoginComponent],
      providers: [
        AppComponent,
        InitialisingService,
        DataService,
        UsersService,
        SideNavService,
        HttpClient
      ]
    }).compileComponents();
    initialisingService = TestBed.inject(InitialisingService);
    dataService = TestBed.inject(DataService);
    userService = TestBed.inject(UsersService);
    sideNavSerivce = TestBed.inject(SideNavService);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    router = TestBed.get(Router);
  }));

  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it(`test logout feature login false`, () => {
    fixture.autoDetectChanges();
    dataService.logout();
    expect(app.loggedIn).toBeFalsy();
  });

  it(`when componenet is created route is /`, () => {
    expect(router.url).toEqual("/");
  });
});
