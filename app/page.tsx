import avatar from 'app/avatar.jpg';
import ViewCounter from 'app/components/view-counter';
import { getViewsCount, getYouTubeSubs } from 'app/db/queries';
import { PreloadResources } from 'app/preload';
import { unstable_noStore as noStore } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import ios from 'public/images/home/iOS.jpg';
import maggie from 'public/images/home/maggie.jpg';
import motorbike from 'public/images/home/motorbike.jpg';
import running from 'public/images/home/running.jpg';
import skiing from 'public/images/home/skiing.jpg';
import skydiving from 'public/images/home/skydiving.jpg';
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
  if (name === '@fluffystream') {
    subscribers = await getYouTubeSubs();
  }

  return (
    <p className="text-neutral-600 dark:text-neutral-400">
      {subscribers} subscribers
    </p>
  );
}

function BlogLink({ slug, name }) {
  return (
    <div className="group">
      <a
        href={`/blog/${slug}`}
        className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="flex flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          <Suspense fallback={<p className="h-6" />}>
            <Views slug={slug} />
          </Suspense>
        </div>
        <div className="transform text-neutral-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-neutral-300">
          <ArrowIcon />
        </div>
      </a>
    </div>
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
      <h1 className="mb-8 text-2xl font-medium tracking-tighter">
        hej, I'm Rahul 👋
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          {`I'm an iOS engineer based in Stockholm; where I `}
          <Link href="/work">work</Link>
          {` at `}
          <span className="not-prose"></span>
          <Badge href="https://www.flir.eu/">
            <svg
              width="15"
              height="15"
              role="img"
              aria-label="React logo"
              className="!mr-1"
            >
              <use href="/sprite.svg#flir" />
            </svg>
            {`FLIR.`}
          </Badge>
          {` `}Over the course of several years, I've explored various facets of
          life, embracing new interests while letting others fade away. This
          journey has been a profound opportunity for self-discovery and
          personal growth, for which I am deeply grateful.
        </p>
        <p>Currently I enjoy: 🏃🏽‍➡️ 🚴🏽 ⛷️ ✍🏽 📚 📸 🏸.</p>
      </div>
      <div className="grid grid-cols-2 grid-rows-4 sm:grid-rows-3 sm:grid-cols-3 gap-4 my-8">
        <div className="relative h-40">
          <Image
            alt="me trying to build the apps"
            src={ios}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative sm:row-span-2 row-span-1">
          <Image
            alt="Me trying to pose on my motorbike"
            src={motorbike}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-top sm:object-center"
          />
        </div>
        <div className="relative">
          <Image
            alt="Me trying to learn to learn how to ski"
            src={skiing}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative row-span-2">
          <Image
            alt="Picture of Portugal beach"
            src={skydiving}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover sm:object-center"
          />
        </div>
        <div className="relative row-span-2">
          <Image
            alt="My cutest partner in all crimes"
            src={maggie}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-40">
          <Image
            alt="running near the beach"
            src={running}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          At this juncture, I aim to share my ideas, opinions, and learnings
          through this blog, continuously refining them along the way.
          Simultaneously, I’m channeling my {` `}
          <Link href="/photobook">photography</Link> skills to capture moments
          and create videos for my YouTube channel.
        </p>
      </div>
      <div className="my-8 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <ChannelLink
          img={avatar}
          name="@RR"
          link="https://www.youtube.com/@fluffystream"
        />
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I also wish to highlight some of the services that have subtly yet
          significantly enriched my life.
        </p>
      </div>
      <div className="my-8 flex h-14 w-full flex-row space-x-2 overflow-x-auto">
        <div className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-700">
          <a href="https://ibkr.com/referral/rahul119">
            <svg width="70" height="25" role="img" aria-label="IBKR logo">
              <use href="/sprite.svg#ibkr" />
            </svg>
          </a>
        </div>
        <div className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-700">
          <a href="https://www.hedvig.com/se-en/forever/2GEKPM">
            <svg width="70" height="20" role="img" aria-label="hedvig logo">
              <use href="/sprite.svg#hedvig" />
            </svg>
          </a>
        </div>
        <div className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-700">
          <a href="https://www.dropbox.com/referrals/AADGxXIOT9uA_wk5l_PZxWRD5Je1EZ97JVc?src=global9">
            <svg width="70" height="30" role="img" aria-label="dropbox logo">
              <use href="/sprite.svg#dropbox" />
            </svg>
          </a>
        </div>
      </div>
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/fluffybeing"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">follow me</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
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
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
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
