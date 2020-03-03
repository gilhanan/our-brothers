import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home/home-page.component';
import {HostGuard} from './guards/host.guard';
import {TellGuard} from './guards/tell.guard';
import {ParticipateGuard} from './guards/participate.guard';
import {HostPageModule} from "./host/page/host-page.module";

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'host',
    loadChildren: () => import('./host/page/host-page.module').then(({ HostPageModule }) => HostPageModule),
    canActivate: [HostGuard]
  },
  {
    path: 'tell',
    loadChildren: () => import('./tell/page/tell-page.module').then(({ TellPageModule }) => TellPageModule),
    canActivate: [TellGuard]
  },
  {
    path: 'participate',
    loadChildren: () => import('./participate/page/participate-page.module').then(({ ParticipatePageModule }) => ParticipatePageModule),
    canActivate: [ParticipateGuard]
  },
  {
    path: 'meetings',
    loadChildren: () => import('./meetings/page/meetings-page.module').then(({MeetingsPageModule}) => MeetingsPageModule)
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
    loadChildren: () => import('./donate/page/donate-page.module').then(({DonatePageModule}) => DonatePageModule)
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
