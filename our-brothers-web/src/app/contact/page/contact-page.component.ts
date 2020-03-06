import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { User, Contact } from 'models';
import { AuthService } from '../../shared/services/auth.service';
import { DataService } from '../../shared/services/data.service';
import { ContactForm } from '../../shared/components/contact-form/contact-form.component';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {
  public user: User;
  public postingContact = false;

  constructor(private authService: AuthService, private dataService: DataService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  onContactSubmit(form: ContactForm) {
    const parsedContact: Contact = {
      ...form,
      date: Date.now()
    };

    this.postingContact = true;
    this.dataService
      .postContact(parsedContact, this.user)
      .then(() => this.toastr.success('שליחת הודעה בוצעה בהצלחה'))
      .catch(() => this.toastr.error('שליחת הודעה נכשלה'))
      .finally(() => (this.postingContact = false));
  }
}
