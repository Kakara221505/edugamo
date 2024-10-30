import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  value: string = ''
  phoneOtp: string = ''
  formStyle = true
  otpStyle = false
  error:any;
  otpForm!: FormGroup;
  forget = false
  verify = false
  user ={
    emailOrMobile:"",
    password:"",
  }
 
  authToken: any;
  submitted = false;
  errorMessageVerify: string;
  errorMessage: any;
  newPassword: any;
  token: any;
  showCopyIcon: boolean = false;
  @ViewChild('otpInput') otpInput: any;
  @ViewChild('phoneOtpInput') phoneOtpInput: any;
 
  constructor(private router: Router, private formbuilder: FormBuilder, private toastr: ToastrService, private route: ActivatedRoute, private _loginservice:AuthService) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // this.getProfile()
    this.otpForm = this.formbuilder.group({
      otp: ['', Validators.required],
      emailOtp: ['', Validators.required]
    });
    this.setFocusToOtpInput();
  }

  get o() {
    return this.otpForm.controls;
  }

  setFocusToOtpInput() {
    if (this.otpInput && this.otpInput.otpInputs.length > 0) {
      this.otpInput.otpInputs.first.nativeElement.focus();
    }
  }

  async getProfile() {
    try {
      const list: any = await this._loginservice.getUserProfile().toPromise();
      this.router.navigate(['/dashboard'] );
      // Do something with the data if needed
    } catch (error) {
      
      
    }
  }

  // login method

  onLoggedin(form: NgForm) {
    this.submitted = true; // Set submitted to true to trigger error message display
  
    if (form.invalid) {
      return;
    }
  
    this._loginservice.login(form.value.emailOrMobile, form.value.password).subscribe(
      (body: any) => {
        this.authToken = body.data.authToken;
        localStorage.setItem('user', JSON.stringify(this.authToken));
        this.formStyle = false;
        this.otpStyle = true; 
        this.setFocusToOtpInput()
      },
      (error) => {
        console.log("hii");
        if (error.status === 400) {
          console.log("hii1");
          // Show the toaster message with the error from the API
          this.toastr.error(error.error.error, 'Please Enter Correct UserName Password', {
            timeOut: 3000,
            progressBar: true,
            closeButton: true,
            easeTime: 300,
            extendedTimeOut: 1000,
          });
        }
      }
    );
  }
  




// otp method

onLoggedinOtp() {
  this.submitted = true;

  if (this.otpForm.invalid) {
    return;
  }

  this.login();
}
keyFuncOtp(x:any){
  this.errorMessageVerify = ''
  console.log(this.errorMessage)
}
keyFuncPhoneOtp(x:any){
  this.errorMessageVerify = ''
  console.log(this.errorMessage)
}
  login(){
   
    this._loginservice.verifyLoginOtp({ emailOtp: this.value,otp: this.phoneOtp,authToken: this.authToken}).subscribe(
      (res: any) => {
        // localStorage.setItem('user', JSON.stringify(this.authToken));
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        if (error) {
          console.log("hii1")
          // Show the toaster message with the error from the API
          this.toastr.error(error.error.error, 'Please Enter Correct Otp', {
            timeOut: 3000,
            progressBar: true,
            closeButton: true,
            easeTime: 300,
            extendedTimeOut: 1000,
          });
        } 

      }
    );
  }

  goToForget(){
    this.formStyle = false,
    this.forget = true;
  }
  // otp change 

  onOtpChange(val:any){
    this.value=val
    console.log("vk",this.value)
      }

      onPhoneOtpChange(val:any){
        this.phoneOtp=val
        console.log("vk",this.value)
          }
    passwordChange(val:any){
      this.newPassword = val
      console.log('mohit',this.newPassword)
    }

forgetpass(){
  let body = {
    emailOrMobile : this.user.emailOrMobile
  }
  this._loginservice.forgetPassword(body).subscribe((body: any) => {
      console.log(body.data.authToken)
      this.forget=false
      this.verify = true;
      localStorage.setItem('token',body.data.authToken);
      this.token = body.data.authToken
    },error =>{
      this.toastr.error(error.error.message,`Error`)
     });
}

OtpPassChange(){
  let body = {
    otp : this.phoneOtp,
    emailOtp : this.value,
    password :this.newPassword,
    authToken:this.token
  }
  this._loginservice.otpNewPass(body).subscribe((body: any) => {
      this.forget=false
      this.formStyle = true
      this.verify = false
      this.toastr.success('Your password has successfully changed',`Success`)
    },error =>{
      this.toastr.error(error.error.message,`Error`)
     });
}

}
