import { Component, OnInit } from '@angular/core';
import {
  TextsFromSiblingsService,
  Quote
} from 'src/app/services/texts-from-siblings.service';

@Component({
  selector: 'app-agenda-page',
  templateUrl: './agenda-page.component.html',
  styleUrls: ['./agenda-page.component.scss']
})
export class AgendaPageComponent implements OnInit {
  pagedExcerpts: { page: Quote[] }[];

  constructor(private quotesService: TextsFromSiblingsService) {}

  ngOnInit() {
    this.pagedExcerpts = this.quotesService.getFormattetQuotesForAgendaPage();
  }
}
