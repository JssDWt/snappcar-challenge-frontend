import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AuthGuard } from './_guards';
import { CarsComponent } from './cars';
import { CarDetailsComponent } from './car-details';
// import { AccountComponent } from './account';
import { LoginComponent } from './login';

const routes: Routes = [
  { path: 'cars', component: CarsComponent },
  { path: 'cars/:id', component: CarDetailsComponent },
  // { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
