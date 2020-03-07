import { Injectable } from '@angular/core';
import { quotes } from './quotes-data';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private quotes: Quote[];
  public pagedQuotes: { page: Quote[] }[] = [];

  constructor() {
    this.quotes = quotes;

    for (let i = 0; i < this.quotes.length - 6; i += 6) {
      this.pagedQuotes.push({
        page: this.quotes.slice(i, i + 6)
      });
    }
  }

  getTextFromSiblingURIbyId(id: number): string {
    return `/assets/texts/${id}.pdf`;
  }
}

export class Quote {
  excerpt: string;
  writerName: string;
  recipientName: string;
  writerId: string;
  recipientId: string;
}
