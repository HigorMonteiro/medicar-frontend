import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "frontend";
  constructor(private router: Router) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user == null) {
      this.router.navigate(["login"]);
    } else {
      if (user.token == "" || user.token == null) {
        this.router.navigate(["login"]);
      }
    }
  }
}