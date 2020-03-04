import { NgModule } from '@angular/core';
import { TeamPageComponent } from './team-page.component';
import { RouterModule } from '@angular/router';
import { TeamModule } from '../team.module';
import { CommonModule } from '@angular/common';

const routes = [
  {
    path: '',
    component: TeamPageComponent
  }
];

@NgModule({
  imports: [TeamModule, RouterModule.forChild(routes), CommonModule],
  declarations: [TeamPageComponent]
})
export class TeamPageModule {}
