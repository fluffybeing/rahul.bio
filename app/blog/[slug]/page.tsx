import { CustomMDX } from 'app/components/mdx';
import { ArticleTags } from 'app/components/tags';
import { increment } from 'app/db/actions';
import { getBlogPosts } from 'app/db/blog';
import { getViewsCount } from 'app/db/queries';
import { formatDate } from 'app/og/utils';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense, cache } from 'react';
import ViewCounter from '../../components/view-counter';

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
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

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

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
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </Suspense>
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={post.slug} />
        </Suspense>
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
      <TenPointSystem point={post.metadata.point} />
    </section>
  );
}

let incrementViews = cache(increment);

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  incrementViews(slug);
  return <ViewCounter allViews={views} slug={slug} />;
}

function TenPointSystem({ point }: { point: string }) {
  const writingProgressMap = new Map<string, string>([
    ['0', 'TITLE ONLY'],
    ['1', 'TITLE AND NOTE TO SELF'],
    ['2', 'SUMMARY OF ROUGH THOUGHTS'],
    ['3', 'HALF-WRITTEN PARAGRAPHS / UNFINISHED ORDERING'],
    ['4', 'ALL THE KEY POINTS (POORLY WRITTEN)'],
    ['5', "HALF DECENT BUT IN THE 'VALLEY-OF-DESPAIR'"],
    ['6', 'ROUGH DRAFT IN NEED OF EDITING'],
    ['7', 'I COULD STOP HERE WITH ONLY MILD EMBARRASSMENT'],
    ['8', 'THIS COULD PASS AS A COMPLETE THOUGHT'],
    ['9', 'ALMOST THERE! NEEDS FEEDBACK AND TIME'],
    ['10', 'COMPLETE THOUGHT'],
  ]);

  return (
    <div className="my-8 w-full group text-sm rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="flex flex-col justify-between">
        <div className="flex flex-row items-center space-x-3 text-white">
          <div className="w-20 my-2 text-center font-bold rounded-lg border-opacity-40 dark:bg-neutral-600">
            <span>{point} / 10</span>
          </div>
          <div className="my-2">{writingProgressMap.get(point)}</div>
        </div>
        <a
          href="https://nickyoder.com/perfectionism/"
          rel="noopener noreferrer"
          target="_blank"
          className="transistion-all dark:hover:text-neutral-200"
        >
          10-Point article system
        </a>
      </div>
    </div>
  );
}
