import { Dimensions, Platform } from 'react-native';
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

const { width } = Dimensions.get('window');

export const styleGlobal = {
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  card: {
    width: (width - 36) / 2,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 12,
    borderColor: '#00F2FF',
    shadowColor: '#00F2FF',
    shadowOpacity: 0.8
  },
  protectionCard: {
    width: (width - 48) / 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderColor: 'transparent',
  },

  BtnPrimary: {
        backgroundColor: 'rgba(0,0,0,0.5)',

    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  nextButtonText: {
    marginRight: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
   BtnSecundary: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },

}