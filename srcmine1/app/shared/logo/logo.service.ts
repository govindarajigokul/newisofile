import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';

/**
 * Service to handle logo switching based on current language
 */
@Injectable({
  providedIn: 'root'
})
export class LogoService {

  private readonly logoConfig = {
    'en': {
      src: 'assets/tholkudi-assets/logos/tholkudi-logo-english.png',
      alt: 'Tholkudi Logo English'
    },
    'ta': {
      src: 'assets/tholkudi-assets/logos/tholkudi-logo-tamil.png',
      alt: 'Tholkudi Logo Tamil'
    }
  };

  private readonly defaultLogo = {
    src: 'assets/tholkudi-assets/logos/tholkudi-logo-english.png',
    alt: 'Tholkudi Logo'
  };

  constructor(private translate: TranslateService) {}

  /**
   * Get the current logo based on the active language
   * @returns Observable with logo configuration
   */
  getCurrentLogo(): Observable<{src: string, alt: string}> {
    return this.translate.onLangChange.pipe(
      map(() => this.getLogoForLanguage(this.translate.currentLang))
    );
  }

  /**
   * Get logo for a specific language
   * @param langCode Language code (e.g., 'en', 'ta')
   * @returns Logo configuration object
   */
  getLogoForLanguage(langCode: string): {src: string, alt: string} {
    return this.logoConfig[langCode] || this.defaultLogo;
  }

  /**
   * Get the current logo synchronously
   * @returns Logo configuration object
   */
  getCurrentLogoSync(): {src: string, alt: string} {
    return this.getLogoForLanguage(this.translate.currentLang);
  }

  /**
   * Check if a logo exists for the given language
   * @param langCode Language code
   * @returns boolean indicating if logo exists
   */
  hasLogoForLanguage(langCode: string): boolean {
    return !!this.logoConfig[langCode];
  }

  /**
   * Get all available logo languages
   * @returns Array of language codes that have logos
   */
  getAvailableLogoLanguages(): string[] {
    return Object.keys(this.logoConfig);
  }
}
