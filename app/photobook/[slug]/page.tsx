import { increment } from 'app/db/actions';
import { getPhotoPosts } from 'app/db/photos';
import { getViewsCount } from 'app/db/queries';
import { formatDate } from 'app/og/utils';
import { notFound } from 'next/navigation';
import React, { Suspense, cache } from 'react';
import Gallery from '../../components/gallery';
import { ViewCounterComponent } from '../../components/view-counter';

export const metadata = {
  title: 'Photobook',
  description: 'Photo gallery through out years!',
};

export default async function AlbumPage({ params }) {
  const awaitedParams = await params;
  let post = getPhotoPosts().find((post) => post.slug === awaitedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.content}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.publishedAt)}
          </p>
        </Suspense>
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={post.slug} />
        </Suspense>
      </div>
      <div className="my-8 w-full">
        <Gallery images={post.images} />
      </div>
    </section>
  );
}

let incrementViews = cache(increment);

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  incrementViews(slug);
  return <ViewCounterComponent allViews={views} slug={slug} />;
}

