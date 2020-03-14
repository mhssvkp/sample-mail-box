import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MailMenuComponent } from "./mail-menu.component";
import { DataService } from "src/app/services/data-service/data.service";
import { ActiveMenuService } from "src/app/services/active-menu/active-menu.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("MailMenuComponent", () => {
  let component: MailMenuComponent;
  let fixture: ComponentFixture<MailMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MailMenuComponent],
      imports: [HttpClientTestingModule],
      providers: [DataService, ActiveMenuService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
