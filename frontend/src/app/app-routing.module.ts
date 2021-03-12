import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceDetailsComponent } from './pages/device-details/device-details.component';
import { DevicesListComponent } from './pages/devices-list/devices-list.component';
import { GatewayDetailsComponent } from './pages/gateway-details/gateway-details.component';
import { GatewaysListComponent } from './pages/gateways-list/gateways-list.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'gateways', component: GatewaysListComponent },
  { path: 'gateway/:id', component: GatewayDetailsComponent },
  { path: 'devices', component: DevicesListComponent },
  { path: 'device/:id', component: DeviceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
