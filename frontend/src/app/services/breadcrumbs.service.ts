import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  private current: BehaviorSubject<Breadcrumb | null> = new BehaviorSubject<Breadcrumb | null>(null);
  private breadcrumbs: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject<Breadcrumb[]>([]);

  get breadcrumbs$(): Observable<Breadcrumb[]> {
    return this.breadcrumbs.asObservable();
  }
  get current$(): Observable<Breadcrumb> {
    return this.current.asObservable().pipe(filter((v) => v !== null)) as Observable<Breadcrumb>;
  }

  constructor() {}

  goTo(path: Breadcrumb[]): void {
    this.current.next(path[path.length - 1]);
    this.breadcrumbs.next(path);
  }

  reset(): void {
    this.current.next(null);
    this.breadcrumbs.next([]);
  }
}
