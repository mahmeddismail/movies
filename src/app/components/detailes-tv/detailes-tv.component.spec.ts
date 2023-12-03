import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailesTvComponent } from './detailes-tv.component';

describe('DetailesTvComponent', () => {
  let component: DetailesTvComponent;
  let fixture: ComponentFixture<DetailesTvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailesTvComponent]
    });
    fixture = TestBed.createComponent(DetailesTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
