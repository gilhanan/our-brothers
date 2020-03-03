import {Component, Input} from '@angular/core';

export interface QNAItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-qna-list',
  templateUrl: './qna-list.component.html',
  styleUrls: ['./qna-list.component.scss']
})
export class QnaListComponent {
  @Input() qnaList: QNAItem[];
}
