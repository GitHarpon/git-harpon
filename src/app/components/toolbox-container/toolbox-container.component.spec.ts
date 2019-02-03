import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolboxContainerComponent } from './toolbox-container.component';

describe('ToolboxContainerComponent', () => {
  let component: ToolboxContainerComponent;
  let fixture: ComponentFixture<ToolboxContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolboxContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolboxContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
