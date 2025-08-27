import {
  AsyncPipe,
  NgIf,
} from '@angular/common';
import {
  Component,
  OnInit,
  HostListener,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ThemedLangSwitchComponent } from 'src/app/shared/lang-switch/themed-lang-switch.component';

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
}
