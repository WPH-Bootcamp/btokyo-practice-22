import { getAllSlugs, getPostBySlug } from "./../../../lib/data";

export async function generateStaticParams() {
  // Next.js will prebuild pages for these slugs at build time
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    // In a real app, you might redirect or show not found
    return <p>Post not found.</p>;
  }
  return (
    <main>
      <h2>{post.title}</h2>
      <p>
        <i>Rendered via Static Site Generation (SSG).</i>
      </p>
      <p>{post.body}</p>
    </main>
  );
}
