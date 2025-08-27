import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ds-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeroBannerComponent implements OnInit, OnDestroy {
  
  // Tamil desktop hero banner images
  tamilDesktopHeroImages = [
    'assets/images/hero-banners/HERO BANNER FOR THOLKUDI - final version TAMIL.jpg',
    'assets/images/hero-banners/HERO BANNER FOR THOLKUDI - final version TAMIL2.jpg',
    'assets/images/hero-banners/HERO BANNER FOR THOLKUDI - final version TAMIL3.jpg',
    'assets/images/hero-banners/HERO BANNER FOR THOLKUDI - final version TAMIL4.jpg',
    'assets/images/hero-banners/HERO BANNER FOR THOLKUDI - final version TAMIL5.jpg'
  ];

  // English/Generic desktop hero banner images
  englishDesktopHeroImages = [
    'assets/images/hero-banners/hero-banner-01.jpg',
    'assets/images/hero-banners/hero-banner-02.jpg',
    'assets/images/hero-banners/hero-banner-03.jpg'
  ];

  // Mobile hero banner images (same for all languages)
  mobileHeroImages = [
    'assets/images/hero-banners/mobile-hero-banner-1.jpg',
    'assets/images/hero-banners/mobile-hero-banner-2.jpg',
    'assets/images/hero-banners/mobile-hero-banner-3.jpg',
    'assets/images/hero-banners/mobile-hero-banner-4.jpg',
    'assets/images/hero-banners/mobile-hero-banner-5.jpg'
  ];

  desktopHeroImages: string[] = [];
  currentSlide = 0;
  autoSlideInterval: any;
  autoSlideDelay = 7000; // 7 seconds
  isMobile = false;
  langChangeSubscription: Subscription;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.setHeroImagesForLanguage(this.translate.currentLang);
    this.startAutoSlide();
    
    // Subscribe to language changes
    this.langChangeSubscription = this.translate.onLangChange.subscribe(event => {
      this.setHeroImagesForLanguage(event.lang);
      this.currentSlide = 0; // Reset to first slide on language change
    });
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  /**
   * Set hero images based on current language
   */
  setHeroImagesForLanguage(lang: string): void {
    if (lang === 'ta') {
      this.desktopHeroImages = this.tamilDesktopHeroImages;
    } else {
      // Default to English/generic banners for any other language
      this.desktopHeroImages = this.englishDesktopHeroImages;
    }
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
   * Get current hero images based on screen size
   */
  get heroImages(): string[] {
    return this.isMobile ? this.mobileHeroImages : this.desktopHeroImages;
  }

  /**
   * Check screen size and set mobile flag
   */
  @HostListener('window:resize', ['$event'])
  checkScreenSize(): void {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth <= 768;
      // Reset current slide when switching between mobile/desktop
      this.currentSlide = 0;
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