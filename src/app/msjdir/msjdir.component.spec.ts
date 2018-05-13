import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsjdirComponent } from './msjdir.component';

describe('MsjdirComponent', () => {
  let component: MsjdirComponent;
  let fixture: ComponentFixture<MsjdirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsjdirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsjdirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
