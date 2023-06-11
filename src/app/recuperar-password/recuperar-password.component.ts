import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../servicios/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../servicios/firebase-error.service';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {
  recuperarUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private firebaseError: FirebaseErrorService,
    private auth: AuthService
  ) { 
    this.recuperarUsuario = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]})
    });
  }

  /*recuperar(){
    this.loading = true;
    this.userService.recuperarContrasena(this.recuperarUsuario.value)
      .then(response => {
        this.loading = false;
        this.toastr.info('El enviamos un correo para restablecer su contraseña!', 'Recuperar contraseña:');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.loading = false;
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error:');
      });
  }*/

  recuperar(){
    //this.auth.sendPasswordResetEmail(this.recuperarUsuario.value.email);
    this.auth.verificarRecuperarContrasena(this.recuperarUsuario.value.email);
  }
}
