// Pretend these come from a CMS/DB
export type Post = { slug: string; title: string; body: string };

export const STATIC_POSTS: Post[] = [
  {
    slug: "hello-next",
    title: "Hello Next.js SSG",
    body: "This page is statically generated.",
  },
  {
    slug: "edge-cases",
    title: "Edge Cases in SSG",
    body: "Another statically generated page.",
  },
];

export async function getAllSlugs(): Promise<string[]> {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 50));
  return STATIC_POSTS.map((p) => p.slug);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  await new Promise((r) => setTimeout(r, 50));
  return STATIC_POSTS.find((p) => p.slug === slug) ?? null;
}
