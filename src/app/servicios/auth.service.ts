import { Injectable } from '@angular/core';
import { Auth,authState,createUserWithEmailAndPassword,sendEmailVerification,sendPasswordResetEmail,signInWithEmailAndPassword,User,fetchSignInMethodsForEmail  } from '@angular/fire/auth';
import { signInWithRedirect } from '@firebase/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../servicios/firebase-error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private auth : Auth,
    private router : Router,
    private toastr: ToastrService,
    private firebaseError: FirebaseErrorService
  ) {}

  get userState() {
    return authState(this.auth);
  }

  /*async signUp(email: string, password: string): Promise<void> {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth,email,password);
      await this.sendEmailVerification(user);
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('ERROR:', error);

    }
  }*/

  async registarUsuario (email: string, password: string): Promise<void> {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth,email,password);
      await this.sendEmailVerification(user);
      this.toastr.success('Le enviamos un correo para verificar el correo.', 'Se registro el usuario con existo:');
      this.router.navigate(['/login']);
    } catch (error:any) {
      this.toastr.error(this.firebaseError.codeError(error.code.toString()), 'Error:');

    }
  }

  async signUp(email: string, password: string): Promise<void> {
    await fetchSignInMethodsForEmail(this.auth,email)
      .then(signInMethods => {
        if (signInMethods.length > 0) {
          this.toastr.error('El correo ya esta registrado.', 'Error:');
        } else {
          //no existe el correo por eso se manda a crear
          this.registarUsuario(email,password);
        }
      })
      .catch((error:any) => {
        this.toastr.error(this.firebaseError.codeError(error.code.toString()), 'Error:');
      });
  }

  async verificarIngreso(email: string, password: string): Promise<void> {
    await fetchSignInMethodsForEmail(this.auth,email)
      .then(signInMethods => {
        if (signInMethods.length > 0) {
          this.signIn(email,password);
        } else {
          //no existe el correo por eso se manda a crear
          this.toastr.error('El correo no esta registrado.', 'Error:');
        }
      })
      .catch((error:any) => {
        this.toastr.error(this.firebaseError.codeError(error.code.toString()), 'Error:');
      });
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      const { user } = await signInWithEmailAndPassword(this.auth,email,password);
      this.checkUserIsVerified(user);
    } catch (error:any) {
      this.toastr.error(this.firebaseError.codeError(error.code.toString()), 'Error:');
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login']);
    } catch (error:any) {
      this.toastr.error(this.firebaseError.codeError(error.code.toString()), 'Error:');
    }
  }

  async sendEmailVerification(user: User): Promise<void> {
    try {
      await sendEmailVerification(user);
      this.router.navigate(['/login']);
    } catch (error:any) {
      this.toastr.error(this.firebaseError.codeError(error.code.toString()), 'Error:');

    }
  }

  async verificarRecuperarContrasena(email: string): Promise<void> {
    await fetchSignInMethodsForEmail(this.auth,email)
      .then(signInMethods => {
        if (signInMethods.length > 0) {
          this.sendPasswordResetEmail(email);
        } else {
          //no existe el correo por eso se manda a crear
          this.toastr.error('El correo no esta registrado.', 'Error:');
        }
      })
      .catch((error:any) => {
        this.toastr.error(this.firebaseError.codeError(error.code.toString()), 'Error:');
      });
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      this.toastr.success('Le enviamos un correo para cambiar la contraseña.', 'Cambio de contraseña:');
      this.router.navigate(['/login']);
    } catch (error:any) {
      this.toastr.error(this.firebaseError.codeError(error.code.toString()), 'Error:');

    }
  }

  private checkUserIsVerified(user: User): void {
    const route = user.emailVerified ? '/home' : '/verificar-email';
    if(route == '/home'){
      this.toastr.success('Bienvenid@ ' + user.email, 'Ingreso exitoso:');
    } else if(route == '/verificar-email'){
      this.toastr.info('El día que se registro le enviamos un correo para verificar el correo.', 'Verificar el correo:');
    } else {
      this.router.navigate(['/login']);
    }
    this.router.navigate([route]);
  }
}
