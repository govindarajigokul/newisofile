import {
  AsyncPipe,
  NgIf,
} from '@angular/common';
import {
  Component,
  OnInit,
  HostListener,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ThemedLangSwitchComponent } from 'src/app/shared/lang-switch/themed-lang-switch.component';

import { BrowseDefinitionDataService } from '../../../../app/core/browse/browse-definition-data.service';
import { getFirstCompletedRemoteData } from '../../../../app/core/shared/operators';

import { ContextHelpToggleComponent } from '../../../../app/header/context-help-toggle/context-help-toggle.component';
import { HeaderComponent as BaseComponent } from '../../../../app/header/header.component';
import { ThemedNavbarComponent } from '../../../../app/navbar/themed-navbar.component';
import { ThemedSearchNavbarComponent } from '../../../../app/search-navbar/themed-search-navbar.component';
import { ThemedAuthNavMenuComponent } from '../../../../app/shared/auth-nav-menu/themed-auth-nav-menu.component';
import { ImpersonateNavbarComponent } from '../../../../app/shared/impersonate-navbar/impersonate-navbar.component';

/**
 * Represents the header with the logo and simple navigation
 */
@Component({
  selector: 'ds-themed-header',
  styleUrls: ['header.component.scss'],
  templateUrl: 'header.component.html',
  standalone: true,
  imports: [NgbDropdownModule, ThemedLangSwitchComponent, RouterLink, ThemedSearchNavbarComponent, ContextHelpToggleComponent, ThemedAuthNavMenuComponent, ImpersonateNavbarComponent, ThemedNavbarComponent, TranslateModule, AsyncPipe, NgIf],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  public isNavBarCollapsed$: Observable<boolean>;

  // Mobile menu state
  isMobileMenuOpen = false;
  isMobileBrowseOpen = false;

  // Injected services
  private router = inject(Router);
  private browseDefinitionService = inject(BrowseDefinitionDataService);

  ngOnInit() {
    super.ngOnInit();
    this.isNavBarCollapsed$ = this.menuService.isMenuCollapsed(this.menuID);
  }

  /**
   * Toggle mobile menu visibility
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.isMobileBrowseOpen = false; // Also close browse dropdown when main menu closes
  }

  /**
   * Toggle mobile browse dropdown
   */
  toggleMobileBrowseDropdown(): void {
    this.isMobileBrowseOpen = !this.isMobileBrowseOpen;
  }

  /**
   * Close mobile menu when clicking outside
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const hamburgerButton = document.querySelector('.navbar-toggler');

    // Close menu if clicking outside the mobile nav menu and not on the hamburger button
    if (this.isMobileMenuOpen &&
        mobileNavMenu &&
        !mobileNavMenu.contains(target) &&
        hamburgerButton &&
        !hamburgerButton.contains(target)) {
      this.isMobileMenuOpen = false;
    }
  }

  /**
   * Navigate to browse page with fallback to search
   * @param browseType The browse type (author, title, subject, etc.)
   */
  navigateToBrowse(browseType: string): void {
    // First try to check if browse definition exists
    this.browseDefinitionService.findById(browseType).pipe(
      getFirstCompletedRemoteData(),
      take(1)
    ).subscribe(browseDefinitionRD => {
      if (browseDefinitionRD.hasSucceeded && browseDefinitionRD.payload) {
        // Browse definition exists, navigate to browse page
        this.router.navigate(['/browse', browseType]);
      } else {
        // Browse definition doesn't exist, fallback to search with filter
        this.navigateToSearchFallback(browseType);
      }
    });
  }

  /**
   * Fallback navigation to search page with appropriate filter
   * @param browseType The browse type to convert to search filter
   */
  private navigateToSearchFallback(browseType: string): void {
    const filterMap: { [key: string]: string } = {
      'author': 'author',
      'title': 'title',
      'subject': 'subject',
      'language': 'language',
      'media': 'type',
      'linguistictype': 'type'
    };

    const filterField = filterMap[browseType] || browseType;

    // Navigate to search page with filter
    this.router.navigate(['/search'], {
      queryParams: {
        [`f.${filterField}`]: '',
        'view': 'list'
      }
    });
  }
}
