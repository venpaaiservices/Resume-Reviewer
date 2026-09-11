export default function Hero() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
      <div 
        className="animate-fade-in"
        style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          background: 'var(--success-bg)',
          color: 'var(--success)',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}
      >
        ✨ Powered by Advanced AI
      </div>
      <h2 className="h1 animate-fade-in delay-100" style={{ marginBottom: '1.5rem' }}>
        Get Your Resume <br/>
        <span className="text-gradient">AI-Reviewed</span> in Seconds
      </h2>
      <p className="p animate-fade-in delay-200" style={{ marginBottom: '2.5rem', fontSize: '1.25rem' }}>
        Upload your resume and discover what recruiters see — your score, strengths, weaknesses, ATS readiness, and exactly what to improve.
      </p>
      
      <div className="flex-center animate-fade-in delay-300" style={{ gap: '1rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-secondary)',
          fontSize: '0.875rem'
        }}>
          <span style={{ color: 'var(--accent-primary)' }}>✓</span> PDF
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-secondary)',
          fontSize: '0.875rem'
        }}>
          <span style={{ color: 'var(--accent-primary)' }}>✓</span> DOCX
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-secondary)',
          fontSize: '0.875rem'
        }}>
          <span style={{ color: 'var(--accent-primary)' }}>✓</span> Instant Results
        </div>
      </div>
    </div>
  );
}
