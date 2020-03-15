import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "../data-service/data.service";

@Injectable({
  providedIn: "root"
})
export class CanActivateHome implements CanActivate {
  constructor(private permissions: DataService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.permissions.isLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
    }
    return false;
  }
}
