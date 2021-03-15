import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Gateway } from '../../interfaces';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { DevicesService } from '../../services/devices.service';
import { GatewaysService } from '../../services/gateways.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
})
export class DeviceDetailsComponent implements OnInit, OnDestroy {
  gateway: Gateway | null = null;
  form: FormGroup = this.builder.group({
    _id: [''],
    uid: [''],
    vendor: [''],
    status: [''],
  });
  subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deviceService: DevicesService,
    private gatewayService: GatewaysService,
    private builder: FormBuilder,
    private breadcrumbService: BreadcrumbsService,
  ) {}

  ngOnDestroy(): void {
    this.breadcrumbService.reset();
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.breadcrumbService.goTo([
      { path: '/home', icon: 'home', text: 'Home' },
      { path: '/devices', icon: 'list', text: 'Devices' },
      { icon: 'pencil', text: 'Device Details' },
    ]);
    const subs = this.route.params
      .pipe(switchMap(({ id }) => (id === 'new' ? of(null) : this.deviceService.getDeviceDatails(id))))
      .subscribe({
        next: (device) => {
          if (device) {
            this.form.patchValue(device);
          }
        },
      });

    this.subscriptions.add(subs);
  }

  saveDevice(): void {
    const device = this.form.value;

    if (!device._id) {
      delete device._id;
    }

    const subs = this.route.params
      .pipe(
        switchMap(({ gid }) => (gid ? this.gatewayService.getGatewayDatails(gid) : of(null))),
        switchMap((gateway) => {
          if (gateway && !device._id) {
            this.gateway = gateway;
            return this.gatewayService.addGatewayDevice(gateway._id, device);
          }
          return this.deviceService.updateDevice(device);
        }),
      )
      .subscribe({
        next: (result) => {
          if (result) {
            this.goToList();
          }
        },
      });

    this.subscriptions.add(subs);
  }

  goToList(): void {
    this.router.navigate(this.gateway ? ['/gateway', this.gateway._id] : ['/devices']);
  }
}
