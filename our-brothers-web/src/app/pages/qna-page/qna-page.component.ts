import { Component, OnInit } from '@angular/core';
import { QNAItem } from 'src/app/components/qna-list/qna-list.component';
import { qnaBorthers, qnaHosts, qnaParticipates } from './qnas';

@Component({
  selector: 'app-qna-page',
  templateUrl: './qna-page.component.html',
  styleUrls: ['./qna-page.component.scss']
})
export class QnaPageComponent implements OnInit {
  public currentQType = 0;
  public qnaBrothers: QNAItem[] = qnaBorthers;
  public qnaHosts: QNAItem[] = qnaHosts;
  public qnaParticipates: QNAItem[] = qnaParticipates;
  constructor() {}

  ngOnInit(): void {}
}
