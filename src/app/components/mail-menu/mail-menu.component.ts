import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data-service/data.service";
import { ActiveMenuService } from "src/app/services/active-menu/active-menu.service";

@Component({
  selector: "app-mail-menu",
  templateUrl: "./mail-menu.component.html",
  styleUrls: ["./mail-menu.component.css"]
})
export class MailMenuComponent implements OnInit {
  activeMenu: string = "";
  constructor(
    private dataService: DataService,
    private activeMenuSub: ActiveMenuService
  ) {}

  menuItems: string[] = [];
  menus: any = {};

  menuClick(item, key) {
    if (
      key === "inbox" ||
      key === "trash" ||
      key === "sent" ||
      key === "drafts"
    )
      this.activeMenu = key;
    this.activeMenuSub.activeMenuSubscription.next(key);
  }

  composeClick() {
    console.log("compose");
    this.activeMenuSub.activeMenuSubscription.next("compose");
  }

  ngOnInit(): void {
    this.dataService.getMailMenus().subscribe(resp => {
      this.menuItems = Object.keys(resp);
      this.menus = resp;
    });
    this.activeMenu = this.activeMenuSub.getActiveMenuInstant();
  }
}
