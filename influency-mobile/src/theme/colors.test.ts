import { colors } from './colors';

describe('Design System - Colors', () => {
  it('should have primary colors defined', () => {
    expect(colors.primary).toBeDefined();
    expect(colors.primary).toBe('#6200EE');
  });

  it('should have secondary colors defined', () => {
    expect(colors.secondary).toBeDefined();
    expect(colors.secondary).toBe('#03DAC6');
  });

  it('should have semantic colors defined', () => {
    expect(colors.success).toBeDefined();
    expect(colors.error).toBeDefined();
    expect(colors.warning).toBeDefined();
    expect(colors.info).toBeDefined();
  });

  it('should have surface colors defined', () => {
    expect(colors.background).toBe('#FFFFFF');
    expect(colors.surface).toBe('#FFFFFF');
  });
});
