import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-host-meeting-info',
  templateUrl: './host-meeting-info.component.html',
  styleUrls: ['./host-meeting-info.component.scss']
})
export class HostMeetingInfoComponent implements OnInit {
  public meeting: any;

  constructor() {
    this.meeting = {
      address: 'רבי שמעון בר יוחאי 50, ירושלים',
      capacity: 30,
      audience: 'סטודנטים',
      invited: 'פתוח לקהל הרחב',
      brother: {
        name: 'נוי פרי',
        fallName: 'טל יפרח ז"ל',
        phone: '054-4763874',
        email: 'ariela.weiss@strauss-group.com'
      },
      usersCapacity: 2,
      users: [
        {
          name: 'אריאלה שיפנבאוור וייס',
          capacity: 2,
          phone: '054-476-3874',
          email: 'ariela.weiss@strauss-group.com'
        }
      ]
    };
  }

  ngOnInit() {}
}
