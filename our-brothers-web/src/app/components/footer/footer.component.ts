import { Component, Input } from '@angular/core';
import { ParticipationsService } from '../../shared/services/participations.service';
import { User } from 'models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() public user: User;

  constructor(public participationsService: ParticipationsService) {}
}
