import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';
import {LoginComponent} from './login/login.component';
import {User} from './Model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public roles: string[];
  isLoggedIn = false;
  public showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  utilisateur:User;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
      this.utilisateur=new User(user.id,user.username,user.email,user.roles,user.accessToken);
    }
  }
  getRole() {
    if (this.showAdminBoard) {
      return 1;
    }
    if (this.showModeratorBoard) {
      return 2;
    }
    return 3;
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
