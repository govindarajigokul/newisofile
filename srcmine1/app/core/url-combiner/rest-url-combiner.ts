import { environment } from '../../../environments/environment';
import { URLCombiner } from './url-combiner';

/**
 * Combines a variable number of strings representing parts
 * of a relative REST URL in to a single, absolute REST URL
 *
 * TODO write tests once GlobalConfig becomes injectable
 */
export class RESTURLCombiner extends URLCombiner {
  constructor(...parts: string[]) {
    // Provide a fallback URL if environment.rest is not yet initialized (using demo server)
    const baseUrl = environment.rest?.baseUrl || 'https://demo.dspace.org/server';
    super(baseUrl, '/api', ...parts);
  }
}
