import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantRowComponent } from './participant-row.component';

describe('ParticipantRowComponent', () => {
  let component: ParticipantRowComponent;
  let fixture: ComponentFixture<ParticipantRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
