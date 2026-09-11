import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Lightbulb, CheckCircle, RefreshCcw } from "lucide-react";

interface DashboardProps {
  result: any;
  onReset: () => void;
}

export default function Dashboard({ result, onReset }: DashboardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 60) return 'var(--warning)';
    return 'var(--danger)';
  };

  const scoreColor = getScoreColor(result.score);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 className="h2">Analysis Results</h2>
          <p className="p small" style={{ marginTop: '0.5rem' }}>Here is what our AI found in your resume.</p>
        </div>
        <button className="btn btn-secondary" onClick={onReset}>
          <RefreshCcw size={16} /> Analyze Another
        </button>
      </div>

      <div className="grid-cols-3" style={{ marginBottom: '2rem' }}>
        {/* Score Card */}
        <motion.div 
          className="glass-panel"
          style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="h4" style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Overall ATS Score</h3>
          <div style={{
            position: 'relative',
            width: '150px',
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: `radial-gradient(circle, var(--bg-primary) 60%, transparent 61%), conic-gradient(${scoreColor} ${result.score}%, var(--border-main) 0)`
          }}>
            <span style={{ fontSize: '3rem', fontWeight: 800, color: scoreColor }}>{result.score}</span>
          </div>
        </motion.div>

        {/* Summary Card */}
        <motion.div 
          className="glass-panel"
          style={{ padding: '2rem', gridColumn: 'span 2' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <FileText size={20} color="var(--accent-primary)" />
            <h3 className="h4">Executive Summary</h3>
          </div>
          <p className="p" style={{ fontSize: '1.1rem' }}>{result.summary}</p>
        </motion.div>
      </div>

      <div className="grid-cols-2">
        {/* Strengths */}
        <motion.div 
          className="glass-panel"
          style={{ padding: '2rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--success)' }}>
            <TrendingUp size={24} />
            <h3 className="h3">Strengths</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {result.strengths?.map((strength: string, i: number) => (
              <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="var(--success)" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                <span style={{ color: 'var(--text-secondary)' }}>{strength}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Weaknesses */}
        <motion.div 
          className="glass-panel"
          style={{ padding: '2rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--danger)' }}>
            <AlertTriangle size={24} />
            <h3 className="h3">Areas to Improve</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {result.weaknesses?.map((weakness: string, i: number) => (
              <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--danger)', marginTop: '0.6rem', flexShrink: 0 }} />
                <span style={{ color: 'var(--text-secondary)' }}>{weakness}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div 
        className="glass-panel"
        style={{ padding: '2rem', marginTop: '2rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--warning)' }}>
          <Lightbulb size={24} />
          <h3 className="h3">Actionable Recommendations</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {result.recommendations?.map((rec: any, i: number) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-light)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <span style={{ color: 'var(--accent-light)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {rec.category}
              </span>
              <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>{rec.tip}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Just importing FileText for the summary card since it was missing above
import { FileText } from "lucide-react";
