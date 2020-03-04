import { NgModule } from '@angular/core';
import { ParticipationsButtonsComponent } from './participations-buttons.component';
import { HostButtonComponent } from './host-button/host-button.component';
import { ParticipateButtonComponent } from './participate-button/participate-button.component';
import { TellButtonComponent } from './tell-button/tell-button.component';
import { FilpCardModule } from '../flip-card/filp-card.module';

@NgModule({
  imports: [FilpCardModule],
  declarations: [ParticipationsButtonsComponent, HostButtonComponent, ParticipateButtonComponent, TellButtonComponent],
  exports: [ParticipationsButtonsComponent, HostButtonComponent, ParticipateButtonComponent, TellButtonComponent]
})
export class ParticipationsButtonsModule {}
