import avatar from 'app/avatar.jpg';
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

function ChannelLink({ img, link, name }) {
  return (
    <div className="group flex w-full">
      <a
        href={link}
        target="_blank"
        className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="flex items-center space-x-3">
          <div className="relative h-16">
            <Image
              alt={name}
              src={img}
              height={64}
              width={64}
              sizes="33vw"
              className="h-16 w-16 rounded-full border border-neutral-200 dark:border-neutral-700"
              priority
            />
            <div className="relative -right-10 -top-6 inline-flex h-6 w-6 items-center rounded-full border border-neutral-200 bg-white p-1 dark:border-neutral-700">
              <svg width="15" height="11" role="img" aria-label="YouTube logo">
                <use href="/sprite.svg#youtube" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-medium text-neutral-900 dark:text-neutral-100">
              {name}
            </p>
            <Suspense fallback={<p className="h-6" />}>
              <Subs name={name} />
            </Suspense>
          </div>
        </div>
        <div className="transform text-neutral-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-neutral-300">
          <ArrowIcon />
        </div>
      </a>
    </div>
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
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          A curious guy living in Stockholm who loves to challenge myself in
          every possible way. I highly value honesty and strive to be someone
          people feel safe with, spreading good energy and always being there
          for those around me.
        </p>
        <p>
          I have a diverse range of interests that I indulge in from time to
          time, but currently, I am focusing on these activities: 🏃🏽‍➡️ 🚴🏽 ⛷️ ✍🏽
          📚 📸 🏸. If you share any of these passions, feel free to reach out.
          Perhaps we can enjoy them together 🤝.
        </p>
        <p>
          I take pleasure in sharing ideas, opinions, and learnings,
          continuously refining them along the way, which is why I am here.
          Additionally, I am currently channeling my {` `}
          <Link href="/photobook">photography</Link> skills to capture moments
          and share them on{' '}
          <Link href="https://www.youtube.com/@RR63stream">YouTube </Link>.
        </p>
      </div>
      {/* <div className="flex my-8 mr-4">
        <ChannelLink
          img={avatar}
          name="@RR63"
          link="https://www.youtube.com/@RR63stream"
        />
      </div> */}
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          If you liked what I do and want to say 👋, feel free to
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
