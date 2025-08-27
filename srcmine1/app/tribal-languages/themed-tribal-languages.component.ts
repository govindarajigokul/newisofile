import { Component } from '@angular/core';
import { ThemedComponent } from '../shared/theme-support/themed.component';
import { TribalLanguagesComponent } from './tribal-languages.component';

/**
 * Themed wrapper for TribalLanguagesComponent
 */
@Component({
  selector: 'ds-themed-tribal-languages',
  styleUrls: [],
  templateUrl: '../shared/theme-support/themed.component.html',
  standalone: true,
  imports: [TribalLanguagesComponent],
})
export class ThemedTribalLanguagesComponent extends ThemedComponent<TribalLanguagesComponent> {
  protected inAndOutputNames: (keyof TribalLanguagesComponent & keyof this)[] = [];

  protected getComponentName(): string {
    return 'TribalLanguagesComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../themes/${themeName}/app/tribal-languages/tribal-languages.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import('./tribal-languages.component');
  }
}