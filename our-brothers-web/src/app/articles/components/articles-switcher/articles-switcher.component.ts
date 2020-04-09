import { ChangeDetectionStrategy, Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'articles-switcher',
  templateUrl: './articles-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./articles-switcher.component.scss']
})
export class ArticlesSwitcherComponent implements OnInit {
  @Input() maxNumber: number;
  @Input() initialNumber: number;
  @Output() selectedNumberUpdate: EventEmitter<number> = new EventEmitter<number>();

  public startMarker: string = '<';
  public endMarker: string = '>';
  public selectedNumber: number;
  public counter = Array;

  ngOnInit() {
    this.selectedNumber = this.initialNumber;
  }

  public handleNextItemSelected() {
    this.selectedNumber = (this.selectedNumber++ % this.maxNumber) + 1;
    this.selectedNumberUpdate.emit(this.selectedNumber);
  }

  public handlePreviousItemSelected() {
    const tempSelectedNumber: number = this.selectedNumber - 1;
    this.selectedNumber = tempSelectedNumber === 0 ? this.maxNumber : tempSelectedNumber;
    this.selectedNumberUpdate.emit(this.selectedNumber);
  }

  public handleItemClick(item: number) {
    this.selectedNumber = item;
    this.selectedNumberUpdate.emit(this.selectedNumber);
  }
}
