import { createAction, props } from '@ngrx/store';

export const setCurrentLanguage = createAction(
  '[Current Language] Set',
  props<{ language: string }>()
);
