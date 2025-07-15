'use client';

import EffectsInitializer from "../components/EffectsInitializer";

export default function RegistrationPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 0' }}>
      <EffectsInitializer />
      <div style={{
        width: '100%',
        maxWidth: 600,
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12,
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        padding: 32,
        margin: '0 16px',
        color: 'white',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: 'white', textAlign: 'center', marginBottom: 16, textShadow: '0 4px 12px rgb(255 255 255 / 20%)' }}>Join The Mission</h2>
        <p style={{ fontSize: 20, color: '#e0e0e0', textAlign: 'center', marginBottom: 32, textShadow: '0 2px 8px rgb(255 255 255 / 15%)' }}>
          Ready to contribute to space exploration and Earth science? Register now for NASA Space Apps Challenge 2025 Lucknow Edition. Limited spots available.
        </p>
        <iframe
          src="https://tally.so/r/your-tally-form-id"
          width="100%"
          height="700"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Registration Form"
          style={{ background: 'rgba(0,0,0,0.1)', borderRadius: 8, width: '100%', minHeight: 700, border: 'none' }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
