import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Mail } from "src/app/modals/mail";

@Component({
  selector: "app-mail-content-view",
  templateUrl: "./mail-content-view.component.html",
  styleUrls: ["./mail-content-view.component.css"]
})
export class MailContentViewComponent implements OnInit {
  @Input() mail: Mail = new Mail();
  @Output() closeBool: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  close() {
    // console.log("close from content");
    this.closeBool.emit(false);
  }
  ngOnInit(): void {
    // console.log(this.mail);
  }
}
