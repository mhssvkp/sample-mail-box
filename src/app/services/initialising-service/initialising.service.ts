import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import LocalStorageUtil from "src/app/utils/local-storage-util";

@Injectable({
  providedIn: "root"
})
export class InitialisingService {
  ls = new LocalStorageUtil();
  constructor(private httpService: HttpClient) {
    this.getMailsData().subscribe(resp => {
      const keys = Object.keys(resp);
      keys.forEach(val => {
        this.ls.post(val, resp[val]);
      });
    });
  }

  getMailsData() {
    return this.httpService.get("assets/mocks/initialise-mails.json");
  }
}
