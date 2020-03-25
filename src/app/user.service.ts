import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private BASE_URL = "http://localhost:8000/api/";

  headers: any;
  headersToken: any;
  user: any;

  constructor(private httpClient: HttpClient) {
    this.user = {
      token: ""
    };

    var userTemp = JSON.parse(localStorage.getItem("user"));
    if (userTemp != null && userTemp != "") {
      this.user = userTemp;
      this.headersToken = new HttpHeaders().set(
        "Authorization",
        "token " + this.user.token
      );
    }

    this.headers = new HttpHeaders().set("Content-Type", "application/json");
  }

  actionToken() {
    var userTemp = JSON.parse(localStorage.getItem("user"));
    if (userTemp != null && userTemp != "") {
      this.user = userTemp;
      this.headersToken = new HttpHeaders().set(
        "Authorization",
        "token " + this.user.token
      );
    }
  }

  public LoginRequest(objJSON) {
    console.log(objJSON);
    return this.httpClient.post(
      this.BASE_URL + "auth/login/",
      objJSON,
      this.headers
    );
  }

  public RegisterRequest(objJSON): Observable<any> {
    console.log(objJSON);

    return this.httpClient.post(
      this.BASE_URL + "auth/register/",
      objJSON,
      this.headers
    );
  }
  public getConsultations(): Observable<any> {
    this.actionToken();
    return this.httpClient.get(this.BASE_URL + "consultations/", {
      headers: this.headersToken
    });
  }

  public deselectConsultation(id): Observable<any> {
    this.actionToken();
    return this.httpClient.delete(this.BASE_URL + "consultation/" + id, {
      headers: this.headersToken
    });
  }

}
