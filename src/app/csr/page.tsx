"use client";
import { useEffect, useState } from "react";

type TimePayload = { now: string };

export default function CSRPage() {
  const [data, setData] = useState<TimePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const res = await fetch("/api/time"); // hits our API route
        if (!res.ok) throw new Error("Failed");
        const json = (await res.json()) as TimePayload;
        if (!cancelled) setData(json);
      } catch (e: any) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    const id = setInterval(run, 2000); // refresh every 2s so you can see changes
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <main>
      <h2>CSR: Client‑Side Rendering</h2>
      <p>
        The HTML is sent minimal, then React fetches and hydrates on the client.
      </p>
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
      {data && (
        <p>
          <b>Client fetched time (UTC):</b> {data.now}
        </p>
      )}
    </main>
  );
}
