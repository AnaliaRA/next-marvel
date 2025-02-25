import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  try {

    const { pathname } = new URL(req.url);
    const id = pathname.split('/').at(-2);

    const apiKey = process.env.NEXT_PUBLIC_API_PUBLIC_KEY;
    const privateKey = process.env.NEXT_PUBLIC_API_PRIVATE_KEY;

    if (!privateKey || !apiKey) {
      throw new Error('API keys are not defined');
    }

    if (!id) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const timestampRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/timestamp`);
    if (!timestampRes.ok) throw new Error('Failed to get timestamp data');
    const { timestamp } = await timestampRes.json();

    const hash = crypto
      .createHash('md5')
      .update(timestamp + privateKey + apiKey)
      .digest('hex');

    const endpoint = `https://gateway.marvel.com/v1/public/characters/${id}/comics`;

    const url = new URL(endpoint);
    url.search = new URLSearchParams({
      apikey: apiKey,
      ts: timestamp,
      hash: hash,
      limit: '20',
    }).toString();

    console.log('--- DEBUGGING ---');
    console.log('API/CHARACTERS/{ID}/COMICS/: ', url);
    console.log('--- END OF DEBUGGING ---');

    const res = await fetch(url, { headers: { Accept: '*/*' }, method: 'GET' });

    if (!res.ok) throw new Error('Failed to fetch Marvel data');

    return NextResponse.json(await res.json());
  } catch (error) {
    return NextResponse.json({ error: `${error}: Failed to fetch comics` }, { status: 500 });
  }
}