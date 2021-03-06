import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { GatewaysListComponent } from './pages/gateways-list/gateways-list.component';
import { GatewayDetailsComponent } from './pages/gateway-details/gateway-details.component';
import { DevicesListComponent } from './pages/devices-list/devices-list.component';
import { DeviceDetailsComponent } from './pages/device-details/device-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './components/notification/notification.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GatewaysListComponent,
    GatewayDetailsComponent,
    DevicesListComponent,
    DeviceDetailsComponent,
    NotificationComponent,
    BreadcrumbsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
