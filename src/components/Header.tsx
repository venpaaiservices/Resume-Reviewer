import { FileText } from "lucide-react";

interface HeaderProps {
  onLogoClick: () => void;
}

export default function Header({ onLogoClick }: HeaderProps) {
  return (
    <header className="glass-panel" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 50, 
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderRadius: 0,
      padding: '1rem 0'
    }}>
      <div className="container flex-between">
        <div 
          className="flex-center" 
          style={{ gap: '0.75rem', cursor: 'pointer' }} 
          onClick={onLogoClick}
        >
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-light), var(--accent-primary))',
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex'
          }}>
            <FileText size={24} color="white" />
          </div>
          <h1 className="h4" style={{ margin: 0, fontWeight: 700 }}>Resume<span className="text-gradient">AI</span></h1>
        </div>
        <nav>
          <button className="btn btn-secondary small" onClick={onLogoClick}>New Analysis</button>
        </nav>
      </div>
    </header>
  );
}
