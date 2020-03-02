import { Component, OnInit, Input } from '@angular/core';

export interface QNAItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-qna-list',
  templateUrl: './qna-list.component.html',
  styleUrls: ['./qna-list.component.scss']
})
export class QnaListComponent implements OnInit {
  @Input() qnaList: QNAItem[];

  constructor() {}

  ngOnInit(): void {}
}
