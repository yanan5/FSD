import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { RouterService } from './../services/router.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitMessage;
  username;
  password;
  constructor(
    private _authService: AuthenticationService,
    private _routerService: RouterService
  ) { }

  ngOnInit() {
  }

  loginSubmit(form) {
    const data = {
      'username' : form.value.username,
      'password' : form.value.password
    };

    this._authService.authenticateUser(data)
      .subscribe(
        res => {
          this._authService.setBearerToken(res['token']);
          this._routerService.routeToDashboard();
        },
        err => {
          console.error(err);
          this.submitMessage = err.error.message;
        }
      );
  }
}
