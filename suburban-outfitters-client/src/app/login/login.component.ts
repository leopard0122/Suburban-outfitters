import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  loginFormGroup: FormGroup;
  constructor(private cookieService: CookieService, private _formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    // cookieService.set('laravel_session', 'value')
    // console.log('laravel_session', cookieService.getAll())

  }

  ngOnInit(): void {
    this.loginFormGroup = this._formBuilder.group({
      email: ['jspenc72@gmail.com', Validators.required],
      password: ['password', Validators.required]
    });    
  }
  clickedSignUp(): void {
    console.log("clickedSignUp!");
    this.router.navigateByUrl('/register');
  }
  
  clickedLogin(): void {
    console.log("clickedLogin!");
    console.log(this.loginFormGroup.value);
    this.authService.sendLoginRequest(this.loginFormGroup.value).subscribe((data: any) => {
      console.log("data", data);
      if(data.status=='success'){
        this.authService.getUserProfile().subscribe((data: any) => {
          this.router.navigateByUrl('/home');
        })
      }else{
        console.log("not authenticated.");
        window.alert("The username or password did not match.");
      }
    })   
  }

}
