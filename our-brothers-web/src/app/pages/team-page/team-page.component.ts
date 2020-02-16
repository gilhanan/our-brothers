import { Component, OnInit } from '@angular/core';
import { TeamMember } from 'src/app/team-card/team-card.component';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

  members: TeamMember[] = members;

  constructor() { }

  ngOnInit() {
  }

}


const members = [{
  name: 'אליסף פרץ',
  title: 'ועד מנהל ומייסד העמותה',
  frontImage: '/assets/img/about/b-1-1.jpg',
  backImage: '/assets/img/about/b-1-2.jpg',
  frontGender: 'אחיהם של סגן ',
  frontBrother: 'אוריאל פרץ ז"ל',
  frontBrotherAnd: ' ושל רב סרן ',
  frontBrother2: 'אלירז פרץ ז"ל',
  frontBrotherLink: 'https://www.izkor.gov.il/%D7%90%D7%95%D7%A8%D7%99%D7%90%D7%9C%20%D7%A4%D7%A8%D7%A5/en_9311332ca81acef28a7b72d240cf7ac2',
  frontBrother2Link: 'https://www.izkor.gov.il/%D7%90%D7%9C%D7%99%D7%A8%D7%96%20%D7%A4%D7%A8%D7%A5/en_43424c15c8bf5ae87b6a533fea005de8',
},
{
  name: 'נוי פרי',
  title: 'ועד מנהל ומייסדת העמותה',
  frontImage: '/assets/img/about/b-2-1.jpg',
  backImage: '/assets/img/about/b-2-2.jpg',
  frontGender: 'אחות של סמ"ר  ',
  frontBrother: 'טל יפרח ז"ל',
  frontBrotherLink: 'https://www.izkor.gov.il/%D7%98%D7%9C-%D7%A0%D7%99%D7%A1%D7%99%D7%9D%20%D7%99%D7%A4%D7%A8%D7%97/en_47f74060b0ef5c817bfa358c6e8bbdea',
},
{
  name: 'מתן בר נוי',
  title: 'ועד מנהל ומייסד העמותה',
  frontImage: '/assets/img/about/b-3-1.jpg',
},
{
  name: 'רוני ארנהלט',
  title: 'מנהלת העמותה',
  frontImage: '/assets/img/about/b-4-1.jpg',
},
{
  name: 'אמיר קלנגל',
  title: 'חבר עמותה',
  frontImage: '/assets/img/about/b-5-1.jpg',
  backImage: '/assets/img/about/b-5-2.jpg',
  frontGender: 'אחיו של רס"ן ',
  frontBrother: 'יוחאי גוחא קלנגל ז"ל',
  frontBrotherLink: 'https://www.izkor.gov.il/%D7%99%D7%95%D7%97%D7%90%D7%99%20%D7%A7%D7%9C%D7%A0%D7%92%D7%9C/en_021e3002a0c61e9e30ddd68d00b41992',
},
{
  name: 'דניאל סלים',
  title: 'חברת עמותה',
  frontImage: '/assets/img/about/b-9-1.jpg',
  backImage: '/assets/img/about/b-9-2.jpg',
  frontGender: 'אחות של רס"ל ',
  frontBrother: 'עדי סלים ז"ל',
  frontBrotherLink: 'https://www.izkor.gov.il/%D7%A2%D7%93%D7%99%20%D7%A1%D7%9C%D7%99%D7%9D/en_fa9d9b6bf5a7a25bc5d49efd2e0eb4fd',
},
{
  name: 'נטע באלוה',
  title: 'חברת עמותה',
  frontImage: '/assets/img/about/b-10-1.jpg',
  backImage: '/assets/img/about/b-10-2.jpg',
  frontGender: 'אחות של סמ"ר ',
  frontBrother: 'נדב באלוה ז"ל',
  frontBrotherLink: 'https://www.izkor.gov.il/%D7%A0%D7%93%D7%91%20%D7%91%D7%90%D7%9C%D7%95%D7%94/en_d3d9d988f9a65e2878a7bb52b3eef2e2',
},
{
  name: 'אדוה הורביץ',
  title: 'חברת עמותה',
  frontImage: '/assets/img/about/b-11-1.jpg',
  backImage: '/assets/img/about/b-11-2.jpg',
  frontGender: 'אחות של סמ"ר ',
  frontBrother: 'אילון הורביץ ז"ל',
  frontBrotherLink: 'https://www.izkor.gov.il/%D7%90%D7%99%D7%9C%D7%95%D7%9F-%D7%99%D7%A2%D7%A7%D7%91%20%D7%94%D7%95%D7%A8%D7%91%D7%99%D7%A5/en_0c1f91343a46d60dad38900be1d49151',
},
{
  name: 'גילי מרמלשטיין',
  title: 'חברת עמותה',
  frontImage: '/assets/img/about/b-6-1.jpg',
  backImage: '/assets/img/about/b-6-2.jpg',
  frontGender: 'אחות של סרן ',
  frontBrother: 'הראל מרמלשטיין ז"ל',
  frontBrotherLink: 'https://www.izkor.gov.il/%D7%94%D7%A8%D7%90%D7%9C%20%D7%9E%D7%A8%D7%9E%D7%9C%D7%A9%D7%98%D7%99%D7%99%D7%9F/en_a82c4af6403d114af961ebad891dd927',
},
{
  name: 'עודד פרומוביץ',
  title: 'חבר עמותה',
  frontImage: '/assets/img/about/b-7-1.jpg',
  backImage: '/assets/img/about/b-7-2.jpg',
  frontGender: 'אחיו של סמל ',
  frontBrother: 'רז פרומוביץ ז"ל',
  frontBrotherLink: 'https://www.izkor.gov.il/%D7%A8%D7%96%20%D7%A4%D7%A8%D7%95%D7%9E%D7%95%D7%91%D7%99%D7%A5/en_2944f34e109efa1ce73b1a3e1e02fe00',
},
{
  name: 'ירין רובל',
  title: 'חבר עמותה',
  frontImage: '/assets/img/about/b-8-1.jpg',
  backImage: '/assets/img/about/b-8-2.jpg',
  frontGender: 'אחיו של סמ"ר  ',
  frontBrother: 'בניה רובל ז"ל',
  frontBrotherLink: 'https://www.izkor.gov.il/%D7%91%D7%A0%D7%99%D7%94-%D7%A0%D7%A4%D7%AA%D7%9C%D7%99%20%D7%A8%D7%95%D7%91%D7%9C/en_d161c395a28ef32b307c3af3c1e83113',
},
{
  name: 'ליאור אטיאס',
  title: 'חברת עמותה',
  frontImage: '/assets/img/about/b-12-1.jpg',
},
{
  name: 'טלי לזניק',
  title: 'חברת עמותה',
  frontImage: '/assets/img/about/b-13-1.jpg',
},
{
  name: 'גיל חנן',
  title: 'מנהל אתר',
  frontImage: '/assets/img/about/b-14-1.jpg',
},
{
  name: 'נופית חי',
  title: 'מעצבת אתר',
  frontImage: '/assets/img/about/b-15-1.jpg',
}];
