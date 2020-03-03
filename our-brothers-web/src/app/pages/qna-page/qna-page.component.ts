import { Component, OnInit } from '@angular/core';

import { UserRole } from 'models';
import { AuthService } from 'src/app/services/auth.service';
import { QNAItem } from 'src/app/components/qna-list/qna-list.component';
import { qnaBorthers, qnaHosts, qnaParticipates } from './qnas';

@Component({
  selector: 'app-qna-page',
  templateUrl: './qna-page.component.html',
  styleUrls: ['./qna-page.component.scss']
})
export class QnaPageComponent implements OnInit {
  public UserRole = UserRole;
  public currentQType: UserRole;
  public qnaBrothers: QNAItem[] = qnaBorthers;
  public qnaHosts: QNAItem[] = qnaHosts;
  public qnaParticipates: QNAItem[] = qnaParticipates;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.currentQType = (user && user.role) || UserRole.bereaved;
    });
  }
}
