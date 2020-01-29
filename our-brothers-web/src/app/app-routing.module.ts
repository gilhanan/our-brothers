import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { MeetingsPageComponent } from './pages/meetings-page/meetings-page.component';
import { AdminBereavedsPageComponent } from './pages/admin-bereaveds-page/admin-bereaveds-page.component';

const routes: Routes = [
  {
    path: 'meetings',
    component: MeetingsPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'account',
    component: AccountPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin-bereaveds',
    component: AdminBereavedsPageComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
