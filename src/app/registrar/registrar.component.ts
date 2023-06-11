import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../servicios/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../servicios/firebase-error.service';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  formulario: FormGroup;
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private firebaseError: FirebaseErrorService,
    private auth: AuthService
  ) { 
    this.formulario = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
      repetirPassword: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]})
    });
  }

  /*onSubmit(){
    
    if(this.formulario.value.password !== this.formulario.value.repetirPassword){
      this.toastr.error('Los campos de contraseñas deben ser iguales.', 'Error:');
      return;
    }

    this.loading = true;
    this.userService.register(this.formulario.value)
      .then((response) => {
        this.loading = false;
        this.toastr.success('El usuario fue registrado con exito!', 'Usuario registrado:');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.loading = false;
        console.log(error);
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error:');
      });
  }*/

  
  onSubmit(){

    if(this.formulario.value.password !== this.formulario.value.repetirPassword){
      this.toastr.error('Los campos de contraseñas deben ser iguales.', 'Error:');
      return;
    }

    //this.loading = true;
    this.auth.signUp(this.formulario.value.email,this.formulario.value.password);
  }  

}
