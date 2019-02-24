import { async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { MockTranslateService } from '../../models/MockTranslateService';
import { ElectronService } from '../../providers/electron.service';
import { MockElectronService } from '../../models/MockElectronService';
import { GitService } from '../../providers/git.service';
import { MockGitService } from '../../models/MockGitService';
import { ContainerComponent } from '../../components/container/container.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { IconButtonComponent } from '../../components/icon-button/icon-button.component';
import { MatTabsModule, TooltipComponent } from '@angular/material';
import { ResizableModule } from 'angular-resizable-element';
import { LoaderComponent } from '../../components/loader/loader.component';
import { RouterModule, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { MockThemePreferencesService } from '../../models/MockThemePreferencesService';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        ContainerComponent,
        InputComponent,
        ButtonComponent,
        ModalComponent,
        FooterComponent,
        IconButtonComponent,
        LoaderComponent
      ],
      imports: [
        FormsModule,
        TranslateModule,
        MatTabsModule,
        ResizableModule,
        NgbModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
        {
          provide: ThemePreferencesService,
          useClass: MockThemePreferencesService
        },
        {
          provide: ElectronService,
          useClass: MockElectronService
        },
        {
            provide: GitService,
            useClass: MockGitService
        },
        ToastrService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('tests the component creation', () => {
    expect(component).toBeTruthy();
  });

  it('tests the openBrowse function', () => {
    const Path = 'path';
    component.openBrowse();
    expect(component.openFolder).toBe(Path);
  });

  it('tests the openRepo function with valid path', () => {
    const Path = 'path';
    component.openBrowse();
    component.openRepo();
    expect(component.projectModalLoading).toBeFalsy();
    expect(component.path).toBe(Path);
  });

  it('tests the openRepo function with invalid path', () => {
    const Path = '';
    component.openBrowse();
    component.openRepo();
    expect(component.path == Path).toBeFalsy();
  });
});
