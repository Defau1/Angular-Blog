import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../../shared/services/auth.service";

@Injectable()                                                     // Injectable - тк гарды - обычный сервис
export class AuthGuard implements CanActivate{
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, // @ts-ignore
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> |boolean {

    if (this.auth.isAuthenticated()) {
      return true
    } else {
      this.auth.logout()
      this.router.navigate(['/admin', 'login'], {
        queryParams: {
          loginAgain: true
        }
      })
      // alert('Войдите в аккаунт!')
    }
  }

}
