import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApilogComponent } from './apilog.component';

describe('ApilogComponent', () => {
  let component: ApilogComponent;
  let fixture: ComponentFixture<ApilogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApilogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
