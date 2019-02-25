import { Component, OnInit, ElementRef, AfterContentInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {
  title = 'DatingApp';
  jwtHelper = new JwtHelperService();

  constructor(private elementRef: ElementRef, private authService: AuthService) {

  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
       this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  ngAfterContentInit() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
      this.changeThemeMode();
    }
  }

  changeThemeMode() {
    const linkTag = this.elementRef.nativeElement.querySelector('#stylesheet');
    if (linkTag) {
      linkTag.id = '';
      linkTag.disabled = true;
    }

    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user && user.theme != null) {
      const routerOutlet = this.elementRef.nativeElement.querySelector('router-outlet');
      // tslint:disable-next-line:max-line-length
      routerOutlet.insertAdjacentHTML('beforeend', `<link id="stylesheet" rel="stylesheet" type="text/css" href="./assets/stylesheets/${user.theme}/bootstrap.min.css">`);
    }
  }
}
