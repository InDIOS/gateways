import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Device } from '../interfaces';
import { getServiceUrl } from '../utils';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  private timer: any = -1;
  constructor(private http: HttpClient, private notifierService: NotificationsService) {}

  getDeviceList(): Observable<Device[]> {
    return this.http.get(getServiceUrl('devices')).pipe(catchError(this.errorHandler()) as any) as Observable<Device[]>;
  }

  getDeviceDatails(id: string): Observable<Device> {
    return this.http
      .get(getServiceUrl(`device/${id}`))
      .pipe(catchError(this.errorHandler()) as any) as Observable<Device>;
  }

  updateDevice(device: Device): Observable<Device> {
    return this.http
      .put(getServiceUrl(`device/${device._id}`), device)
      .pipe(catchError(this.errorHandler()) as any) as Observable<Device>;
  }

  private errorHandler<T>(): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(`Error: ${error.message}`);
      this.notifierService.add([{ title: error.statusText, description: error.error.message, type: 'danger' }]);
      this.timer = setTimeout(() => {
        this.notifierService.reset();
        clearTimeout(this.timer);
      }, 15000);
      return of();
    };
  }
}
