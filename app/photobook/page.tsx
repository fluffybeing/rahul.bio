import { Image as ImageType } from 'app/components/gallery';
import { getPhotoPosts } from 'app/db/photos';
import { getViewsCount } from 'app/db/queries';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import ViewCounter from '../components/view-counter';

export const metadata = {
  title: 'photobook',
  description: 'memories beautifully preserved in pixels!',
};

export default function PhotoPage() {
  let allPhotos = getPhotoPosts();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        explore my memories
      </h1>
      {allPhotos
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/photobook/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <div className="prose prose-neutral text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.title}
              </div>
              <div className="text-sm">{post.content}</div>
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-4 my-4">
                {post.images.slice(0, 5).map((image: ImageType) => (
                  <div className="relative h-20">
                    <Image
                      key={image.id}
                      src={image.imageSrc}
                      alt={image.title}
                      fill
                      sizes="(max-width: 768px) 213px, 33vw"
                      priority
                      className="rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
              <Suspense fallback={<p className="h-6" />}>
                <Views slug={post.slug} />
              </Suspense>
            </div>
          </Link>
        ))}
    </section>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();

  return <ViewCounter allViews={views} slug={slug} />;
}
