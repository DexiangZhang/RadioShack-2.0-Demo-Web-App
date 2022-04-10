import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResetPWComponent } from './user-reset-pw.component';

describe('UserResetPWComponent', () => {
  let component: UserResetPWComponent;
  let fixture: ComponentFixture<UserResetPWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserResetPWComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResetPWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
