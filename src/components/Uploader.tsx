import { useState, useRef, useCallback } from "react";
import { UploadCloud, File, AlertCircle, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploaderProps {
  onUpload: (file: File) => void;
  error?: string | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function Uploader({ onUpload, error: externalError }: UploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(externalError || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (selectedFile: File): boolean => {
    setError(null);
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Unsupported file format. Please upload a PDF or DOCX.");
      return false;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File is too large. Maximum size is 5MB.");
      return false;
    }
    return true;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const displayError = error || externalError;

  return (
    <div className="animate-fade-in delay-200" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf,.docx"
        style={{ display: 'none' }}
      />
      
      <motion.div 
        className="glass-panel"
        style={{ 
          padding: '3rem 2rem', 
          textAlign: 'center',
          cursor: file ? 'default' : 'pointer',
          border: isDragging ? '2px dashed var(--accent-primary)' : '1px solid var(--border-main)',
          background: isDragging ? 'rgba(139, 92, 246, 0.05)' : 'rgba(255, 255, 255, 0.02)',
          transition: 'all var(--transition-fast)'
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
        whileHover={!file ? { scale: 1.01 } : {}}
      >
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-center"
              style={{ flexDirection: 'column', gap: '1rem' }}
            >
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1rem',
                borderRadius: '50%',
                display: 'flex'
              }}>
                <UploadCloud size={40} color="var(--accent-primary)" />
              </div>
              <div>
                <h3 className="h4" style={{ marginBottom: '0.5rem' }}>Click or drag and drop</h3>
                <p className="small">Supported formats: PDF, DOCX (Max 5MB)</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="file"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <File size={24} color="var(--accent-primary)" />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.25rem', wordBreak: 'break-all', maxWidth: '300px' }}>
                    {file.name}
                  </p>
                  <p className="small">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button className="btn-icon" onClick={clearFile} title="Remove file">
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {displayError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            background: 'var(--danger-bg)', 
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--danger)',
            fontSize: '0.875rem'
          }}
        >
          <AlertCircle size={18} />
          {displayError}
        </motion.div>
      )}

      {file && !displayError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}
        >
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', maxWidth: '300px' }}
            onClick={() => onUpload(file)}
          >
            Review My Resume
            <CheckCircle2 size={18} />
          </button>
        </motion.div>
      )}
    </div>
  );
}
