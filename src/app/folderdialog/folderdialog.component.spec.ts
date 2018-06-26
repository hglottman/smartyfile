import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderdialogComponent } from './folderdialog.component';

describe('FolderdialogComponent', () => {
  let component: FolderdialogComponent;
  let fixture: ComponentFixture<FolderdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
