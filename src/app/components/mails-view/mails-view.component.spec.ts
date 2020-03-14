import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MailsViewComponent } from "./mails-view.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import ConstantUtils from "src/app/utils/constant-utils";

describe("MailsViewComponent", () => {
  let component: MailsViewComponent;
  let fixture: ComponentFixture<MailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MailsViewComponent],
      imports: [HttpClientTestingModule]
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
            read: false
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
    localStorage.setItem("testMails", JSON.stringify(dummyMailData));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
