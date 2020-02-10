import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public contactForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      message: ['']
    });

    // Set video unmute when page init
    var vid: any = document.getElementById("vid");
    vid.muted = true;
  }

  get firstName() {
    return this.contactForm.get('firstName');
  }
  get lastName() {
    return this.contactForm.get('lastName');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get message() {
    return this.contactForm.get('message');
  }

  muteUnmute() {
    var vid: any = document.getElementById("vid");
    var mutebtn: any = document.getElementById("mute-btn");

    if (vid.muted) {
      vid.muted = false;
      mutebtn.innerHTML = "<i class='fas fa-volume-up'></i>";
    } else {
      vid.muted = true;
      mutebtn.innerHTML = "<i class='fas fa-volume-mute'></i>";
    }
  }
}
