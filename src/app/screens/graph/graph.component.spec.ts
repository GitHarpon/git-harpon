import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphComponent } from './graph.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { RightPanelService } from '../../providers/right-panel.service';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { GraphService } from '../../providers/graph.service';
import { MockGraphService } from '../../models/MockGraphService';
import { TreeItemComponent } from '../../components/tree-item/tree-item.component';
import { TreeComponent } from '../../components/tree/tree.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { GitService } from '../../providers/git.service';
import { MockGitService } from '../../models/MockGitService';
import { LeftPanelService } from '../../providers/left-panel.service';
import { MockLeftPanelService } from '../../models/MockLeftPanelService';

describe('GraphComponent', () => {
  /* tslint:disable */
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;
  let rightPanelService: RightPanelService;
  /* tslint:enable */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GraphComponent,
        InputComponent,
        ButtonComponent,
        TreeItemComponent,
        TreeComponent,
        TabsComponent,
        LoaderComponent
      ],
      imports: [
        FormsModule,
        BrowserModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
        })
      ],
      providers: [
        {
          provide: ThemePreferencesService,
          useClass: MockThemePreferencesService
        },
        {
          provide: RightPanelService,
          useClass: MockRightPanelService
        },
        {
          provide: GraphService,
          useClass: MockGraphService
        },
        {
          provide: GitService,
          useClass: MockGitService
        },
        {
          provide: LeftPanelService,
          useClass: MockLeftPanelService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    rightPanelService = TestBed.get(RightPanelService);
    fixture.detectChanges();
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the ngOnInit function', () => {
    expect(component.themePrefSubscription).toBeDefined();
    expect(component.graphLoadingSubscription).toBeDefined();
    expect(component.graphSubscription).toBeDefined();
    expect(component.drawingGraphSubscription).toBeDefined();
  });

  it ('tests the openSendCommit function', () => {
    const Result = component.openSendCommit();
    expect(Result).toBeTruthy();
  });

  it('tests the drawTheGraph function with drawingGraph', () => {
    const DrawingGraph = true;
    component.drawingGraph = DrawingGraph;
    const Empty = '';

    const Result = component.drawTheGraph();

    expect(Result).toBe(Empty);

  });

  it ('tests the ngOnDestroy function with defined subscriptions', () => {
    component.ngOnDestroy();

    expect(component.themePrefSubscription.closed).toBeTruthy();
    expect(component.graphLoadingSubscription.closed).toBeTruthy();
    expect(component.graphSubscription.closed).toBeTruthy();
    expect(component.drawingGraphSubscription.closed).toBeTruthy();
  });

  it ('tests the ngOnDestroy function with undefined subscriptions', () => {
    const Undefined = undefined;
    component.themePrefSubscription = Undefined;
    component.graphLoadingSubscription = Undefined;
    component.graphSubscription = Undefined;
    component.drawingGraphSubscription = Undefined;

    component.ngOnDestroy();

    expect(component.themePrefSubscription).toBeUndefined();
    expect(component.graphLoadingSubscription).toBeUndefined();
    expect(component.graphSubscription).toBeUndefined();
    expect(component.drawingGraphSubscription).toBeUndefined();
  });
});
