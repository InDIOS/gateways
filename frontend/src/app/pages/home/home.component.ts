import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { DevicesService } from '../../services/devices.service';
import { GatewaysService } from '../../services/gateways.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  devicesCount = 0;
  gatewaysCount = 0;

  subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private deviceService: DevicesService,
    private gatewayService: GatewaysService,
    private breadcrumbService: BreadcrumbsService,
  ) { }

  ngOnDestroy(): void {
    this.breadcrumbService.reset();
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.breadcrumbService.goTo([
      { path: '/home', icon: 'home', text: 'Home' },
      { icon: 'laptop', text: 'Dashboard' },
    ]);
    const subs = forkJoin({
      devices: this.deviceService.getDeviceList(),
      gateways: this.gatewayService.getGatewayList(),
    }).subscribe({
      next: ({ devices, gateways }) => {
        this.devicesCount = devices.length;
        this.gatewaysCount = gateways.length;
      },
    });

    this.subscriptions.add(subs);
  }

  goToGateways(): void {
    this.router.navigate(['gateways']);
  }

  goToDevices(): void {
    this.router.navigate(['devices']);
  }
}
