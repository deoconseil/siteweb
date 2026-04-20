import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Homepage structure', () => {
  const homePath = path.resolve(__dirname, '../client/src/pages/Home.tsx');
  const cssPath = path.resolve(__dirname, '../client/src/index.css');
  const homeContent = fs.readFileSync(homePath, 'utf-8');
  const cssContent = fs.readFileSync(cssPath, 'utf-8');

  it('should contain missions-v2 section with correct structure', () => {
    expect(homeContent).toContain('missions-v2-hero');
    expect(homeContent).toContain('missions-v2-list');
    // Batch 20: replaced mission-v2-card list with pi-card--dark grid (6 cards)
    expect(homeContent).toContain('pi-card--dark');
    expect(homeContent).toContain('NOS');
    expect(homeContent).toContain('MISSIONS.');
  });

  it('should contain services-v2 section with correct structure', () => {
    expect(homeContent).toContain('services-v2');
    // Batch 33: replaced services-v2-grid with pi-card--light grid (same 4 poles)
    expect(homeContent).toContain('pi-card--light');
    expect(homeContent).toContain('pi-card--link');
    expect(homeContent).toContain('pi-grid--2');
  });

  it('should have 6 mission cards rendered via .map in missions-v2-list', () => {
    // Batch 20: 6 missions rendered via .map(). The JSX template appears once in source.
    // Verify the 6 mission titles are all present.
    expect(homeContent).toContain('Connecter les dirigeants aux enjeux du monde');
    expect(homeContent).toContain('Aligner le top management sur la vision');
    expect(homeContent).toContain('Cr\u00e9er un r\u00e9f\u00e9rentiel commun');
    expect(homeContent).toContain('Adapter la strat\u00e9gie pour anticiper les mutations');
    expect(homeContent).toContain('Mettre le capital humain au c\u0153ur de la strat\u00e9gie');
    expect(homeContent).toContain('Int\u00e9grer le digital comme levier de transformation');
  });

  it('should have 4 service cards for the 4 expertise poles', () => {
    // Batch 33: poles data now imported from Expertises.tsx via `import { poles }`
    // The titles are no longer hardcoded in Home.tsx but come from poles[]
    // Verify the import and the pi-card--light structure are present
    expect(homeContent).toContain("import { poles } from \"./Expertises\"");
    expect(homeContent).toContain('pi-card--light');
    expect(homeContent).toContain('pole.title');
    expect(homeContent).toContain('pole.description');
    expect(homeContent).toContain('pole.services');
  });

  it('should have jamal-v3 before missions-v2 (articles removed)', () => {
    const jamalIdx = homeContent.indexOf('jamal-v3');
    const missionsIdx = homeContent.indexOf('missions-v2');
    expect(jamalIdx).toBeGreaterThan(-1);
    expect(jamalIdx).toBeLessThan(missionsIdx);
    expect(homeContent).not.toContain('articles-section');
  });

  it('should have jamal-v3 section with premium editorial layout', () => {
    expect(homeContent).toContain('jamal-v3');
    expect(homeContent).toContain('jv3-inner');
    expect(homeContent).toContain('jv3-hero-row');
    expect(homeContent).toContain('jv3-hero-left');
    expect(homeContent).toContain('jv3-hero-right');
    expect(homeContent).toContain('jv3-title');
    expect(homeContent).toContain('jv3-photo');
    expect(homeContent).toContain('jv3-pullquote');
    expect(homeContent).toContain('jv3-editorial');
    expect(homeContent).toContain('ENSEMBLE,');
    expect(homeContent).toContain('CapSkills');
    expect(homeContent).toContain('jamal_nobg_new_8b52a9a9');
  });

  it('should have CSS styles for jamal-v3', () => {
    expect(cssContent).toContain('.jamal-v3');
    expect(cssContent).toContain('.jv3-inner');
    expect(cssContent).toContain('.jv3-title');
    expect(cssContent).toContain('.jv3-photo');
    expect(cssContent).toContain('.jv3-pullquote');
    expect(cssContent).toContain('.jv3-editorial');
  });

  it('should have CSS styles for missions-v2', () => {
    expect(cssContent).toContain('.missions-v2-hero');
    expect(cssContent).toContain('.missions-v2-list');
    expect(cssContent).toContain('.mission-v2-card');
    expect(cssContent).toContain('.mission-v2-card:hover');
  });

  it('should have CSS styles for services-v2', () => {
    expect(cssContent).toContain('.services-v2');
    expect(cssContent).toContain('.services-v2-grid');
    expect(cssContent).toContain('.service-v2-card');
    expect(cssContent).toContain('.service-v2-card:hover');
  });

  it('should have responsive CSS for missions-v2 and services-v2', () => {
    expect(cssContent).toContain('MISSIONS V2 RESPONSIVE');
    expect(cssContent).toContain('SERVICES V2 RESPONSIVE');
  });

  it('should have responsive CSS for jamal-v3', () => {
    expect(cssContent).toContain('JAMAL V3 RESPONSIVE');
  });

  it('should use "Parlons-en" instead of "Prendre rendez-vous" or "Prendre RDV"', () => {
    expect(homeContent).not.toContain('Prendre rendez-vous');
    expect(homeContent).not.toContain('Prendre RDV');
    expect(homeContent).toContain('Parlons-en');
  });

  it('should have section separators between major sections', () => {
    expect(homeContent).toContain('section-separator');
    expect(homeContent).toContain('sep-line');
    expect(cssContent).toContain('.section-separator');
    expect(cssContent).toContain('.sep-line');
  });

  it('should have dark background for jamal-v3 section', () => {
    // Jamal V3 uses dark background (#111)
    expect(cssContent).toContain('.jamal-v3');
    const jamalSection = cssContent.substring(cssContent.indexOf('.jamal-v3 {'));
    expect(jamalSection).toContain('#111');
  });

});
