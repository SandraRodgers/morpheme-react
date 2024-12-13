/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // for playground components
    "../src/**/*.{js,jsx,ts,tsx}", // for library components
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: {
          DEFAULT: 'var(--color-text)',
          secondary: 'var(--color-text-secondary)',
        },
        border: 'var(--color-border)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }], // Small text
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // Small-medium text
        base: ['1rem', { lineHeight: '1.5rem' }], // Default size
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // Large text
        xl: ['1.25rem', { lineHeight: '1.75rem' }], // Extra-large text
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
      boxShadow: {
        small: '0 1px 2px rgba(0, 0, 0, 0.2)',
        medium: '0 4px 6px rgba(0, 0, 0, 0.3)',
        large: '0 10px 15px rgba(0, 0, 0, 0.4)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      transitionTimingFunction: {
        in: 'ease-in',
        out: 'ease-out',
        inOut: 'ease-in-out',
      },
    },
  },
  plugins: [
    plugin(function({ addBase }) {
      addBase({
        ':root': {
          '--color-primary': '#4F46E5',
          '--color-secondary': '#7C3AED',
          '--color-background': '#FFFFFF',
          '--color-surface': '#F8F8F8',
          '--color-text': '#1A1A1F',
          '--color-text-secondary': '#666666',
          '--color-border': '#E1E1E5',
          '--color-success': '#12B76A',
          '--color-warning': '#FEC84B',
          '--color-error': '#F04438',
        },
        '[data-theme="dark"]': {
          '--color-primary': '#13EF93',
          '--color-secondary': '#EE028C',
          '--color-background': '#0B0B0C',
          '--color-surface': '#1A1A1F',
          '--color-text': '#E1E1E5',
          '--color-text-secondary': '#949498',
          '--color-border': '#2C2C33',
          '--color-success': '#12B76A',
          '--color-warning': '#FEC84B',
          '--color-error': '#F04438',
        },
        '[data-theme="cyberpunk"]': {
          '--color-primary': '#FF00FF',
          '--color-secondary': '#00FFFF',
          '--color-background': '#120458',
          '--color-surface': '#1A1150',
          '--color-text': '#FFE600',
          '--color-text-secondary': '#FF9EDB',
          '--color-border': '#FF00FF',
          '--color-success': '#00FF9F',
          '--color-warning': '#FFE600',
          '--color-error': '#FF0000',
        },
      })
    })
  ],
};
