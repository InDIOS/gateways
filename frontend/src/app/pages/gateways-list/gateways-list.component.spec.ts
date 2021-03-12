import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaysListComponent } from './gateways-list.component';

describe('GatewaysListComponent', () => {
  let component: GatewaysListComponent;
  let fixture: ComponentFixture<GatewaysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewaysListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewaysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
