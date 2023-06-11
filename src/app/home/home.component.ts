import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicios/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.userState;
    console.log(this.auth.userState);
  }
  
  /*onLogOut(){
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }*/

  onLogOut(){
    this.auth.signOut();
  }

}
