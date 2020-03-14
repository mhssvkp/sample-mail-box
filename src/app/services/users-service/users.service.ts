import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/modals/User";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  users: any = {};
  constructor(private httpService: HttpClient) {
    this.fetchUsers();
  }

  private fetchUsers() {
    this.httpService.get("assets/mocks/users.json").subscribe(resp => {
      // console.log(resp);
      this.users = resp;
    });
  }

  getUsers() {
    return this.users;
  }

  getUser(mail): string {
    for (let user in this.users) {
      if (mail === this.users[user]?.mail) return user;
    }
    return "";
  }

  validateUser(mail, pwd): string {
    for (let user in this.users) {
      if (this.users[user].mail === mail && this.users[user].pwd === pwd) {
        return user;
      }
    }
    return "";
  }
}
