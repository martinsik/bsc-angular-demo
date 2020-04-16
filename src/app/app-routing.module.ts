import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { NoteDetailPageComponent } from './pages/note-detail-page/note-detail-page.component';
import { NoteFormPageComponent } from './pages/note-form-page/note-form-page.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: NotesPageComponent,
        data: {
          title: $localize`List of notes`,
          hideBack: true,
        }
      },
      {
        path: 'create',
        component: NoteFormPageComponent,
        data: {
          title: $localize`Create a note`,
        }
      },
      {
        path: ':id/edit',
        component: NoteFormPageComponent,
        resolve: {
          fetched: 'noteDetail',
        },
      },
      {
        path: ':id',
        component: NoteDetailPageComponent,
        resolve: {
          fetched: 'noteDetail',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
