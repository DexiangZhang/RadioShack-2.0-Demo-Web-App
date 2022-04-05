import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransHistoryComponent } from './view-trans-history.component';

describe('ViewTransHistoryComponent', () => {
  let component: ViewTransHistoryComponent;
  let fixture: ComponentFixture<ViewTransHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTransHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
