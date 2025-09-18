// Force this route to be dynamic on every request
export const dynamic = "force-dynamic";

async function getServerTime() {
  // Always computed per-request
  return new Date().toISOString();
}

export default async function SSRPage() {
  const serverTime = await getServerTime();
  return (
    <main>
      <h2>SSR: Server-Side Rendering</h2>
      <p>This page is rendered on the server for every request.</p>
      <p>
        <b>Server time (UTC):</b> {serverTime}
      </p>
      <ul>
        <li>Good for highly dynamic or per-user data (auth/session bound).</li>
        <li>
          Alternative: use <code>fetch(...)</code> to opt-out of caching.
        </li>
      </ul>
    </main>
  );
}
