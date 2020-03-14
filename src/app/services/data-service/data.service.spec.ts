import { TestBed, getTestBed } from "@angular/core/testing";

import { DataService } from "./data.service";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import ConstantUtils from "src/app/utils/constant-utils";

describe("DataService", () => {
  let service: DataService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    localStorage.setItem(
      ConstantUtils.LOGGEDIN,
      JSON.stringify({ userName: "test", status: true })
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
    localStorage.setItem("testMails2", JSON.stringify(dummyMailData));
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("checks if user is loggedin is true", () => {
    expect(service.isLoggedIn()).toBeTrue();
  });

  it("checks if user is loggedin is false", () => {
    localStorage.setItem(
      ConstantUtils.LOGGEDIN,
      JSON.stringify({ userName: "test", status: false })
    );
    expect(service.isLoggedIn()).toBeFalse();
  });

  it("getLoggedInUser() returns loggedin users name", () => {
    expect(service.getLoggedInUser()).toEqual("test");
  });

  it("login() saves login user details", () => {
    service.login("test user");
    expect(service.getLoggedInUser()).toEqual("test user");
  });

  it("logout() removes the user data returns true always", () => {
    service.logout();
    expect(service.isLoggedIn()).toBeFalsy();
  });

  const dummyMenu = {
    item1: {
      title: "test",
      key: "test"
    },
    item2: {
      title: "test",
      key: "test"
    }
  };

  it("getMenus() returns you menus from assets some random json", () => {
    service.getMenus().subscribe(res => {
      expect(res).toEqual(dummyMenu);
    });
    const req = httpMock.expectOne("assets/mocks/menu.json");
    req.flush(dummyMenu);
    expect(req.request.method).toBe("GET");
  });

  it("getMailMenus() returns you mail menus from assets some random json", () => {
    service.getMailMenus().subscribe(res => {
      expect(res).toEqual(dummyMenu);
    });
    const req = httpMock.expectOne("assets/mocks/mails-menu.json");
    req.flush(dummyMenu);
    expect(req.request.method).toBe("GET");
  });

  it("getMails() returns you mails from local storeage based on user name", () => {
    expect(service.getMails("testMails")).toBeTruthy();
  });

  it("getMails() returns you mails from local storeage based on user name", () => {
    expect(service.getMails("testMailasds")).toBeFalsy();
  });

  it("getUnreadMail() returns you unread mails count in inbox", () => {
    expect(service.getUnreadMail("testMails", "inbox")).toEqual(2);
  });

  it("readMail() reads mails in inbox or any other box and mars as read in metadata", () => {
    service.readMail("testMails", 0, "inbox");
    expect(service.getUnreadMail("testMails", "inbox")).toEqual(1);
  });

  it("delete() delets mail and adds to trash folder", () => {
    service.deleteMail("testMails", "inbox", 0);
    expect(service.getUnreadMail("testMails", "inbox")).toEqual(1);
    expect(service.getUnreadMail("testMails", "trash")).toEqual(1);
  });

  it("permenantDelete() delets mail from trash permenantly", () => {
    service.permenantDelete("testMails", "inbox", 0);
    expect(service.getUnreadMail("testMails", "trash")).toEqual(0);
  });

  const dummyMail = {
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
    },
    isSelected: false
  };

  it("sendMail() sends mail to to user and adds the mail into sent box of the user", () => {
    service.sendMail("testMails", "testMails2", dummyMail);
    expect(service.getMails("testMails")["inbox"].length).toEqual(3);
    expect(service.getMails("testMails2")["sent"].length).toEqual(1);
  });

  it("sendMail() sends mail to to user and adds the mail into sent box of the user when both to and from are same", () => {
    service.sendMail("testMails", "testMails", dummyMail);
    expect(service.getMails("testMails")["inbox"].length).toEqual(3);
    expect(service.getMails("testMails")["sent"].length).toEqual(1);
  });
});
