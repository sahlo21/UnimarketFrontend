import { Component } from '@angular/core';
import {PasswordDTO} from "../../modelo/password-dto";

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent {
  restorePassword:PasswordDTO;
  constructor() {
    this.restorePassword = new PasswordDTO();
  }
  public restorePasswordFunction(){
    console.log(this.restorePassword);
  }
  public passwordEquals():boolean{
    return this.restorePassword.password == this.restorePassword.confirmedPassword;
  }

}
