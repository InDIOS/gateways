import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getServiceUrl } from '../utils';
import { Observable, of } from 'rxjs';
import { Device, Gateway } from '../interfaces';
import { NotificationsService } from './notifications.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GatewaysService {
  private timer: any = -1;

  constructor(private http: HttpClient, private notifierService: NotificationsService) {}

  getGatewayList(): Observable<Gateway[]> {
    return this.http.get(getServiceUrl('gateways')).pipe(catchError(this.errorHandler()) as any) as Observable<
      Gateway[]
    >;
  }

  addGateway(gateway: Gateway): Observable<Gateway> {
    return this.http
      .post(getServiceUrl('gateway'), gateway)
      .pipe(catchError(this.errorHandler()) as any) as Observable<Gateway>;
  }

  addGatewayDevice(gatewayId: string, device: Device): Observable<Device> {
    return this.http
      .post(getServiceUrl(`gateway/${gatewayId}/device`), device)
      .pipe(catchError(this.errorHandler()) as any) as Observable<Device>;
  }

  removeGatewayDevice(gatewayId: string, deviceId: string): Observable<Device> {
    return this.http
      .delete(getServiceUrl(`gateway/${gatewayId}/device/${deviceId}`))
      .pipe(catchError(this.errorHandler()) as any) as Observable<Device>;
  }

  getGatewayDatails(id: string): Observable<Gateway> {
    return this.http
      .get(getServiceUrl(`gateway/${id}`))
      .pipe(catchError(this.errorHandler()) as any) as Observable<Gateway>;
  }

  updateGateway(gateway: Gateway): Observable<Gateway> {
    return this.http
      .put(getServiceUrl(`gateway/${gateway._id}`), gateway)
      .pipe(catchError(this.errorHandler()) as any) as Observable<Gateway>;
  }

  removeGateway(id: string): Observable<Gateway> {
    return this.http
      .delete(getServiceUrl(`gateway/${id}`))
      .pipe(catchError(this.errorHandler()) as any) as Observable<Gateway>;
  }

  private errorHandler<T>(): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(`Error: ${error.message}`, error);
      this.notifierService.add([{ title: error.statusText, description: error.error?.message, type: 'danger' }]);
      this.timer = setTimeout(() => {
        this.notifierService.reset();
        clearTimeout(this.timer);
      }, 15000);
      return of();
    };
  }
}
