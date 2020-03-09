import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page.component';
import { RoleBasedGuard } from './guards/role-based.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'host',
    loadChildren: () => import('./host/page/host-page.module').then(({ HostPageModule }) => HostPageModule),
    data: {
      role: 'host'
    },
    canActivate: [RoleBasedGuard]
  },
  {
    path: 'tell',
    data: {
      role: 'tell'
    },
    loadChildren: () => import('./tell/page/tell-page.module').then(({ TellPageModule }) => TellPageModule),
    canActivate: [RoleBasedGuard]
  },
  {
    path: 'participate',
    data: {
      role: 'participate'
    },
    loadChildren: () =>
      import('./participate/page/participate-page.module').then(({ ParticipatePageModule }) => ParticipatePageModule),
    canActivate: [RoleBasedGuard]
  },
  {
    path: 'meetings',
    loadChildren: () =>
      import('./meetings/page/meetings-page.module').then(({ MeetingsPageModule }) => MeetingsPageModule)
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
    loadChildren: () =>
      import('./articles/page/articles-page.module').then(({ ArticlesPageModule }) => ArticlesPageModule),
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
    loadChildren: () => import('./donate/page/donate-page.module').then(({ DonatePageModule }) => DonatePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/page/contact-page.module').then(({ ContactPageModule }) => ContactPageModule),
    pathMatch: 'full'
  },
  {
    path: 'admin-bereaveds',
    loadChildren: () =>
      import('./admin/bereaveds/page/admin-bereaveds-page.module').then(
        ({ AdminBereavedsPageModule }) => AdminBereavedsPageModule
      )
  },
  {
    path: 'admin-users',
    loadChildren: () =>
      import('./admin/users/page/admin-users-page.module').then(({ AdminUsersPageModule }) => AdminUsersPageModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
