import { Mail } from "./mail";

export class Mailbox {
  sent: Array<Mail> = new Array<Mail>();
  drafts: Array<Mail> = new Array<Mail>();
  trash: Array<Mail> = new Array<Mail>();
  inbox: Array<Mail> = new Array<Mail>();
}
