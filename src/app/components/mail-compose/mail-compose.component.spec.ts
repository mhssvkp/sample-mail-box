import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MailComposeComponent } from "./mail-compose.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("MailComposeComponent", () => {
  let component: MailComposeComponent;
  let fixture: ComponentFixture<MailComposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MailComposeComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
