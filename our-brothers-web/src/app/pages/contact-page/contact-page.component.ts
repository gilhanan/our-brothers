import { Component } from '@angular/core';
import { User } from 'models';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ContactForm } from 'src/app/contact-form/contact-form.component';
import { Contact } from 'models';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {
  public user: User;
  public postingContact = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user;
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
