import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./gallery-page.component.scss']
})
export class GalleryPageComponent {}
