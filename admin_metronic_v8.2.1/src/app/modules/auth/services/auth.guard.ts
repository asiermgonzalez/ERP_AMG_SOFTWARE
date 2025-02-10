import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Si no hay usuario o token, se hace logout
    if (!this.authService.user || !this.authService.token) {
      this.authService.logout();
      return false;
    }

    let token = this.authService.token;

    // Si pegamos el token en https://jwt.io/ vemos que un token se divide en tres partes. De la segunda parte obtenemos el tiempo de expiración (exp) y lo decodificamos
    let expiration = JSON.parse(atob(token.split('.')[1])).exp;

    // Si la fecha actual es mayor o igual que la de expiración, se hace logout
    if (Math.floor(new Date().getTime() / 1000) >= expiration) {
      this.authService.logout();
      return false;
    }
    return true;
  }
}
