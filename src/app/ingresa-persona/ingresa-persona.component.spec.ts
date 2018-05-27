import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresaPersonaComponent } from './ingresa-persona.component';

describe('IngresaPersonaComponent', () => {
  let component: IngresaPersonaComponent;
  let fixture: ComponentFixture<IngresaPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresaPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
