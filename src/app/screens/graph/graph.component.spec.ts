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
        TabsComponent
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
    expect(component.graphSubscription).toBeDefined();
  });

  /*it ('test the openSendCommit function', () => {
    const Result = component.openSendCommit();
    expect(Result).toBeTruthy();
  });*/

  it('test the setCommitGraph function with valid graph', () => {
    const Graph = [
      {
        hash: '9cdc1af73a6800632a32c31ba299bd9f4a2d71b9',
        date: '2019-04-07 13:52:32 +0200',
        message: 'first commit',
        author_name: 'toto',
        author_email: 'toto@gmail.com'
      },
      {
        hash: 'aaf6c3dc90ec8bc02ebb7d23e85331b2118d5850',
        date: '2019-04-07 15:52:32 +0200',
        message: 'second commit',
        author_name: 'tata',
        author_email: 'tata@gmail.com'
      }
    ];
    component.graph = Graph;
    const Result = component.setCommitGraph();
    expect(Result).toBeTruthy();
  });



  /*it ('test the ngOnDestroy function with defined subscriptions', () => {
    component.ngOnDestroy();

    expect(component.themePrefSubscription.closed).toBeTruthy();
    expect(component.graphSubscription.closed).toBeTruthy();
  });

  it ('test the ngOnDestroy function with undefined subscriptions', () => {
    const Undefined = undefined;
    component.themePrefSubscription = Undefined;
    component.graphSubscription = Undefined;

    component.ngOnDestroy();

    expect(component.themePrefSubscription).toBeUndefined();
    expect(component.graphSubscription).toBeUndefined();
  });*/
});
