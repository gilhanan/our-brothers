import { Component, OnInit } from '@angular/core';

import { UserRole } from 'models';
import { AuthService } from '../../shared/services/auth.service';
import { QNAItem } from '../qna-list/qna-list.component';
import { qnaBorthers, qnaHosts, qnaParticipates } from './qnas';

@Component({
  selector: 'app-qna-page',
  templateUrl: './qna-page.component.html',
  styleUrls: ['./qna-page.component.scss']
})
export class QnaPageComponent implements OnInit {
   UserRole = UserRole;
   currentQType: UserRole;
   qnaBrothers: QNAItem[] = qnaBorthers;
   qnaHosts: QNAItem[] = qnaHosts;
   qnaParticipates: QNAItem[] = qnaParticipates;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.currentQType = (user && user.role) || UserRole.bereaved;
    });
  }
}
