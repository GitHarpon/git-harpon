import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitTextAreaComponent } from './commit-text-area.component';

describe('CommitTextAreaComponent', () => {
  let component: CommitTextAreaComponent;
  let fixture: ComponentFixture<CommitTextAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitTextAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
