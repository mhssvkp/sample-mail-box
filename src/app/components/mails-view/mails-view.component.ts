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
  checkedMails: Array<{ type: string; index: number }> = new Array();

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
    // console.log("card clicked index:", i);
    this.clickedMail = this.mails[this.activeMenu][i];
    this.showContent = true;
    this.dataService.readMail(this.loggedInUser, i, this.activeMenu);
    this.mails = this.dataService.getMails(this.loggedInUser);
    this.sortMails();
  }

  checkBoxClick(event: Event, index: number) {
    event.preventDefault();
    event.stopPropagation();
    this.mails[this.activeMenu][index].isSelected = !this.mails[
      this.activeMenu
    ][index].isSelected;
    const selected = {
      type: this.activeMenu,
      index
    };
    this.mails = JSON.parse(JSON.stringify(this.mails));
    this.checkedMails.push(selected);
    console.log("checked", index, this.mails[this.activeMenu][index]);
  }

  ngOnInit(): void {
    this.loggedInUser = this.dataService.getLoggedInUser();
    this.mails = this.dataService.getMails(this.loggedInUser);
    this.activeMenu = this.activeMenuSub.getActiveMenuInstant();
    this.sortMails();
    this.unreadMails = this.dataService.getUnreadMail(this.loggedInUser);
    this.unreadMailsSubscription = this.dataService.unreadMailCountObserver.subscribe(
      count => {
        this.unreadMails = count;
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
        )
          this.activeMenu = title;
        if (title === "compose") {
          this.showCompose = true;
        }
      }
    );
  }
  close(val) {
    console.log("close called", val);
    this.showContent = val;
    this.checkedMails = new Array();
  }

  closeCompose(val) {
    this.checkedMails = new Array();
    this.showCompose = val;
    this.mails = this.dataService.getMails(this.loggedInUser);
    this.sortMails();
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
  }

  formatDate(date) {
    return new Date(date).toDateString();
  }

  sortMails() {
    this.mails[this.activeMenu].sort(
      (a, b) => b.metadata.receivedTime - a.metadata.receivedTime
    );
  }

  ngOnDestroy() {
    this.menuMailsSubscription.unsubscribe();
  }
}
