import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ds-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeroBannerComponent implements OnInit, OnDestroy {
  
  // Tamil hero banner images
  heroImages = [
    'assets/images/hero-banners/HERO BANNER FOR THOLKUDI - final version TAMIL.jpg',
    'assets/images/hero-banners/HERO BANNER FOR THOLKUDI - final version TAMIL2.jpg',
    'assets/images/hero-banners/HERO BANNER FOR THOLKUDI - final version TAMIL3.jpg',
    'assets/images/hero-banners/HERO BANNER FOR THOLKUDI - final version TAMIL4.jpg',
    'assets/images/hero-banners/HERO BANNER FOR THOLKUDI - final version TAMIL5.jpg'
  ];

  currentSlide = 0;
  autoSlideInterval: any;
  autoSlideDelay = 7000; // 7 seconds

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  /**
   * Start automatic sliding
   */
  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  /**
   * Stop automatic sliding
   */
  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  /**
   * Go to next slide
   */
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.heroImages.length;
  }

  /**
   * Go to previous slide
   */
  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.heroImages.length - 1 : this.currentSlide - 1;
  }

  /**
   * Go to specific slide
   */
  goToSlide(index: number): void {
    this.currentSlide = index;
    // Restart auto-slide timer when manually navigating
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  /**
   * Pause auto-slide on hover
   */
  onMouseEnter(): void {
    this.stopAutoSlide();
  }

  /**
   * Resume auto-slide when mouse leaves
   */
  onMouseLeave(): void {
    this.startAutoSlide();
  }
}
