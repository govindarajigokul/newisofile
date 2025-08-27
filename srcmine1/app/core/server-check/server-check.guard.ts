import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {
  Observable,
  of,
} from 'rxjs';
import {
  catchError,
  map,
  take,
} from 'rxjs/operators';

import { getPageInternalServerErrorRoute } from '../../app-routing-paths';
import { RootDataService } from '../data/root-data.service';

/**
 * A guard that checks if root api endpoint is reachable.
 * If not redirect to 500 error page
 */
export const ServerCheckGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  rootDataService: RootDataService = inject(RootDataService),
  router: Router = inject(Router),
): Observable<boolean | UrlTree> => {
  // Skip the check for the error page itself to avoid redirect loops
  if (state.url === getPageInternalServerErrorRoute()) {
    return of(true);
  }
  
  return rootDataService.checkServerAvailability().pipe(
    take(1),
    map((isAvailable: boolean) => {
      if (isAvailable) {
        return true;
      } else {
        console.warn('REST API server is not available, redirecting to error page');
        return router.parseUrl(getPageInternalServerErrorRoute());
      }
    }),
    catchError((error) => {
      console.error('Error checking server availability:', error);
      // In case of an error, allow navigation to continue
      // This prevents the app from being completely blocked
      return of(true);
    })
  );
};
