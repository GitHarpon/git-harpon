import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffViewComponent } from './diff-view.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MockTranslateLoader } from '../../models/MockTranslateLoader';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';
import { MockRightPanelService } from '../../models/MockRightPanelService';
import { RightPanelService } from '../../providers/right-panel.service';
import { GitService } from '../../providers/git.service';
import { MockGitService } from '../../models/MockGitService';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule, MatIconModule } from '@angular/material';
import { ResizableModule } from 'angular-resizable-element';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ClipboardModule } from 'ngx-clipboard';
import { ContextMenuModule } from 'ngx-contextmenu';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MockLeftPanelService } from '../../models/MockLeftPanelService';
import { LeftPanelComponent } from '../left-panel/left-panel.component';
import { LeftPanelService } from '../../providers/left-panel.service';

describe('DiffViewComponent', () => {
  /* tslint:disable */
  let component: DiffViewComponent;
  let fixture: ComponentFixture<DiffViewComponent>;
  /*tslint:enable*/

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DiffViewComponent,
        TabsComponent,
        LoaderComponent
      ],
      imports: [
        FormsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
        }),
        MatTabsModule,
        ResizableModule,
        NgbModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        NgScrollbarModule,
        MatIconModule,
        ClipboardModule,
        ContextMenuModule,
        BrowserDynamicTestingModule
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
          provide: LeftPanelService,
          useClass: MockLeftPanelService
        },
        {
          provide: GitService,
          useClass: MockGitService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tests the setDiffViewModel with valid result and INLINE_VIEW', (done) => {
    component.currentView = 'INLINE_VIEW';
    component.diffFileInformation = {
      children: '',
      file: '',
      isCurrentCommit: true,
      parent: ''
    };

    component.setDiffViewModel().then(() => {
      expect(component.diffViewModel).toBeDefined();
      expect(component.loading).toBeFalsy();
      done();
    });
  });

  it('tests the setDiffViewModel with valid result and DIFF_VIEW', (done) => {
    component.currentView = 'DIFF_VIEW';
    component.diffFileInformation = {
      children: '',
      file: '',
      isCurrentCommit: true,
      parent: ''
    };

    component.setDiffViewModel().then(() => {
      expect(component.diffViewModel).toBeDefined();
      expect(component.loading).toBeFalsy();
      done();
    });
  });

  it('tests the setDiffViewModel with invalid result', (done) => {
    component.diffFileInformation = {
      children: '',
      file: '',
      isCurrentCommit: false,
      parent: ''
    };

    component.setDiffViewModel().then(() => {
      expect(component.loading).toBeFalsy();
      done();
    });
  });

  it('tests the closeDiffView', () => {
    component.closeDiffView();
  });
});
