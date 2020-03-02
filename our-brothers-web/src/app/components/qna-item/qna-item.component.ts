import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { QNAItem } from '../qna-list/qna-list.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-qna-item',
  templateUrl: './qna-item.component.html',
  styleUrls: ['./qna-item.component.scss']
})
export class QnaItemComponent implements OnInit, OnChanges {
  @Input() qnaItem: QNAItem;
  public answerSafeHtml: any;

  public open = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.qnaItem) {
      this.answerSafeHtml = this.sanitizer.bypassSecurityTrustHtml(
        this.qnaItem.answer
      );
    }
  }
}
