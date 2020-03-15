import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import ConstantUtils from "src/app/utils/constant-utils";
import { SideNavService } from "src/app/services/side-nav-service/side-nav.service";
import { Router } from "@angular/router";
import { DataService } from "src/app/services/data-service/data.service";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { LoginComponent } from "../login/login.component";
import { of } from "rxjs";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let dataService: DataService;
  let sideNavService: SideNavService;
  let badgeDe: DebugElement;
  let badgeEl: HTMLElement;
  let logoutDe: DebugElement;
  let logoutEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: "login", component: LoginComponent }
        ])
      ]
      // providers:[{provide:SideNavService,useValue:sideNavStub}]
    }).compileComponents();
    localStorage.setItem(
      ConstantUtils.LOGGEDIN,
      JSON.stringify({ userName: "testMails", status: true })
    );

    const dummyMailData = {
      sent: [],
      trash: [],
      inbox: [
        {
          metadata: {
            deleted: false,
            sentTime: 0,
            receivedTime: 0,
            drafted: false,
            read: false
          },
          content: {
            to: "pavan",
            from: "someone",
            subject: "this is a test mail",
            content: "no content"
          }
        },
        {
          metadata: {
            deleted: false,
            sentTime: 0,
            receivedTime: 0,
            drafted: false,
            read: true
          },
          content: {
            to: "pavan",
            from: "anonymous",
            subject: "this is a test mail",
            content: "there is some content in here"
          }
        }
      ]
    };
    localStorage.setItem(
      ConstantUtils.LOGGEDIN,
      JSON.stringify({ userName: "testMails", status: true })
    );
    localStorage.setItem("testMails", JSON.stringify(dummyMailData));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    sideNavService = TestBed.inject(SideNavService);
    dataService = TestBed.inject(DataService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("check unread count", () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.unreadMails).toEqual(1);
  });

  it("Check uread count on badge in template", () => {
    component.ngOnInit();
    badgeDe = fixture.debugElement.query(By.css(".icon-badge-1"));
    badgeEl = badgeDe.nativeElement;
    expect(badgeEl.innerText.valueOf()).toEqual("1");
  });

  it("should logout when clicked on logout", () => {
    component.ngOnInit();
    spyOn(component, "logout");
    logoutDe = fixture.debugElement.query(By.css("#logout"));
    logoutEl = logoutDe.nativeElement;
    logoutEl.click();
    expect(component.logout).toHaveBeenCalledTimes(1);
  });

  it("should chenge the icon source of toggle", async () => {
    component.ngOnInit();
    expect(component.sideNavOpen).toBeFalse();
    expect(component.svgSrc).toEqual("assets/icons/menu.svg");
    spyOn(sideNavService, "toggleSideNav");
    component.toggle();
    fixture.detectChanges();
    expect(component.sideNavOpen).toBeFalse();
    expect(component.svgSrc).toEqual("assets/icons/menu.svg");
    expect(sideNavService.toggleSideNav).toHaveBeenCalledTimes(1);
  });
});
