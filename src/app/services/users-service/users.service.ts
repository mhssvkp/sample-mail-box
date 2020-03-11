import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
      console.log(resp);
      this.users = resp;
    });
  }

  getUsers() {
    return this.users;
  }

  validateUser(userName, pwd): boolean {
    if (this.users.hasOwnProperty(userName)) {
      return this.users[userName].pwd == pwd;
    } else false;
  }
}
