import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as languageActions from '../../ngrx/actions/language.actions';

@Injectable()
export class LanguageEffects {

  changeLanguage$ = createEffect(() => this.actions$
    .pipe(
      ofType(languageActions.setCurrentLanguage),
      tap(() => this.window.location.reload()),
    ),
    { dispatch: false },
  );

  private window: Window;

  constructor(
    private actions$: Actions,
    @Inject(DOCUMENT) document: Document,
  ) {
    this.window = document.defaultView!;
  }
}
