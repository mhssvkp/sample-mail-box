import { Metadata } from "./metadata";
import { Content } from "./content";

export class Mail {
  metadata: Metadata = new Metadata();
  content: Content = new Content();
  isSelected: boolean = false;
}
