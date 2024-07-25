'use server';

import { youtube } from '@googleapis/youtube';
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from 'next/cache';
import { sql } from './postgres';

const yt = youtube({
  version: 'v3',
  auth: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Replace with your actual API key
});

export const getYouTubeSubs = cache(
  async () => {
    const response = await yt.channels.list({
      id: ['UC4PHctm6cFb_tVSRG3i9fBw'],
      part: ['statistics'],
    });

    let channel = response.data.items![0];
    return Number(channel?.statistics?.subscriberCount).toLocaleString();
  },
  ['rr-youtube-subs'],
  {
    revalidate: 3600,
  }
);

export async function getBlogViews() {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  let views = await sql`
    SELECT count
    FROM views
  `;

  return views.reduce((acc, curr) => acc + Number(curr.count), 0);
}

export async function getViewsCount(): Promise<
  { slug: string; count: number }[]
> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  return sql`
    SELECT slug, count
    FROM views
  `;
}

export async function getGuestbookEntries() {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  return sql`
    SELECT id, body, created_by, updated_at
    FROM guestbook
    ORDER BY created_at DESC
    LIMIT 100
  `;
}
