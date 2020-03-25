import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-consultation",
  templateUrl: "./consultation.component.html",
  styleUrls: ["./consultation.component.scss"]
})
export class ConsultationComponent implements OnInit {
  userName: any;
  formSchedule: any;

  retorno: any;

  schedule: any[];
  consultations: any[];
  specialties: any[];
  doctors: any[];
  selectedDoctors: any[];
  FreeDays: any[];
  hour: any[];
  FreeHours: any[];
  hours_schedule: any[];
  selectedHour: any;
  msgFormError: any;
  msgFormSuccess: any;
  msgFormDeleteSuccess: any;
  constructor(private router: Router, private userService: UserService) {
    this.formSchedule = new FormGroup({
      specialty: new FormControl(""),
      doctor: new FormControl(""),
      day: new FormControl(""),
      hour: new FormControl("")
    });
    this.hours_schedule = [];
    this.consultations = [];
    this.selectedDoctors = [];
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    if (user == null) {
      this.router.navigate(["login"]);
    } else {
      if (user.token == "" || user.token == null) {
        this.router.navigate(["login"]);
      } else {
        this.userName = user.name;
      }
    }
  }

  getConsultations() {
    this.userService.getConsultations().subscribe(data => {
      this.consultations = data;
      console.log(this.consultations);
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  ngOnInit(): void {
    this.getConsultations();
  }
  
  deselectConsultation(consultationID) {
    this.userService.deselectConsultation(consultationID).subscribe(data => {
      try {
        console.log("sucesso");
        this.getConsultations();
        this.msgFormDeleteSuccess = true;
      } catch (err) {
        console.log("erro");
      }
    });
  }
}