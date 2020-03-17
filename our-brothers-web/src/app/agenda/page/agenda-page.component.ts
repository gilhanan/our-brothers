import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { Quote, QuotesService } from './quotes.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-agenda-page',
  templateUrl: './agenda-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./agenda-page.component.scss']
})
export class AgendaPageComponent implements OnInit, AfterViewInit {
  pagedExcerpts: { page: Quote[] }[];
  public slideIndex: number;
  public sub: Subscription;

  constructor(private quotesService: QuotesService) {
    this.slideIndex = 1;
  }

  ngOnInit() {
    this.pagedExcerpts = this.quotesService.pagedQuotes;
  }

  ngAfterViewInit(): void {
    this.showSlides(1);
    this.startCarousel();
  }

  public pauseCarousel() {
    this.sub.unsubscribe();
  }

  public resumeCarousel() {
    this.sub.unsubscribe();
    this.startCarousel();
  }

  private startCarousel() {
    this.sub = interval(10000).subscribe(() => {
      this.plusSlides(1);
    });
  }

  public plusSlides(n: number) {
    this.showSlides((this.slideIndex += n));
  }

  public showSlides(n) {
    const slides: NodeListOf<HTMLElement> = document.querySelectorAll('.quotes');

    if (n > slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = slides.length;
    }

    slides.forEach(slide => {
      slide.style.display = 'none';
    });

    slides[this.slideIndex - 1].style.display = 'grid';
  }
}
