import { CustomMDX } from 'app/components/mdx';
import { ArticleTags } from 'app/components/tags';
import { getBlogPosts } from 'app/db/blog';
import { formatDate } from 'app/og/utils';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReadingTimeComponent } from '../../components/view-counter';
import TenPointSystem  from '../../components/tenpointsystem';


export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const awaitedParams = await params;

  let post = getBlogPosts().find((post) => post.slug === awaitedParams.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? `https://rahul.bio${image}`
    : `https://rahul.bio/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://rahul.bio/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  const awaitedParams = await params;
  let post = getBlogPosts().find((post) => post.slug === awaitedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://rahul.bio${post.metadata.image}`
              : `https://rahul.bio/og?title=${post.metadata.title}`,
            url: `https://rahul.bio/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Rahul Ranjan',
            },
          }),
        }}
      />
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.metadata.title}
      </h1>
      <ArticleTags tags={post.metadata.tags} />
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </div>
        <ReadingTimeComponent content={post.content} />
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
      <TenPointSystem point={post.metadata.point} />
    </section>
  );
}