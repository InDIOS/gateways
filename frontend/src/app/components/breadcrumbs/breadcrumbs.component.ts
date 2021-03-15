import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../interfaces';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  get breadcrumbs$(): Observable<Breadcrumb[]> {
    return this.breadcrumbService.breadcrumbs$;
  }

  get currentBreadcrumbs$(): Observable<Breadcrumb> {
    return this.breadcrumbService.current$;
  }

  constructor(private breadcrumbService: BreadcrumbsService) {}
}
