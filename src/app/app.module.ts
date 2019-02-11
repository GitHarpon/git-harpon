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
import {MatTabsModule, MatIconModule } from '@angular/material';
import { ContextMenuModule } from 'ngx-contextmenu';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { MonacoEditorWrapperComponent } from './components/monaco-wrapper/monaco-editor-wrapper.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { EditorPreferencesService } from './providers/editor-preferences.service';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { ContainerComponent } from './components/container/container.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ButtonComponent } from './components/button/button.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { InputComponent } from './components/input/input.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component';
import { InputNumberComponent } from './components/input-number/input-number.component';

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
    InputNumberComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatTabsModule,
    NgScrollbarModule,
    NgbModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
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
  providers: [ElectronService, EditorPreferencesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
