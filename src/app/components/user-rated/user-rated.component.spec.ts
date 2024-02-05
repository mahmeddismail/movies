import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRatedComponent } from './user-rated.component';

describe('UserRatedComponent', () => {
  let component: UserRatedComponent;
  let fixture: ComponentFixture<UserRatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserRatedComponent]
    });
    fixture = TestBed.createComponent(UserRatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
