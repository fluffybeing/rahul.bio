import ViewCounter from 'app/components/view-counter';
import { getViewsCount, getYouTubeSubs } from 'app/db/queries';
import { PreloadResources } from 'app/preload';
import { unstable_noStore as noStore } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

function Badge(props) {
  return (
    <a
      {...props}
      target="_blank"
      className="inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
    />
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

async function Subs({ name }: { name: string }) {
  noStore();
  let subscribers;
  if (name === '@RR63stream') {
    subscribers = await getYouTubeSubs();
  }

  return (
    <p className="text-neutral-600 dark:text-neutral-400">
      {subscribers} subscribers
    </p>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} />;
}

export default function Page() {
  return (
    <section>
      <PreloadResources />
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        Hi 👋, I'm Rahul!
      </h1>
      <div className="prose prose-neutral tracking-tighter dark:prose-invert max-w-[600px]">
        <div>
          A curious guy who loves to challenge in every possible way. I highly
          value honesty and strive to be someone people feel safe with,
          spreading good energy and always being there for those around me.
        </div>
        <div>
          I have a diverse range of interests that I indulge in from time to
          time, but currently these activities: 🏃🏽‍➡️ 🚴🏽 ⛷️ ✍🏽 📚 📸 🏸 are
          keeping me up. If you share any of these passions, feel free to reach
          out. Perhaps we can do it together 🤝.
        </div>

        <p>
          I like sharing ideas, opinions, and learnings, continuously refining
          them along the way, which is why I am here. Additionally, I am
          currently channeling my {` `}
          <Link href="/photobook">photography</Link> skills to capture moments
          and share them on{' '}
          <Link href="https://www.youtube.com/@RR63stream">YouTube </Link>.
        </p>
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          If you liked what I do and want to say 👋,
          {` `}
          <Link href="mailto:rahul.rrixe@gmail.com">email</Link> me.
        </p>
      </div>

      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 dark:text-emerald-100">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/fluffybeing"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">twitter</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/fluffybeing/"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">linkedin</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.strava.com/athletes/12576125"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">strava</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
