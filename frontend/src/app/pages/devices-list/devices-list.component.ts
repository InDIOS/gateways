import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { DevicesService } from '../../services/devices.service';
import { Device } from '../../interfaces';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss'],
})
export class DevicesListComponent implements OnInit, OnDestroy {
  devices: Device[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private deviceService: DevicesService, private breadcrumbService: BreadcrumbsService) {}

  ngOnDestroy(): void {
    this.breadcrumbService.reset();
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    const subs = this.deviceService.getDeviceList().subscribe({
      next: (list) => {
        this.devices = list;
      },
    });

    this.breadcrumbService.goTo([
      { path: '/home', icon: 'home', text: 'Home' },
      { icon: 'list', text: 'Devices' },
    ]);

    this.subscriptions.add(subs);
  }
}
