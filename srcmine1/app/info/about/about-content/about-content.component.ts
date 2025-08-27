import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ds-about-content',
  templateUrl: './about-content.component.html',
  styleUrls: ['./about-content.component.scss'],
  standalone: true,
  imports: [RouterLink, TranslateModule, DatePipe],
})
/**
 * Component displaying the contents of the About Statement
 */
export class AboutContentComponent {
  currentDate = new Date();
}
