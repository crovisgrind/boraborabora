// ========================================
// 4. HERO SECTION PREMIUM
// ========================================

// components/HeroSection.tsx
export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-2)] via-[var(--bg)] to-[var(--bg)]" />

      {/* Animated Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-[var(--smart-blue)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
          <span className="text-gradient">Encontre sua Próxima Corrida</span>
        </h1>

        <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          Descubra eventos de corrida e trilha por todo o Brasil com busca inteligente e filtros avançados.
        </p>

        <button className="px-8 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--smart-blue)] text-white rounded-full font-semibold hover-lift shadow-lg animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          Explorar Eventos →
        </button>
      </div>
    </section>
  );
}