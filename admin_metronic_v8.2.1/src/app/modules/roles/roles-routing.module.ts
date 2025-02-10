import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { ListRolesComponent } from './list-roles/list-roles.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    children:[
      {
        path:'list',
        component: ListRolesComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
