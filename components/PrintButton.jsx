'use client';
export default function PrintButton({ label }) {
  return <button onClick={() => window.print()} className="btn no-print">{label}</button>;
}
