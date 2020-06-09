import { Component, Input } from '@angular/core';
import { User } from 'models';
import { environment } from '../../../environments/environment';
import { ParticipationsService } from '../../shared/services/participations.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() user: User;

  public version: string = environment.versions.version;
  public revision: string = environment.versions.revision;

  constructor(public participationsService: ParticipationsService) {}
}
