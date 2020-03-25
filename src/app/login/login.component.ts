import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "../user.service";
import { RouterModule, Routes, Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  formCredentials: any;
  retorno: any;
  msgFormError: any;

  constructor(private userService: UserService, private router: Router) {
    this.formCredentials = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
    this.msgFormError = "";
  }

  logar() {
    this.msgFormError = "";

    const objJSON = {
      email: this.formCredentials.value.email,
      password: this.formCredentials.value.password
    };

    this.userService.LoginRequest(objJSON).subscribe(data => {
      this.retorno = data;
      if (this.retorno.status == 200) {
        var user = JSON.stringify({
          email: this.retorno.email,
          name: this.retorno.name,
          token: this.retorno.token
        });
        localStorage.setItem("user", user);
        this.router.navigate(["consultations"]);
      } else {
        this.msgFormError = this.retorno.msg;
      }
    });
  }

  hide = true;

  ngOnInit(): void {}
}
