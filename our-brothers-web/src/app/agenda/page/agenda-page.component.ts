import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { Quote, QuotesService } from './quotes.service';
import { interval, Subscription } from 'rxjs';
import { Video, VideosService } from './videos.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-agenda-page',
  templateUrl: './agenda-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./agenda-page.component.scss']
})
export class AgendaPageComponent implements OnInit, AfterViewInit {
  pagedExcerpts: { page: Quote[] }[];
  pagedVideos: { page: Video[] }[];
  public quotesSlideIndex: number;
  public videosSlideIndex: number;
  public sub: Subscription;

  constructor(private quotesService: QuotesService, private videosService: VideosService) {
    this.quotesSlideIndex = 1;
    this.videosSlideIndex = 1;
  }

  ngOnInit() {
    if (window.innerWidth <= 768) {
      this.pagedExcerpts = this.quotesService.smallPagePagedQuotes;
    } else {
      this.pagedExcerpts = this.quotesService.pagedQuotes;
    }
    this.pagedVideos = this.videosService.pagedVideos;
  }

  ngAfterViewInit(): void {
    this.showSlides(this.quotesSlideIndex, '.quotes');
    this.showSlides(this.videosSlideIndex, '.videos');
    this.startQuotesCarousel();
  }

  public pauseQuoteCarousel() {
    this.sub.unsubscribe();
  }

  public resumeQuoteCarousel() {
    this.sub.unsubscribe();
    this.startQuotesCarousel();
  }

  private startQuotesCarousel() {
    this.sub = interval(10000).subscribe(() => {
      this.plusSlides(1, '.quotes');
    });
  }

  public plusSlides(n: number, className: string) {
    switch (className) {
      case '.quotes':
        this.showSlides((this.quotesSlideIndex += n), className);
        break;
      case '.videos':
        this.showSlides((this.videosSlideIndex += n), className);
        break;
    }
  }

  public showSlides(n: number, className: string) {
    const slides: NodeListOf<HTMLElement> = document.querySelectorAll(className);

    if (n > slides.length) {
      switch (className) {
        case '.quotes':
          this.quotesSlideIndex = 1;
          break;
        case '.videos':
          this.videosSlideIndex = 1;
          break;
      }
    }

    if (n < 1) {
      switch (className) {
        case '.quotes':
          this.quotesSlideIndex = slides.length;
          break;
        case '.videos':
          this.videosSlideIndex = slides.length;
          break;
      }
    }

    slides.forEach(slide => {
      slide.style.display = 'none';
    });

    switch (className) {
      case '.quotes':
        slides[this.quotesSlideIndex - 1].style.display = 'grid';
        break;
      case '.videos':
        slides[this.videosSlideIndex - 1].style.display = 'grid';
        break;
    }
  }
}
