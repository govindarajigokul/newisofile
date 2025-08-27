import {
  AsyncPipe,
  NgClass,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { take } from 'rxjs/operators';

import { BrowseDefinitionDataService } from '../../../../app/core/browse/browse-definition-data.service';
import { getFirstCompletedRemoteData } from '../../../../app/core/shared/operators';
import { HomePageComponent as BaseComponent } from '../../../../app/home-page/home-page.component';
import { ThemedConfigurationSearchPageComponent } from '../../../../app/search-page/themed-configuration-search-page.component';
import { PageWithSidebarComponent } from '../../../../app/shared/sidebar/page-with-sidebar.component';
import { ViewTrackerComponent } from '../../../../app/statistics/angulartics/dspace/view-tracker.component';
import { SuggestionsPopupComponent } from '../../../../app/notifications/suggestions-popup/suggestions-popup.component';
import { HomeCoarComponent } from '../../../../app/home-page/home-coar/home-coar.component';
import { ThemedHomeNewsComponent } from '../../../../app/home-page/home-news/themed-home-news.component';
import { RecentItemListComponent } from '../../../../app/home-page/recent-item-list/recent-item-list.component';
import { HeroBannerComponent } from '../hero-banner/hero-banner.component';
import { SearchFormComponent } from '../shared/search-form/search-form.component';
import { TopLevelCommunityListComponent } from './top-level-community-list/top-level-community-list.component';

@Component({
  selector: 'ds-themed-home-page',
  styleUrls: ['./home-page.component.scss'],
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [
    HeroBannerComponent,
    ThemedHomeNewsComponent,
    NgTemplateOutlet,
    NgIf,
    ViewTrackerComponent,
    SearchFormComponent,
    TopLevelCommunityListComponent,
    RecentItemListComponent,
    AsyncPipe,
    TranslateModule,
    NgClass,
    SuggestionsPopupComponent,
    ThemedConfigurationSearchPageComponent,
    PageWithSidebarComponent,
    HomeCoarComponent
  ],
})
export class HomePageComponent extends BaseComponent {
  private router = inject(Router);
  private browseDefinitionService = inject(BrowseDefinitionDataService);

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
