import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DonatePageComponent } from './pages/donate-page/donate-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { MeetingsPageComponent } from './pages/meetings-page/meetings-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { ArticlesPageComponent } from './pages/articles-page/articles-page.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { AgendaPageComponent } from './pages/agenda-page/agenda-page.component';
import { QnaPageComponent } from './pages/qna-page/qna-page.component';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';
import { AdminBereavedsPageComponent } from './pages/admin-bereaveds-page/admin-bereaveds-page.component';
import { TellPageComponent } from './pages/tell-page/tell-page.component';
import { ParticipatePageComponent } from './pages/participate-page/participate-page.component';
import { HostPageComponent } from './pages/host-page/host-page.component';
import { MeetingDetailsPageComponent } from './pages/meeting-details-page/meeting-details-page.component';
import { HostGuard } from './guards/host.guard';
import { TellGuard } from './guards/tell.guard';
import { ParticipateGuard } from './guards/participate.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'host',
    component: HostPageComponent,
    pathMatch: 'full',
    canActivate: [HostGuard]
  },
  {
    path: 'tell',
    component: TellPageComponent,
    pathMatch: 'full',
    canActivate: [TellGuard]
  },
  {
    path: 'participate',
    component: ParticipatePageComponent,
    pathMatch: 'full',
    canActivate: [ParticipateGuard]
  },
  {
    path: 'meetings',
    children: [
      {
        path: '',
        component: MeetingsPageComponent,
        pathMatch: 'full'
      },
      {
        path: ':memorialYear/:hostId/:meetingId',
        component: MeetingDetailsPageComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'about',
    component: AboutPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'team',
    component: TeamPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'articles',
    component: ArticlesPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'news',
    component: NewsPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'agenda',
    component: AgendaPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'questions',
    component: QnaPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'gallery',
    component: GalleryPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'donate',
    component: DonatePageComponent,
    children: [
      {
        path: '',
        component: DonatePageComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'contact',
    component: ContactPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AdminBereavedsPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'bereaveds',
        component: AdminBereavedsPageComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  providers: [HostGuard, TellGuard, ParticipateGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}
