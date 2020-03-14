import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "src/app/services/data-service/data.service";
import { Mailbox } from "../../modals/mailbox";
import { Mail } from "../../modals/mail";
import { Subscription } from "rxjs";
import { ActiveMenuService } from "src/app/services/active-menu/active-menu.service";

@Component({
  selector: "app-mails-view",
  templateUrl: "./mails-view.component.html",
  styleUrls: ["./mails-view.component.css"]
})
export class MailsViewComponent implements OnInit, OnDestroy {
  mails: Mailbox = new Mailbox();
  showContent: boolean = false;
  clickedMail: Mail = new Mail();
  unreadMails: number = 0;
  unreadMailsSubscription: Subscription = new Subscription();
  menuMailsSubscription: Subscription = new Subscription();
  showCompose: boolean = false;
  activeMenu: string = "";
  activeMail: any = [];
  loggedInUser: string = "";
  mailBoxTitle: string = "";
  checkedMails: Array<{ type: string; index: number }> = new Array();
  checkedFalseFilter = val => {
    return index => {
      return !(val.index === index);
    };
  };

  icons: any = [
    { src: "assets/icons/refresh.svg", alt: "refresh", label: "Refresh" },
    { src: "assets/icons/delete.svg", alt: "delete", label: "" },
    { src: "assets/icons/preview.svg", alt: "preview", label: "" }
  ];
  constructor(
    private dataService: DataService,
    private activeMenuSub: ActiveMenuService
  ) {}

  cardClicked(i: number) {
    console.log("card clicked index:", i);
    this.clickedMail = this.mails[this.activeMenu][i];
    this.showContent = true;
    this.dataService.readMail(this.loggedInUser, i, this.activeMenu);
    this.refreshMailCountIfNotInbox();
    this.mails = this.dataService.getMails(this.loggedInUser);
    this.sortMails();
  }

  checkBoxClick(event: Event, index: number) {
    event.stopPropagation();
    const isChecked: boolean = event.target["checked"];
    this.mails[this.activeMenu][index].isSelected = !this.mails[
      this.activeMenu
    ][index].isSelected;
    const selected = {
      type: this.activeMenu,
      index
    };
    this.mails = JSON.parse(JSON.stringify(this.mails));
    if (isChecked) {
      this.checkedMails.push(selected);
    } else {
      this.checkedMails = this.checkedMails.filter(selectedMail =>
        this.checkedFalseFilter(selectedMail)(index)
      );
    }

    console.log(
      "checked",
      index,
      this.mails[this.activeMenu][index],
      this.checkedMails
    );
  }

  ngOnInit(): void {
    this.loggedInUser = this.dataService.getLoggedInUser();
    this.mails = this.dataService.getMails(this.loggedInUser);
    this.activeMenu = this.activeMenuSub.getActiveMenuInstant();
    this.mailBoxTitle = "Inbox";
    this.sortMails();
    this.unreadMails = this.dataService.getUnreadMail(
      this.loggedInUser,
      this.activeMenu
    );
    this.unreadMailsSubscription = this.dataService.unreadMailCountObserver.subscribe(
      count => {
        if (this.activeMenu === "inbox") this.unreadMails = count;
      }
    );

    this.menuMailsSubscription = this.activeMenuSub.activeMenuSubscription.subscribe(
      title => {
        this.checkedMails = new Array();
        if (
          title === "inbox" ||
          title === "trash" ||
          title === "sent" ||
          title === "drafts"
        ) {
          this.activeMenu = title;
          this.mailBoxTitle;
          this.unreadMails = this.dataService.getUnreadMail(
            this.loggedInUser,
            this.activeMenu
          );
        }
        if (title === "inbox") {
          this.mailBoxTitle = "Inbox";
        }
        if (title === "trash") {
          this.mailBoxTitle = "Trash";
        }
        if (title === "sent") {
          this.mailBoxTitle = "Sent Mail";
        }
        if (title === "drafts") {
          this.mailBoxTitle = "Drafts";
        }
        if (title === "compose") {
          this.showCompose = true;
        }
        this.sortMails();
      }
    );
  }
  close(val) {
    console.log("close called", val);
    this.showContent = val;
    this.checkedMails = new Array();
    this.refreshMailCountIfNotInbox();
  }

  closeCompose(val) {
    this.checkedMails = new Array();
    this.showCompose = val;
    this.mails = this.dataService.getMails(this.loggedInUser);
    this.sortMails();
    this.refreshMailCountIfNotInbox();
  }

  iconClick(alt) {
    if (alt === "refresh") {
      this.mails = this.dataService.getMails(this.loggedInUser);
      this.sortMails();
      this.checkedMails = new Array();
    }
    if (alt === "delete") {
      console.log(alt);
      console.log(this.checkedMails);
      this.checkedMails.sort((a, b) => {
        return b.index - a.index;
      });
      console.log(this.checkedMails);
      if (this.activeMenu === "trash") {
        this.checkedMails.forEach(val => {
          this.dataService.permenantDelete(
            this.loggedInUser,
            val.type,
            val.index
          );
        });
        this.checkedMails = new Array();
        return;
      }
      this.checkedMails.forEach(val => {
        this.dataService.deleteMail(this.loggedInUser, val.type, val.index);
      });
      this.checkedMails = new Array();
      this.mails = this.dataService.getMails(this.loggedInUser);
      this.sortMails();
    }
    this.refreshMailCountIfNotInbox();
  }

  formatDate(date) {
    return new Date(date).toDateString();
  }

  sortMails() {
    this.mails[this.activeMenu].sort(
      (a, b) => b.metadata.receivedTime - a.metadata.receivedTime
    );
  }

  refreshMailCountIfNotInbox() {
    this.unreadMails = this.dataService.getUnreadMail(
      this.loggedInUser,
      this.activeMenu
    );
  }

  ngOnDestroy() {
    this.menuMailsSubscription.unsubscribe();
    this.unreadMailsSubscription.unsubscribe();
  }
}
