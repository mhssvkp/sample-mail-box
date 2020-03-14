import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Mail } from "src/app/modals/mail";
import { DataService } from "src/app/services/data-service/data.service";

@Component({
  selector: "app-mail-compose",
  templateUrl: "./mail-compose.component.html",
  styleUrls: ["./mail-compose.component.css"]
})
export class MailComposeComponent implements OnInit {
  @Output() closeBool: EventEmitter<boolean> = new EventEmitter();

  mailContent: string = "";
  to: string = "";
  cc: string = "";
  subject: string = "";
  errorMessage: string = "";
  mail: Mail = new Mail();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  close() {
    this.closeBool.emit(false);
  }

  sendMail() {
    if (this.to === "" || this.subject === "" || this.mailContent === "") {
      this.errorMessage =
        "Oooops!!! Something important in mail is missing please ensure To,Subject and Mail Content are not empty";
    } else {
      this.mail.content.to = this.to;
      this.mail.content.from = this.dataService.getLoggedInUser();
      this.mail.content.subject = this.subject;
      this.mail.content.content = this.mailContent;
      console.log(this.to, this.cc, this.subject, this.mailContent, this.mail);
      this.dataService.sendMail(
        this.to,
        this.dataService.getLoggedInUser(),
        this.mail
      );
      this.closeBool.emit(false);
    }
  }

  mailContentChange(event: Event) {
    this.mailContent = event.target["innerText"];
    console.log(event);
  }
}
