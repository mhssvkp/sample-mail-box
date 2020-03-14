import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { HeaderComponent } from "./components/header/header.component";
import { InitialisingService } from "./services/initialising-service/initialising.service";
import { DataService } from "./services/data-service/data.service";
import { UsersService } from "./services/users-service/users.service";
import { SideNavService } from "./services/side-nav-service/side-nav.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("AppComponent", () => {
  let initialisingService: InitialisingService;
  let dataService: DataService;
  let userService: UsersService;
  let sideNavSerivce: SideNavService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [
        InitialisingService,
        DataService,
        UsersService,
        SideNavService,
        HttpClient
      ]
    }).compileComponents();
    initialisingService = TestBed.inject(InitialisingService);
    dataService = TestBed.inject(DataService);
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);

    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`test if login false`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.autoDetectChanges();
    dataService.logout();
    expect(app.loggedIn).toBeFalsy();
  });

  // it("should render title", () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector(".content span").textContent).toContain(
  //     "simple-mail-application app is running!"
  //   );
  // });
});
