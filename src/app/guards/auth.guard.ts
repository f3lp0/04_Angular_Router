import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// Hace transformaciones
import { map } from 'rxjs/operators';

// services
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // true permite acceso, false impide el acceso
    const token = this.tokenService.getToken();
    
    // if (!token) {
    //   this.router.navigate(['/home']);
    //   return false;
    // }
    // return true;
    
    //return token ? true : false;
    // return true;
    // return false;

    return this.authService.user$
    .pipe(
      map(user => {
        if (token) {
          return true
        } else if (!user){
          this.router.navigate(['/home']);
          return false;
        }
        return true
      })
    )
  }
  
}
