import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  baseUrl = 'http://localhost:8070/api/v1/admin';
  constructor(private router: Router,private api:AuthService) {}
  
  async getProfile() {
    try {
      const list: any = await this.api.getUserProfile().toPromise();
      return true
      // Do something with the data if needed
    } catch (error) {
      this.router.navigate(['/auth/login'] );
      return false;
      
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
       return this.getProfile()
      
  

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}