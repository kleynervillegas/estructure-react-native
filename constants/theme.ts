import { Platform } from 'react-native';

export const Colors: any = {
  light: {
    text: '#333',
    textSecondary: '#666',
    textTertiary: '#999',
    border: '#eee',
    icon: '#007AFF',
    cardShadow: '#000',
  },
  dark: {
    text: '#ffffff',
    textSecondary: '#cccccc',
    textTertiary: '#999999',
    border: '#404040',
    icon: '#66b0ff',
    cardShadow: '#000',
  },
};

export const themeGradients: any = {
  light: {
    primary: ['#667eea', '#764ba2'] as const,
    background: ['#f5f7fa', '#c3cfe2'] as const,
    card: ['#ffffff', '#f8f9fa'] as const,
  },
  dark: {
    primary: ['#1a1a2e', '#16213e'] as const,
    background: ['#0f0c1f', '#1a1b2f'] as const,
    card: ['#2d2d44', '#1e1e30'] as const,
  },
};

export const ColorFontrs: any = {
  light: {
    color: "#000000"
  },
  dark: {
    color: '#FFFFFF',

  }
}
export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
