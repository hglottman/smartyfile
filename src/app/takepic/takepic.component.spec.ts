import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakepicComponent } from './takepic.component';

describe('TakepicComponent', () => {
  let component: TakepicComponent;
  let fixture: ComponentFixture<TakepicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakepicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakepicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
