import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Quote, QuotesService } from './quotes.service';

@Component({
  selector: 'app-agenda-page',
  templateUrl: './agenda-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./agenda-page.component.scss']
})
export class AgendaPageComponent implements OnInit {
  pagedExcerpts: { page: Quote[] }[];

  constructor(private quotesService: QuotesService) {}

  ngOnInit() {
    this.pagedExcerpts = this.quotesService.pagedQuotes;
  }
}
