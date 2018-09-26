import { CategoriasComponent } from './components/categorias/categorias.component';
import { PresentacionComponent } from './components/presentacion/presentacion.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { MrestaurantComponent } from './components/mrestaurant/mrestaurant.component';
import { ListrestaurantComponent } from './components/listrestaurant/listrestaurant.component';
import { EditrestaurantComponent } from './components/editrestaurant/editrestaurant.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RegisterComponent } from './components/register/register.component';
import { RestauranteditComponent } from './components/restaurantedit/restaurant_edit.component';

const appRoutes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: 'mrestaurant', component: MrestaurantComponent },
      { path: 'listrestaurant', component: ListrestaurantComponent },
      { path: 'editrestaurant/:id', component: EditrestaurantComponent },
      { path: 'restaurantedit', component: RestauranteditComponent }
  /*     ,
      { path: '', redirectTo: '/principal', pathMatch: 'full' } */
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'presentacion', component: PresentacionComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/presentacion', pathMatch: 'full' }




  //   {path:'restaurant', component:RestaurantComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

