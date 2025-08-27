import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Keep these only if your template uses them:
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-tribal_lg-content',
  templateUrl: './tribal_lg-content.component.html',
  styleUrls: ['./tribal_lg-content.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
})
/** Component displaying the Tribal Languages content */
export class TribalLgContentComponent {}

