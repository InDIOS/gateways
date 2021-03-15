import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Gateway } from 'src/app/interfaces';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { GatewaysService } from 'src/app/services/gateways.service';

@Component({
  selector: 'app-gateway-details',
  templateUrl: './gateway-details.component.html',
  styleUrls: ['./gateway-details.component.scss'],
})
export class GatewayDetailsComponent implements OnInit, OnDestroy {
  isNew = false;
  gateway: Gateway;
  form: FormGroup = this.builder.group({
    _id: [''],
    name: [''],
    serial: [''],
    address: [''],
  });
  subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gatewayService: GatewaysService,
    private builder: FormBuilder,
    private breadcrumbService: BreadcrumbsService
  ) {
    this.gateway = null as any;
  }
  ngOnDestroy(): void {
    this.breadcrumbService.reset();
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.breadcrumbService.goTo([
      { path: '/home', icon: 'home', text: 'Home' },
      { path: '/gateways', icon: 'list', text: 'Gateways' },
      { icon: 'pencil', text: 'Gateway Details' },
    ]);

    const subs = this.route.params
      .pipe(
        tap(({ id }) => {
          this.isNew = id === 'new';
        }),
        switchMap(({ id }) => (this.isNew ? of(null) : this.gatewayService.getGatewayDatails(id))),
      )
      .subscribe({
        next: (gateway) => {
          if (gateway) {
            this.gateway = gateway;
            this.form.patchValue(gateway);
          }
        },
      });
    this.subscriptions.add(subs);
  }

  saveGateway(): void {
    const gateway = this.form.value;

    if (this.isNew) {
      delete gateway._id;
    }

    const response = this.isNew ? this.gatewayService.addGateway(gateway) : this.gatewayService.updateGateway(gateway);

    const subs = response.subscribe({
      next: (result) => {
        if (result) {
          this.goToList();
        }
      },
    });

    this.subscriptions.add(subs);
  }

  goToList(): void {
    this.router.navigate(['/gateways']);
  }

  removeDeviceById(id: string): void {
    const subs = this.gatewayService.removeGatewayDevice(this.gateway._id, id).subscribe({
      next: () => {
        this.ngOnInit();
      },
    });

    this.subscriptions.add(subs);
  }
}
