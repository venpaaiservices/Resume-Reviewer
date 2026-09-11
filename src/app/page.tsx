"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Uploader from "@/components/Uploader";
import Processing from "@/components/Processing";
import Dashboard from "@/components/Dashboard";

export type AppState = "landing" | "processing" | "results";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = async (file: File) => {
    setAppState("processing");
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze resume");
      }

      const data = await response.json();
      setAnalysisResult(data);
      setAppState("results");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setAppState("landing"); // Revert to landing so they can try again
    }
  };

  const resetApp = () => {
    setAppState("landing");
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div style={{ width: "100%" }}>
      <Header onLogoClick={resetApp} />
      
      <main className="container" style={{ padding: "4rem 1.5rem", minHeight: "calc(100vh - 80px)" }}>
        {appState === "landing" && (
          <div className="animate-fade-in">
            <Hero />
            <Uploader onUpload={handleUploadComplete} error={error} />
          </div>
        )}

        {appState === "processing" && (
          <Processing />
        )}

        {appState === "results" && analysisResult && (
          <Dashboard result={analysisResult} onReset={resetApp} />
        )}
      </main>
    </div>
  );
}
