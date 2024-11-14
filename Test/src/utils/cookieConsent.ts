export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export function getCookieConsent(): CookieConsent | null {
  const consent = localStorage.getItem('cookieConsent');
  return consent ? JSON.parse(consent) : null;
}

export function setCookieConsent(consent: CookieConsent): void {
  localStorage.setItem('cookieConsent', JSON.stringify(consent));
}

export function hasAnalyticsConsent(): boolean {
  const consent = getCookieConsent();
  return consent?.analytics ?? false;
}

export function hasMarketingConsent(): boolean {
  const consent = getCookieConsent();
  return consent?.marketing ?? false;
}

export function initializeAnalytics(): void {
  if (hasAnalyticsConsent()) {
    // Initialize analytics (e.g., Google Analytics)
    // This is where you would add your analytics initialization code
  }
}

export function initializeMarketing(): void {
  if (hasMarketingConsent()) {
    // Initialize marketing cookies/tracking
    // This is where you would add your marketing tracking initialization code
  }
}