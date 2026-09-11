import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileSearch, Sparkles, CheckCircle2, Loader2 } from "lucide-react";

const steps = [
  { id: 1, text: "Validating document...", icon: FileSearch },
  { id: 2, text: "Extracting resume structure...", icon: CheckCircle2 },
  { id: 3, text: "Running AI analysis...", icon: Sparkles },
];

export default function Processing() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Simulate progression for visual feedback while backend is working
    const timer1 = setTimeout(() => setCurrentStep(1), 1500);
    const timer2 = setTimeout(() => setCurrentStep(2), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex-center animate-fade-in" style={{ flexDirection: 'column', height: '100%', minHeight: '60vh' }}>
      <motion.div 
        className="glass-panel"
        style={{ 
          padding: '3rem', 
          maxWidth: '500px', 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            position: 'relative',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--accent-primary)',
              filter: 'blur(20px)',
              opacity: 0.5,
              borderRadius: '50%'
            }}></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <div style={{
                background: 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))',
                padding: '1.5rem',
                borderRadius: '50%',
                border: '1px solid var(--border-focus)'
              }}>
                <Loader2 size={40} color="var(--accent-light)" className="animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </motion.div>
          </div>
          <h2 className="h3">Analyzing Resume</h2>
          <p className="p small" style={{ marginTop: '0.5rem' }}>This usually takes 5-10 seconds</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const Icon = step.icon;

            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isCompleted || isActive ? 1 : 0.4, x: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: isActive ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                  border: isActive ? '1px solid var(--border-focus)' : '1px solid transparent',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  display: 'flex',
                  color: isCompleted ? 'var(--success)' : isActive ? 'var(--accent-light)' : 'var(--text-tertiary)'
                }}>
                  {isCompleted ? <CheckCircle2 size={24} /> : isActive ? <Loader2 size={24} className="animate-spin" /> : <Icon size={24} />}
                </div>
                <span style={{ 
                  fontWeight: isActive ? 600 : 400,
                  color: isActive || isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)'
                }}>
                  {step.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
