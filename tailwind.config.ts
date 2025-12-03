import type { Config } from "tailwindcss";

const config: Config = {
  // ✅ CORRIGIDO: Apontando para src/ onde estão os componentes
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  // ✅ Dark mode com classe
  darkMode: "class",
  
  theme: {
    extend: {
      // ✅ Cores usando as variáveis CSS
      colors: {
        // Brand colors
        "space-indigo": "var(--space-indigo)",
        "french-blue": "var(--french-blue)",
        "smart-blue": "var(--smart-blue)",
        graphite: "var(--graphite)",
        "white-smoke": "var(--white-smoke)",

        // Semantic
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",

        // Surfaces
        bg: "var(--bg)",
        "surface-1": "var(--surface-1)",
        "surface-2": "var(--surface-2)",
        "surface-3": "var(--surface-3)",

        // Text
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",

        // Borders
        border: "var(--border)",
        "border-light": "var(--border-light)",
      },

      // ✅ Gradientes
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-subtle": "var(--gradient-subtle)",
        "gradient-dark": "var(--gradient-dark)",
      },

      // ✅ Shadows customizadas
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        glass: "var(--shadow-glass)",
      },

      // ✅ Spacing customizado
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
      },

      // ✅ Border radius customizado
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full: "var(--radius-full)",
      },

      // ✅ Transições customizadas
      transitionDuration: {
        fast: "var(--transition-fast)",
        base: "var(--transition-base)",
        slow: "var(--transition-slow)",
      },

      // ✅ Z-index customizado
      zIndex: {
        dropdown: "var(--z-dropdown)",
        sticky: "var(--z-sticky)",
        fixed: "var(--z-fixed)",
        "modal-backdrop": "var(--z-modal-backdrop)",
        modal: "var(--z-modal)",
        popover: "var(--z-popover)",
        tooltip: "var(--z-tooltip)",
      },

      // ✅ Animações customizadas
      animation: {
        "fade-in": "fadeIn var(--transition-slow) ease-out",
        "fade-in-up": "fadeInUp var(--transition-slow) ease-out",
        "fade-in-down": "fadeInDown var(--transition-slow) ease-out",
        "slide-in-right": "slideInFromRight var(--transition-slow) ease-out",
        "slide-in-left": "slideInFromLeft var(--transition-slow) ease-out",
        "scale-in": "scaleIn var(--transition-base) ease-out",
        shimmer: "shimmer 2s infinite",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        "spin-slow": "spin-slow 3s linear infinite",
      },

      // ✅ Keyframes
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          from: { opacity: "0", transform: "translateY(-16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInFromRight: {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInFromLeft: {
          from: { opacity: "0", transform: "translateX(-24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { "background-position": "-1000px 0" },
          "100%": { "background-position": "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": {
            "box-shadow": "0 0 5px rgba(39, 70, 144, 0.1), var(--shadow-md)",
          },
          "50%": {
            "box-shadow": "0 0 20px rgba(39, 70, 144, 0.3), var(--shadow-lg)",
          },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },

  plugins: [],
};

export default config;