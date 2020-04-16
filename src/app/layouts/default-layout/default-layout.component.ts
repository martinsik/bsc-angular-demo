import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { map, switchMap, filter, startWith, tap } from 'rxjs/operators';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {

  routeData$ = this.router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(undefined),
      switchMap(() => (this.route.firstChild || this.route).data),
    );

  title$ = this.routeData$
    .pipe(
      map(data => data.fetched?.title || data.title),
    );

  hideBack$ = this.routeData$
    .pipe(
      map(data => Boolean(data.hideBack)),
    );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private languageService: LanguageService,
  ) {
  }

  onBack() {
    this.location.back();
  }

  changeLanguage(lang: string) {
    this.languageService.dispatchSetLanguage(lang);
  }
}
