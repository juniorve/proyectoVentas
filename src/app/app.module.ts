import { CategoriasComponent } from './components/categorias/categorias.component';
import { PresentacionComponent } from './components/presentacion/presentacion.component';
import { MaterialModule } from './shared/modules/material.module';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MrestaurantComponent } from './components/mrestaurant/mrestaurant.component';
import { ListrestaurantComponent } from './components/listrestaurant/listrestaurant.component';
import { EditrestaurantComponent } from './components/editrestaurant/editrestaurant.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RegisterComponent } from './components/register/register.component';
import { RestauranteditComponent } from './components/restaurantedit/restaurant_edit.component';


@NgModule({
  declarations: [
    AppComponent,
    PresentacionComponent,
    LoginComponent,
    RestauranteditComponent,
    MrestaurantComponent,
    ListrestaurantComponent,
    EditrestaurantComponent,
    SidebarComponent,
    RegisterComponent,
    CategoriasComponent
  ],
  imports: [
    MaterialModule, 
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    BrowserModule,
    routing,
    OverlayModule, ReactiveFormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
