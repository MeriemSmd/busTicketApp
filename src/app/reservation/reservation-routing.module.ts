import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

const routes: Routes = [
  {
    path: '',
    component: ReservationListComponent
  },
  {
    path: 'reservation-list',
    component: ReservationListComponent
  },
  {
    path: 'reservation/:id',
    component: ReservationPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }