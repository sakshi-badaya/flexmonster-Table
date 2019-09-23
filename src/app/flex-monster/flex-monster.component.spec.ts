import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexMonsterComponent } from './flex-monster.component';

describe('FlexMonsterComponent', () => {
  let component: FlexMonsterComponent;
  let fixture: ComponentFixture<FlexMonsterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexMonsterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexMonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
