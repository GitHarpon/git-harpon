import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatTabsModule, MatIconModule, MatExpansionModule, MatSortModule, MatFormFieldModule } from '@angular/material';
import { ContextMenuModule } from 'ngx-contextmenu';
import { ClipboardModule } from 'ngx-clipboard';
import { ResizableModule } from 'angular-resizable-element';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';
import { GitService } from './providers/git.service';
import { LanguagePreferencesService } from './providers/language-preferences.service';
import { TerminalManagerService } from './providers/terminal-manager.service';
import { ThemePreferencesService } from './providers/theme-preferences.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { MonacoEditorWrapperComponent } from './components/monaco-wrapper/monaco-editor-wrapper.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebStorageModule } from 'ngx-store';

import { ToastrModule } from 'ngx-toastr';
import { EditorPreferencesService } from './providers/editor-preferences.service';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './screens/home/home.component';
import { ToolboxComponent } from './screens/toolbox/toolbox.component';
import { ContainerComponent } from './components/container/container.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ButtonComponent } from './components/button/button.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { InputComponent } from './components/input/input.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { CopyButtonComponent } from './components/copy-button/copy-button.component';
import { PreferencesComponent } from './screens/preferences/preferences.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { InfoBarComponent } from './components/info-bar/info-bar.component';
import { LeftPanelComponent } from './screens/left-panel/left-panel.component';
import { RightPanelComponent } from './screens/right-panel/right-panel.component';
import { GraphComponent } from './screens/graph/graph.component';
import { ViewCommitComponent } from './screens/view-commit/view-commit.component';
import { SendCommitComponent } from './screens/send-commit/send-commit.component';
import { RightPanelService } from './providers/right-panel.service';
import { LeftPanelService } from './providers/left-panel.service';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { CommitTextAreaComponent } from './components/commit-text-area/commit-text-area.component';
import { FileDiffCommitComponent } from './components/file-diff-commit/file-diff-commit.component';
import { GraphService } from './providers/graph.service';
import { TreeComponent } from './components/tree/tree.component';
import { TreeItemComponent } from './components/tree-item/tree-item.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    MonacoEditorWrapperComponent,
    FooterComponent,
    HomeComponent,
    ToolboxComponent,
    ContainerComponent,
    CheckboxComponent,
    ButtonComponent,
    DropdownComponent,
    IconButtonComponent,
    InputComponent,
    LoaderComponent,
    ModalComponent,
    InputNumberComponent,
    CopyButtonComponent,
    PreferencesComponent,
    AccordionComponent,
    InfoBarComponent,
    LeftPanelComponent,
    RightPanelComponent,
    GraphComponent,
    ViewCommitComponent,
    SendCommitComponent,
    TextAreaComponent,
    CommitTextAreaComponent,
    FileDiffCommitComponent,
    TreeComponent,
    TreeItemComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatTabsModule,
    MatSortModule,
    MatExpansionModule,
    MatFormFieldModule,
    NgScrollbarModule,
    NgbModule,
    ClipboardModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ResizableModule,
    WebStorageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true
    })
  ],
  providers: [
    ElectronService,
    GitService,
    EditorPreferencesService,
    LanguagePreferencesService,
    ThemePreferencesService,
    TerminalManagerService,
    RightPanelService,
    LeftPanelService,
    GraphService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
