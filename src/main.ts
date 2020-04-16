import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { loadTranslations } from '@angular/localize';
import { getTranslations, ParsedTranslationBundle } from '@locl/core';
import { registerLocaleData } from '@angular/common';

import { environment } from './environments/environment';
import { STORED_LANGUAGE } from './consts';

if (environment.production) {
  enableProdMode();
}

const importRegisterLocaleData = (locale: string) => {
  switch (locale) {
    case 'cs':
      return import('@angular/common/locales/cs');
    case 'en':
    default:
      return import('@angular/common/locales/en');
  }
};

Promise.all([importRegisterLocaleData(STORED_LANGUAGE), getTranslations(`/assets/i18n/${STORED_LANGUAGE}.json`)])
  .then(([localeData, data]: [any, ParsedTranslationBundle]) => {
    loadTranslations(data.translations);
    registerLocaleData(localeData.default);

    import('./app/app.module').then(module => {
      platformBrowserDynamic()
        .bootstrapModule(module.AppModule)
        .catch(err => console.error(err));
    });
  }
);
