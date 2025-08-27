import { Component } from '@angular/core';
import { ThemedComponent } from '../../shared/theme-support/themed.component';
import { TribalLgComponent } from './tribal_lg.component';

/**
 * Themed wrapper for TribalLgComponent
 */
@Component({
  selector: 'ds-tribal-lg',
  styleUrls: [],
  templateUrl: '../../shared/theme-support/themed.component.html',
  standalone: true,
  imports: [TribalLgComponent],
})
export class ThemedTribalLgComponent extends ThemedComponent<TribalLgComponent> {
  protected getComponentName(): string {
    return 'TribalLgComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    // Adjust path if your themed file lives elsewhere:
    return import(`../../../themes/${themeName}/app/info/tribal_lg/tribal_lg.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import('./tribal_lg.component');
  }
}

