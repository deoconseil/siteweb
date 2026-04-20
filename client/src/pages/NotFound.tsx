import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden" style={{ background: '#111' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none select-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(200px, 40vw, 600px)', color: 'rgba(255,255,255,0.03)' }}>
          404
        </div>
      </div>
      <div className="relative z-10 text-center">
        <h1 className="leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(100px, 20vw, 200px)', color: '#fff' }}>404</h1>
        <p className="mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(24px, 4vw, 48px)', color: '#C8102E' }}>PAGE INTROUVABLE</p>
        <p className="max-w-md mx-auto mb-10 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}>
          Cette page n'existe pas ou a été déplacée. Retournez à l'accueil pour découvrir DEO Conseil.
        </p>
        <button
          onClick={() => setLocation("/")}
          className="transition-all duration-300"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, background: '#C8102E', color: '#fff', padding: '14px 40px', border: 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#C8102E'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#C8102E'; e.currentTarget.style.color = '#fff'; }}
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
