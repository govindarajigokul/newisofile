import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ds-tribal-languages',
  templateUrl: './tribal-languages.component.html',
  styleUrls: ['./tribal-languages.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
/**
 * Component displaying the Tribal Languages page
 */
export class TribalLanguagesComponent {
  currentDate = new Date();
}