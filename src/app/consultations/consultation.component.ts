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

  getSpecialties() {
    this.userService.getSpecialties().subscribe(data => {
      this.specialties = data;
    });
  }

  getDoctors() {
    this.userService.getDoctors().subscribe(data => {
      this.doctors = data;
      this.selectedDoctors = [];
      for (var i = 0; i < this.doctors.length; i++) {
        if (
          this.doctors[i].specialty.id ==
          this.formSchedule.value.specialty
        ) {
          this.selectedDoctors.push(this.doctors[i]);
        }
      }
    });
  }

  getDate() {
    this.userService.getSchedules().subscribe(data => {
      this.schedule = data;
      this.FreeDays = [];
      this.FreeHours = [];
      for (var i = 0; i < this.schedule.length; i++) {
        if (this.schedule[i].doctor.id == this.formSchedule.value.doctor) {
          this.FreeDays.push(this.schedule[i].day);
        }
      }
      this.FreeDays = this.FreeDays.reverse();
    });
  }

  getHours() {
    this.userService.getSchedules().subscribe(data => {
      this.schedule = data;
      this.FreeHours = [];
      for (var i = 0; i < this.schedule.length; i++) {
        console.log(this.schedule[i].day);
        if (
          this.schedule[i].day == this.formSchedule.value.day &&
          this.schedule[i].doctor.id == this.formSchedule.value.doctor
        ) {
          console.log("aqui");
          for (var j = 0; j < this.schedule[i].hour.length; j++) {
            this.FreeHours.push(this.schedule[i].hour[j]);
          }
        }
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  ngOnInit(): void {
    this.getConsultations();
    this.getSpecialties();
  }
  preConsultation() {
    this.selectedHour = this.formSchedule.value.hour;
    console.log(this.selectedHour.substring(0, 5));
    this.selectedHour = this.selectedHour.substring(0, 5);

    this.userService.getSchedules().subscribe(data => {
      this.schedule = data;
      for (var i = 0; i < this.schedule.length; i++) {
        for (var j = 0; j < this.schedule[i].hour.length; i++) {
          console.log(this.formSchedule.value.hour)
          if (
            this.schedule[i].hour[j] == this.formSchedule.value.hour &&
            this.schedule[i].doctor.id == this.formSchedule.value.doctor
          ) {
            this.makeConsultation(this.schedule[i].id, this.selectedHour);
          }
        }
      }
    });
  }
  makeConsultation(scheduleID, selectHour) {
    const objJSON = {
      schedule_id: scheduleID,
      hour: selectHour
    };

    this.userService.makeConsultation(objJSON).subscribe(data => {
      console.log(data);
      this.retorno = data;
      try {
        console.log("sucesso");
        this.getConsultations();
        this.msgFormSuccess = true;
        this.formSchedule = new FormGroup({
          specialty: new FormControl(""),
          doctor: new FormControl(""),
          day: new FormControl(""),
          hour: new FormControl("")
        });
      } catch (err) {
        this.msgFormError = true;
      }
    });
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