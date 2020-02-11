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
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      subject: ['', Validators.required],
      message: ['']
    });

    // Set video unmute when page init
    var vid: any = document.getElementById("vid");
    vid.muted = true;
  }

  get fullName() {
    return this.contactForm.get('fullName');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get subject() {
    return this.contactForm.get('subject');
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
