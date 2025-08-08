    declare global {
      interface Window {
        fbq: (...args: any[]) => void; // Or more specific type if known
      }
    }
export const event = (eventName: string, params: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  } else {
    console.warn('Facebook Pixel is not initialized or unavailable.');
  }
};
