import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Internal pages hero banners with images', () => {
  const cssPath = path.resolve(__dirname, '../client/src/index.css');
  const cssContent = fs.readFileSync(cssPath, 'utf-8');

  const pages = [
    { name: 'ADN', file: 'ADN.tsx', tag: null, title: 'Notre' },
    { name: 'Missions', file: 'Missions.tsx', tag: 'NOTRE ENGAGEMENT', title: 'Nos' },
    { name: 'Expertises', file: 'Expertises.tsx', tag: 'NOS P\u00d4LES', title: 'Nos' },
    { name: 'FabrikRH', file: 'FabrikRH.tsx', tag: 'THINK TANK', title: 'La Fabrik' },
    { name: 'Blog', file: 'Blog.tsx', tag: 'RÉFLEXIONS & INSIGHTS', title: 'Le Blog' },
  ];

  for (const page of pages) {
    describe(`${page.name} page`, () => {
      const pagePath = path.resolve(__dirname, `../client/src/pages/${page.file}`);
      const pageContent = fs.readFileSync(pagePath, 'utf-8');

      it('should have page-hero--img class for image banner', () => {
        expect(pageContent).toContain('page-hero--img');
      });

      it('should have overlay element', () => {
        expect(pageContent).toContain('page-hero__overlay');
      });

      it('should have content wrapper', () => {
        expect(pageContent).toContain('page-hero__content');
      });

      it('should have a tag label', () => {
        if (page.tag !== null) {
          expect(pageContent).toContain('page-hero__tag');
          expect(pageContent).toContain(page.tag);
        } else {
          // Tag pill intentionally removed for this page
          expect(pageContent).toContain('page-hero__content');
        }
      });

      it('should have accent line', () => {
        expect(pageContent).toContain('page-hero__accent');
      });

      it('should use CDN image URL', () => {
        expect(pageContent).toContain('d2xsxph8kpxj0f.cloudfront.net');
        expect(pageContent).toContain('backgroundImage');
      });

      it('should have SiteFooter', () => {
        expect(pageContent).toContain('SiteFooter');
      });

      it('should use pi-section system for branded sections', () => {
        expect(pageContent).toContain('pi-section');
      });

      it('should use pi-tag for section labels', () => {
        expect(pageContent).toContain('pi-tag');
      });

      it('should use pi-title for section headings', () => {
        expect(pageContent).toContain('pi-title');
      });

      it('should have section separator elements', () => {
        expect(pageContent).toContain('section-separator');
        expect(pageContent).toContain('sep-line');
      });

      it('should use cream and dark section backgrounds', () => {
        expect(pageContent).toContain('pi-section--cream');
        expect(pageContent).toContain('pi-section--dark');
      });

      it('should have colored accents (lime or red)', () => {
        const hasLime = pageContent.includes('pi-lime');
        const hasRed = pageContent.includes('pi-red');
        expect(hasLime || hasRed).toBe(true);
      });
    });
  }

  describe('CSS styles for image hero banners', () => {
    it('should have page-hero--img styles', () => {
      expect(cssContent).toContain('.page-hero--img');
      expect(cssContent).toContain('background-size: cover');
    });

    it('should have overlay styles', () => {
      expect(cssContent).toContain('.page-hero__overlay');
      expect(cssContent).toContain('linear-gradient');
    });

    it('should have content wrapper styles', () => {
      expect(cssContent).toContain('.page-hero__content');
      expect(cssContent).toContain('z-index: 2');
    });

    it('should have tag styles with red color', () => {
      expect(cssContent).toContain('.page-hero__tag');
      expect(cssContent).toContain('var(--red)');
    });

    it('should have accent line with gradient', () => {
      expect(cssContent).toContain('.page-hero__accent');
      expect(cssContent).toContain('var(--red)');
    });

    it('should have italic lime styling for em in hero titles', () => {
      expect(cssContent).toContain('.page-hero--img h1 em');
    });

    it('should have responsive styles for hero banners', () => {
      expect(cssContent).toContain('.page-hero--img { min-height: 340px');
      expect(cssContent).toContain('.page-hero--img { min-height: 300px');
      expect(cssContent).toContain('.page-hero__tag { font-size: 11px');
    });
  });

  describe('CSS styles for pi-* design system', () => {
    it('should have pi-section styles with cream and dark variants', () => {
      expect(cssContent).toContain('.pi-section');
      expect(cssContent).toContain('.pi-section--cream');
      expect(cssContent).toContain('.pi-section--dark');
      expect(cssContent).toContain('.pi-section--red');
    });

    it('should have pi-tag styles', () => {
      expect(cssContent).toContain('.pi-tag');
      expect(cssContent).toContain('.pi-red');
    });

    it('should have pi-title styles with Bebas Neue', () => {
      expect(cssContent).toContain('.pi-title');
      expect(cssContent).toContain('.pi-title--white');
    });

    it('should have pi-card styles for dark and cream variants', () => {
      expect(cssContent).toContain('.pi-card--dark');
      expect(cssContent).toContain('.pi-card--cream');
      expect(cssContent).toContain('.pi-card-accent');
    });

    it('should have pi-grid responsive styles', () => {
      expect(cssContent).toContain('.pi-grid--2');
      expect(cssContent).toContain('.pi-grid--3');
    });

    it('should have pi-btn styles', () => {
      expect(cssContent).toContain('.pi-btn');
      expect(cssContent).toContain('.pi-btn--red');
      expect(cssContent).toContain('.pi-btn--white');
    });

    it('should have blog-v2 styles', () => {
      expect(cssContent).toContain('.blog-v2-grid');
      expect(cssContent).toContain('.blog-v2-card');
      expect(cssContent).toContain('.blog-v2-title');
    });

    it('should have responsive media queries for pi-* system', () => {
      expect(cssContent).toContain('PAGES INTERNES V2');
    });
  });
});
