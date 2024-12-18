import { CustomMDX } from 'app/components/mdx';
import { ArticleTags } from 'app/components/tags';
import { getBlogPosts } from 'app/db/blog';
import { formatDate } from 'app/og/utils';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReadingTimeComponent } from '../../components/view-counter';

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
    <div className="my-8 w-full group text-sm rounded-md px-4 py-2 dark:bg-stone-900">
      <div className="flex flex-row items-center space-x-3 text-gray-300">
        <div className="w-20 my-0 text-center font-bold rounded-lg dark:bg-stone-800">
          <span>{point} / 10</span>
        </div>
        <div className="flex flex-col justify-between text-xs">
          <div className="my-1">{writingProgressMap.get(point)}</div>
          <a
            href="https://nickyoder.com/perfectionism/"
            rel="noopener noreferrer"
            target="_blank"
            className="transistion-all underline text-emerald-300 dark:hover:text-neutral-200"
          >
            10-Point article system
          </a>
        </div>
      </div>
    </div>
  );
}

