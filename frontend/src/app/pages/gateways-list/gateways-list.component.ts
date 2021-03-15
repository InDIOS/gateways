import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { GatewaysService } from 'src/app/services/gateways.service';
import { Gateway } from '../../interfaces';

@Component({
  selector: 'app-gateways-list',
  templateUrl: './gateways-list.component.html',
  styleUrls: ['./gateways-list.component.scss'],
})
export class GatewaysListComponent implements OnInit, OnDestroy {
  gateways: Gateway[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private gatewaysService: GatewaysService, private breadcrumbService: BreadcrumbsService) {}
  ngOnDestroy(): void {
    this.breadcrumbService.reset();
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.loadGateways();
    this.breadcrumbService.goTo([
      { path: '/home', icon: 'home', text: 'Home' },
      { icon: 'list', text: 'Gateways' },
    ]);
  }

  loadGateways(): void {
    const subs = this.gatewaysService.getGatewayList().subscribe({
      next: (list) => {
        this.gateways = list;
      },
    });

    this.subscriptions.add(subs);
  }

  removeGatewayById(id: string): void {
    const subs = this.gatewaysService.removeGateway(id).subscribe({
      next: () => {
        this.loadGateways();
      },
    });

    this.subscriptions.add(subs);
  }
}
