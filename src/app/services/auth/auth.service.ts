import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  forgetPassToken: string;
  
 

  constructor(private http: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('user') || '{}');
    this.forgetPassToken = localStorage.getItem('token')
   }

  options = { withCredentials: true };

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.post( environment.baseUrl+`login`, {"emailOrMobile": email,"password": password},{ headers: headers });
  }

  getUserProfile(){
 
    return this.http.get(
      environment.baseUrl+`getProfile`,
      { withCredentials: true }
    );
  }

  

  getUserlogout(){
 
    return this.http.post(
      environment.baseUrl+`logout`,null,
      { withCredentials: true }
   
    );
  }


  verifyLoginOtp(loginDetails: any){
   
    return this.http.post(
      environment.baseUrl+`verifyOtp`,
      loginDetails,
      { withCredentials: true }
    );
  }

  forgetPassword(forgetpass: any){
    const httpOptionsPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-custom-token': this.token,
      }),
    };

    return this.http.post(
      environment.baseUrl + 'forgotPassword',
      forgetpass,
      httpOptionsPost
    );
  }
  otpNewPass(changePass:any){
    const httpOptionsPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-custom-token': this.forgetPassToken,
      }),
    };

    return this.http.post(
      environment.baseUrl + 'verifyOtpToChangePassword',
      changePass,
      httpOptionsPost
    );
  }


}
