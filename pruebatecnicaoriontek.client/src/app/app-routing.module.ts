import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';

const routes: Routes = [
  { path: '', component: ClientsListComponent },      
  { path: 'clients', component: ClientsListComponent }, 
  { path: 'clients/new', component: ClientDetailComponent },
  { path: 'clients/:id', component: ClientDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
