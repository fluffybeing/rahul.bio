import { ArticleTags } from 'app/components/tags';
import { getBlogPosts } from 'app/db/blog';
import { formatDate } from 'app/og/utils';
import Link from 'next/link';
import { ReadingTimeComponent } from './components/view-counter';

export const metadata = {
  title: 'RR',
  description: 'Read my thoughts on anything and everything!',
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        read my posts
      </h1>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="flex flex-col text-neutral-900 dark:text-neutral-100 max-w-[540px]">
              <div className="text-wrap:pretty">{post.metadata.title}</div>
              <ArticleTags tags={post.metadata.tags} />
            </div>
            <div className="flex justify-between items-center tracking-tight max-w-[540px]">
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.metadata.publishedAt)}
              </div>
              <div className="text-sm">
                <ReadingTimeComponent content={post.content} />
              </div>
            </div>
          </Link>
        ))}
    </section>
  );
}

