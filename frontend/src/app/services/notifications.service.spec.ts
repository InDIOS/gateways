import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add notifications', (done: DoneFn) => {
    service.add([{ title: '', description: '', type: '' }]);
    service.notifications$.subscribe({
      next: (list) => {
        expect(list).toBeDefined();
        expect(list.length).toBe(1);
        done();
      },
    });
  });

  it('should reset notification list', (done: DoneFn) => {
    service.reset();
    service.notifications$.subscribe({
      next: (list) => {
        expect(list).toBeDefined();
        expect(list.length).toBe(0);
        done();
      },
    });
  });

  it('should remove a notification', (done: DoneFn) => {
    const item = { title: '', description: '', type: '' };
    service.add([item]);
    service.remove(item);
    service.notifications$.subscribe({
      next: (list) => {
        expect(list).toBeDefined();
        expect(list.length).toBe(0);
        done();
      },
    });
  });
});
