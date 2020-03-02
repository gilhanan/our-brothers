import {
  Component,
  OnInit,
  Input,
  ElementRef,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() slides: TemplateRef<any>[];
  slidesWithId: { slide: TemplateRef<any>; id: string }[];

  constructor() {}

  ngOnInit(): void {
    this.slidesWithId = this.slides.map((value, index) => {
      return { slide: value, id: `slide-${index}` };
    });
  }
}
