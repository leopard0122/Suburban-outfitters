import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  username: string;
  password: string;
  confirm_password: string;
  email: string;
  registerFormGroup: FormGroup;

  constructor(private cookieService: CookieService, private _formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    // cookieService.set('laravel_session', 'value')
    // console.log('laravel_session', cookieService.getAll())

  }
  ngOnInit(): void {
    this.registerFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      c_password: ['', Validators.required]
    });    
  }
  clickedSignUp(): void {
    console.log("clickedSignUp!");
    console.log(this.registerFormGroup.value);
    this.registerFormGroup.value.name = this.registerFormGroup.value.firstName+' '+this.registerFormGroup.value.lastName;
    this.registerFormGroup.value.username = this.registerFormGroup.value.email
    this.authService.sendRegisterRequest(this.registerFormGroup.value).subscribe((data: any) => {
      console.log("data", data);
      if(data.status=='success'){
        this.authService.getUserProfile().subscribe((data: any) => {
          this.router.navigateByUrl('/home');
        })
      }else{
        console.log("not authenticated.");
        window.alert("The passwords entered do not match.");
      }
    }, err => console.log(err),)
  }
  
  clickedLogin(): void {
    console.log("clickedLogin!");
    this.router.navigateByUrl('/login');
  }


}
