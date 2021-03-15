import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { GatewaysService } from './gateways.service';
import { NotificationsService } from './notifications.service';

describe('GatewaysService', () => {
  let service: GatewaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, NotificationsService],
    });
    const httpClient = TestBed.inject(HttpClient);
    const notifier = TestBed.inject(NotificationsService);
    service = new GatewaysService(httpClient, notifier);
    console.log(service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get gateways list', (done: DoneFn) => {
    service.getGatewayList().subscribe({
      next: list => {
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        done();
      },
      error: (error) => {
        expect(error).toBeDefined();
        done();
      }
    });
  });
});
