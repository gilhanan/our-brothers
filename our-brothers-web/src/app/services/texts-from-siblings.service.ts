import { Injectable } from '@angular/core';
import { quotes } from './sibling-texts.js';

@Injectable({
  providedIn: 'root'
})
export class TextsFromSiblingsService {
  private textsForAgendaPage: Quote[];
  private pagedTextsForAgendaPage: { page: Quote[] }[] = [];

  constructor() {
    this.textsForAgendaPage = quotes;
    for (let i = 0; i < this.textsForAgendaPage.length - 6; i += 6) {
      this.pagedTextsForAgendaPage.push({
        page: this.textsForAgendaPage.slice(i, i + 6)
      });
    }
  }

  getTextFromSiblingURIbyId(id: number): string {
    return `/assets/texts/${id}.pdf`;
  }

  getFormattetQuotesForAgendaPage(): { page: Quote[] }[] {
    return this.pagedTextsForAgendaPage;
  }
}

export class Quote {
  excerpt: string;
  writerName: string;
  recipientName: string;
  writerId: string;
  recipientId: string;
}
