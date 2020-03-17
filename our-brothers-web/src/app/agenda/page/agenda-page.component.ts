import { Component, OnInit, ChangeDetectionStrategy, ElementRef, AfterViewInit } from '@angular/core';
import { Quote, QuotesService } from './quotes.service';
import { timeInterval } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-agenda-page',
  templateUrl: './agenda-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./agenda-page.component.scss']
})
export class AgendaPageComponent implements OnInit, AfterViewInit {
  pagedExcerpts: { page: Quote[] }[];
  public slideIndex: number;

  constructor(private quotesService: QuotesService, private elementRef: ElementRef) {
    this.slideIndex = 1;
  }

  ngOnInit() {
    this.pagedExcerpts = this.quotesService.pagedQuotes;

    const seconds = interval(10000);
    seconds.pipe(timeInterval()).subscribe(
      () => {
        this.plusSlides(1);
      },
      err => console.log(err)
    );
  }

  ngAfterViewInit(): void {
    this.showSlides(1);
  }

  public plusSlides(n: number) {
    this.showSlides((this.slideIndex += n));
  }

  public currentSlide(n: number) {
    this.showSlides((this.slideIndex = n));
  }

  public showSlides(n) {
    let i;
    const slides: NodeListOf<HTMLElement> = document.querySelectorAll('.quotes');
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slides[this.slideIndex - 1].style.display = 'grid';
  }
}
