import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareOwnProductsComponent } from './share-own-products.component';

describe('ShareOwnProductsComponent', () => {
  let component: ShareOwnProductsComponent;
  let fixture: ComponentFixture<ShareOwnProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareOwnProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareOwnProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
