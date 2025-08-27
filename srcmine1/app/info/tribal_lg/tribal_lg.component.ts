import { Component } from '@angular/core';
import { TribalLgContentComponent } from '../tribal_lg/tribal_lg-content/tribal_lg-content.component';

@Component({
  selector: 'ds-base-tribal-lg',
  templateUrl: './tribal_lg.component.html',
  styleUrls: ['./tribal_lg.component.scss'],
  standalone: true,
  imports: [TribalLgContentComponent], // or another content component if needed
})
/**
 * Component displaying the Tribal Languages page
 */
export class TribalLgComponent { }
