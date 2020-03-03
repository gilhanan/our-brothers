import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {DonatePageComponent} from './pages/donate-page/donate-page.component';
import {MeetingsPageComponent} from './pages/meetings-page/meetings-page.component';
import {TellPageComponent} from './pages/tell-page/tell-page.component';
import {ParticipatePageComponent} from './pages/participate-page/participate-page.component';
import {HostPageComponent} from './pages/host-page/host-page.component';
import {MeetingDetailsPageComponent} from './pages/meeting-details-page/meeting-details-page.component';
import {HostGuard} from './guards/host.guard';
import {TellGuard} from './guards/tell.guard';
import {ParticipateGuard} from './guards/participate.guard';

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
    loadChildren: () => import('./about/page/about-page.module').then(({ AboutPageModule }) => AboutPageModule),
    pathMatch: 'full'
  },
  {
    path: 'team',
    loadChildren: () => import('./team/page/team-page.module').then(({ TeamPageModule }) => TeamPageModule),
    pathMatch: 'full'
  },
  {
    path: 'articles',
    loadChildren: () => import('./articles/page/articles-page.module').then(({ ArticlesPageModule }) => ArticlesPageModule),
    pathMatch: 'full'
  },
  {
    path: 'news',
    loadChildren: () => import('./news/page/news-page.module').then(({ NewsPageModule }) => NewsPageModule),
    pathMatch: 'full'
  },
  {
    path: 'agenda',
    loadChildren: () => import('./agenda/page/agenda-page.module').then(({ AgendaPageModule }) => AgendaPageModule),
    pathMatch: 'full'
  },
  {
    path: 'questions',
    loadChildren: () => import('./qna/page/qna-page.module').then(({ QnaPageModule }) => QnaPageModule),
    pathMatch: 'full'
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/page/gallery-page.module').then(({ GalleryPageModule }) => GalleryPageModule),
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
    loadChildren: () => import('./contact/page/contact-page.module').then(({ContactPageModule}) => ContactPageModule),
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/bereaveds/page/admin-bereaveds-page.module').then(({ AdminBereavedsPageModule }) => AdminBereavedsPageModule),
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
