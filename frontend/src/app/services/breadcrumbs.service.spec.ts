import { TestBed } from '@angular/core/testing';

import { BreadcrumbsService } from './breadcrumbs.service';

describe('BreadcrumbsService', () => {
  let service: BreadcrumbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add breadcrumbs', () => {
    service.goTo([{ path: '', text: '', icon: '' }]);
    service.breadcrumbs$.subscribe({
      next: list => {
        expect(list).toBeDefined();
        expect(list.length).toBe(1);
      }
    });
  });

  it('should reset breadcrumbs', () => {
    service.reset();
    service.breadcrumbs$.subscribe({
      next: list => {
        expect(list).toBeDefined();
        expect(list.length).toBe(0);
      }
    });
  });

  it('should current breadcrumb be last item', () => {
    const item = { path: '', text: '1', icon: '' };
    service.goTo([{ path: '', text: '0', icon: '' }, item]);
    service.current$.subscribe({
      next: i => {
        expect(i).toBeDefined();
        expect(i).toBe(item);
      }
    });
  });
});
