import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NZ_I18N, en_US, cs_CZ } from 'ng-zorro-antd/i18n';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';

import { ApiInterceptor } from './interceptoirs/api.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteDetailResolver } from './resolvers/note-detail.resolver';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';
import { NoteDetailPageComponent } from './pages/note-detail-page/note-detail-page.component';
import { NoteFormPageComponent } from './pages/note-form-page/note-form-page.component';
import { reducers } from './ngrx/reducers';
import { STORED_LANGUAGE } from '../consts';
import { LanguageEffects } from './ngrx/effects/language.effects';

const metaReducers = [
  localStorageSync({ keys: ['language'] }),
];

const nzI18nMap: any = {
  en: en_US,
  cs: cs_CZ,
};

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    NotesListComponent,
    NotesPageComponent,
    NoteFormComponent,
    NoteDetailComponent,
    NoteDetailPageComponent,
    NoteFormPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveComponentModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ LanguageEffects ]),
    NgZorroAntdModule,
    NzTableModule,
    NzSpinModule,
    NzModalModule,
    NzLayoutModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzPageHeaderModule,
    NzButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: nzI18nMap[STORED_LANGUAGE] },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: 'noteDetail', useClass: NoteDetailResolver },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
