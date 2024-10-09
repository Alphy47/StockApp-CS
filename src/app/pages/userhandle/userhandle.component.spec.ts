import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserhandleComponent } from './userhandle.component';

describe('UserhandleComponent', () => {
  let component: UserhandleComponent;
  let fixture: ComponentFixture<UserhandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserhandleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserhandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
