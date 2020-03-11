import { Injectable } from "@angular/core";
import LocalStorageUtil from "../../utils/local-storage-util";
import constants from "../../utils/constant-utils";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Mailbox } from "../../modals/mailbox";
import { Mail } from "../../modals/mail";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class DataService {
  storage = new LocalStorageUtil();
  userLoginStatusObserver: Subject<boolean> = new Subject();
  unreadMailCountObserver: Subject<number> = new Subject();
  constructor(private httpService: HttpClient, private router: Router) {}

  isLoggedIn(): boolean {
    return this.storage.get(constants.LOGGEDIN)?.status;
  }

  getLoggedInUser() {
    return this.storage.get(constants.LOGGEDIN)?.userName;
  }

  login(userName) {
    this.storage.post(constants.LOGGEDIN, { status: true, userName });
    this.userLoginStatusObserver.next(this.isLoggedIn());
  }

  logout() {
    this.storage.remove(constants.LOGGEDIN);
    this.userLoginStatusObserver.next(this.isLoggedIn());
    this.router.navigateByUrl("/login");
  }

  getMenus() {
    return this.httpService.get("assets/mocks/menu.json");
  }

  getMailMenus() {
    return this.httpService.get("assets/mocks/mails-menu.json");
  }

  getMails(userName) {
    return this.storage.get(userName);
  }

  getUnreadMail(userName) {
    let mailbox: Mailbox = this.getMails(userName);
    return mailbox.inbox.reduce((unreadCount, mails) => {
      if (!mails.metadata.read) {
        unreadCount++;
      }
      return unreadCount;
    }, 0);
  }

  readMail(userName, index, mailType) {
    let mails: Mailbox = this.getMails(userName);
    mails[mailType] = mails[mailType].map((val, ind) => {
      if (ind === index) {
        val.metadata.read = true;
      }
      return val;
    });
    this.storage.put(userName, mails);
    this.unreadMailCountObserver.next(this.getUnreadMail(userName));
  }

  deleteMail(userName, type, index) {
    let mails: Mailbox = this.getMails(userName);
    const mail: Mail[] = mails[type].splice(index, 1);
    mails.trash.push(...mail);
    this.storage.put(userName, mails);
  }

  permenantDelete(userName, type, index) {
    let mails: Mailbox = this.getMails(userName);
    mails[type].splice(index, 1);
    this.storage.put(userName, mails);
  }

  sendMail(toUser: string, fromUser: string, mail: Mail) {
    if (fromUser === toUser) {
      let toUserMails: Mailbox = this.getMails(toUser);
      mail = this.addTime(mail);
      toUserMails.inbox.push(mail);
      toUserMails.sent.push(mail);
      this.storage.put(toUser, toUserMails);
    } else {
      let toUserMails: Mailbox = this.getMails(toUser);
      let fromUserMails: Mailbox = this.getMails(fromUser);
      mail = this.addTime(mail);
      fromUserMails.sent.push(mail);
      toUserMails.inbox.push(mail);
      this.storage.put(toUser, toUserMails);
      this.storage.put(fromUser, fromUserMails);
    }
    this.unreadMailCountObserver.next(this.getUnreadMail(fromUser));
  }

  private addTime(mail: Mail): Mail {
    const date = Date.now();
    mail.metadata.sentTime = date;
    mail.metadata.receivedTime = date;
    return mail;
  }
}