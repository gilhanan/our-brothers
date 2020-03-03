import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TeamMember } from 'src/app/team-card/team-card.component';

@Component({
  selector: 'app-team-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent {
  members: TeamMember[] = members;
}

const members: TeamMember[] = [
  {
    name: 'אליסף פרץ',
    title: 'ועד מנהל ומייסד העמותה',
    frontImage: '/assets/img/about/b-1-1.jpg',
    backImage: '/assets/img/about/b-1-2.jpg',
    email: 'elyasaf@ourbrothers.org',
    slains: [
      {
        pre: 'אחיהם של סמ"ר',
        title: 'אוריאל פרץ ז"ל',
        link:
          'https://www.izkor.gov.il/%D7%90%D7%95%D7%A8%D7%99%D7%90%D7%9C%20%D7%A4%D7%A8%D7%A5/en_9311332ca81acef28a7b72d240cf7ac2'
      },
      {
        pre: 'ושל רס"ן',
        title: 'אלירז פרץ ז"ל',
        link:
          'https://www.izkor.gov.il/%D7%90%D7%9C%D7%99%D7%A8%D7%96%20%D7%A4%D7%A8%D7%A5/en_43424c15c8bf5ae87b6a533fea005de8'
      }
    ]
  },
  {
    name: 'נוי פרי',
    title: 'ועד מנהל ומייסדת העמותה',
    frontImage: '/assets/img/about/b-2-1.jpg',
    backImage: '/assets/img/about/b-2-2.jpg',
    email: 'noy@ourbrothers.org',
    slains: [
      {
        pre: 'אחות של סמ"ר',
        title: 'טל יפרח ז"ל',
        link:
          'https://www.izkor.gov.il/%D7%98%D7%9C-%D7%A0%D7%99%D7%A1%D7%99%D7%9D%20%D7%99%D7%A4%D7%A8%D7%97/en_47f74060b0ef5c817bfa358c6e8bbdea'
      }
    ]
  },
  {
    name: 'מתן בר נוי',
    title: 'ועד מנהל ומייסד העמותה',
    frontImage: '/assets/img/about/b-3-1.jpg'
  },
  {
    name: 'רוני ארנהלט',
    title: 'מנהלת העמותה',
    frontImage: '/assets/img/about/b-4-1.jpg',
    email: 'roni@ourbrothers.org'
  },
  {
    name: 'אמיר קלנגל',
    title: 'חבר עמותה ומייסד',
    frontImage: '/assets/img/about/b-5-1.jpg',
    backImage: '/assets/img/about/b-5-2.jpg',
    slains: [
      {
        pre: 'אחיו של רס"ן',
        title: 'יוחאי גוחא קלנגל ז"ל',
        link:
          'https://www.izkor.gov.il/%D7%99%D7%95%D7%97%D7%90%D7%99%20%D7%A7%D7%9C%D7%A0%D7%92%D7%9C/en_021e3002a0c61e9e30ddd68d00b41992'
      }
    ]
  },
  {
    name: 'דניאל סלים',
    title: 'חברת עמותה',
    frontImage: '/assets/img/about/b-9-1.jpg',
    backImage: '/assets/img/about/b-9-2.jpg',
    slains: [
      {
        pre: 'אחות של רס"ל',
        title: 'עדי סלים ז"ל',
        link:
          'https://www.izkor.gov.il/%D7%A2%D7%93%D7%99%20%D7%A1%D7%9C%D7%99%D7%9D/en_fa9d9b6bf5a7a25bc5d49efd2e0eb4fd'
      }
    ]
  },
  {
    name: 'נטע באלוה',
    title: 'חברת עמותה',
    frontImage: '/assets/img/about/b-10-1.jpg',
    backImage: '/assets/img/about/b-10-2.jpg',
    slains: [
      {
        pre: 'אחות של סמ"ר',
        title: 'נדב באלוה ז"ל',
        link:
          'https://www.izkor.gov.il/%D7%A0%D7%93%D7%91%20%D7%91%D7%90%D7%9C%D7%95%D7%94/en_d3d9d988f9a65e2878a7bb52b3eef2e2'
      }
    ]
  },
  {
    name: 'אדוה הורביץ',
    title: 'חברת עמותה',
    frontImage: '/assets/img/about/b-11-1.jpg',
    backImage: '/assets/img/about/b-11-2.jpg',
    slains: [
      {
        pre: 'אחות של סמ"ר',
        title: 'אילון הורביץ ז"ל',
        link:
          'https://www.izkor.gov.il/%D7%90%D7%99%D7%9C%D7%95%D7%9F-%D7%99%D7%A2%D7%A7%D7%91%20%D7%94%D7%95%D7%A8%D7%91%D7%99%D7%A5/en_0c1f91343a46d60dad38900be1d49151'
      }
    ]
  },
  // {
  //   name: 'גילי מרמלשטיין',
  //   title: 'חברת עמותה',
  //   frontImage: '/assets/img/about/b-6-1.jpg',
  //   backImage: '/assets/img/about/b-6-2.jpg',
  //   slains: [{
  //     pre: 'אחות של סרן',
  //     title: 'הראל מרמלשטיין ז"ל',
  //     link: 'https://www.izkor.gov.il/%D7%94%D7%A8%D7%90%D7%9C%20%D7%9E%D7%A8%D7%9E%D7%9C%D7%A9%D7%98%D7%99%D7%99%D7%9F/en_a82c4af6403d114af961ebad891dd927',
  //   }]
  // },
  // {
  //   name: 'עודד פרומוביץ',
  //   title: 'חבר עמותה',
  //   frontImage: '/assets/img/about/b-7-1.jpg',
  //   backImage: '/assets/img/about/b-7-2.jpg',
  //   slains: [{
  //     pre: 'אחיו של סמל',
  //     title: 'רז פרומוביץ ז"ל',
  //     link: 'https://www.izkor.gov.il/%D7%A8%D7%96%20%D7%A4%D7%A8%D7%95%D7%9E%D7%95%D7%91%D7%99%D7%A5/en_2944f34e109efa1ce73b1a3e1e02fe00',
  //   }]
  // },
  // {
  //   name: 'ירין רובל',
  //   title: 'חבר עמותה',
  //   frontImage: '/assets/img/about/b-8-1.jpg',
  //   backImage: '/assets/img/about/b-8-2.jpg',
  //   slains: [{
  //     pre: 'אחיו של סמ"ר ',
  //     title: 'בניה רובל ז"ל',
  //     link: 'https://www.izkor.gov.il/%D7%91%D7%A0%D7%99%D7%94-%D7%A0%D7%A4%D7%AA%D7%9C%D7%99%20%D7%A8%D7%95%D7%91%D7%9C/en_d161c395a28ef32b307c3af3c1e83113',
  //   }]
  // },
  {
    name: 'טל שרייבמן פולק',
    title: 'חברת עמותה ומייסדת',
    frontImage: '/assets/img/about/b-16-1.jpg',
    backImage: '/assets/img/about/b-16-2.jpg',
    slains: [
      {
        pre: 'אחות של סגן ',
        title: 'ניר שריימן ז"ל',
        link:
          'https://www.izkor.gov.il/%D7%A0%D7%99%D7%A8-%D7%9E%D7%A8%D7%93%D7%9B%D7%99%20%D7%A9%D7%A8%D7%99%D7%99%D7%91%D7%9E%D7%9F/en_ac806f2538c5ff4b7f8e084e1d4f7b6f'
      }
    ]
  },
  {
    name: 'ליאור אטיאס',
    title: 'חברת עמותה',
    frontImage: '/assets/img/about/b-12-1.jpg'
  },
  {
    name: 'טלי לזניק',
    title: 'חברת עמותה ומייסדת',
    frontImage: '/assets/img/about/b-13-1.jpg'
  },
  {
    name: 'נופית חי',
    title: 'מעצבת אתר',
    frontImage: '/assets/img/about/b-15-1.jpg'
  },
  {
    name: 'גיל חנן',
    title: 'מנהל אתר',
    frontImage: '/assets/img/about/b-14-1.jpg'
  }
];
