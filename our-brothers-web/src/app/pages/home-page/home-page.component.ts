import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { User, Contact } from 'src/app/model';
import { ContactForm } from 'src/app/contact-form/contact-form.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public videoMuted = true;
  public user: User;
  public loadingUser = true;
  public postingContact = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user;
      this.loadingUser = false;
    });
  }

  onContactSubmit(form: ContactForm) {
    const parsedContact: Contact = {
      ...form,
      date: Date.now()
    }

    this.postingContact = true;
    this.dataService.postContact(parsedContact, this.user)
      .then(() => window.alert('שליחת הודעה בוצעה בהצלחה'))
      .catch(() => window.alert('שליחת הודעה נכשלה'))
      .finally(() => this.postingContact = false);
  }
}
