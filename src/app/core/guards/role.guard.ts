

import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  loginService.saveUserData();

  const expectedRole = route.data['role'];
  const userRole = loginService.getUserRole();

  if (loginService.isLoggedIn() && userRole === expectedRole) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

