import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../servicios/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../servicios/firebase-error.service';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formularioLogin: FormGroup;
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private firebaseError: FirebaseErrorService,
    private auth: AuthService
  ) { 
    this.formularioLogin = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    });
  }

  /*onSubmit(){
    this.loading = true;
    this.userService.login(this.formularioLogin.value)
      .then(response => {
        console.log(response.user.emailVerified);
        if(response.user.emailVerified){
          console.log(response.user);
          this.router.navigate(['/home']);
          
          
          
        } else {
          console.log(response.user);
          this.router.navigate(['/verificar-email']);
          
        }
      })
      .catch(error => {
        this.loading = false;
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error:');
      });
      
  }*/

  onSubmit(){
    //this.auth.signIn(this.formularioLogin.value.email,this.formularioLogin.value.password);
    this.auth.verificarIngreso(this.formularioLogin.value.email,this.formularioLogin.value.password);
  }
}
