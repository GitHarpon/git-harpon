import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDiffCommitComponent } from './file-diff-commit.component';

describe('FileDiffCommitComponent', () => {
  let component: FileDiffCommitComponent;
  let fixture: ComponentFixture<FileDiffCommitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDiffCommitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDiffCommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
