import { Component, OnInit, ViewChildren, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  photoUrl: string;
  // tslint:disable-next-line:max-line-length
  themes = ['default', 'cerulean', 'cosmo', 'journal', 'litera', 'lumen', 'materia', 'minty', 'pulse', 'sandstone', 'simplex', 'sketchy', 'spacelab', 'united', 'yeti'];

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.touched) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken['nameid'], this.user).subscribe(next => {
      this.alertify.success('Profile update successfully!');
      const currentUser = JSON.parse(localStorage.getItem('user'));
      currentUser.theme = this.user.theme;
      localStorage.setItem('user', JSON.stringify(currentUser));
      this.editForm.reset(this.user);
      this.themeService.invokeThemeChange();
    }, error => {
      this.alertify.error(error);
    });
  }

  updateMainPhoto(photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }
}
