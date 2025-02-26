import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  try {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const apiKey = process.env.NEXT_PUBLIC_API_PUBLIC_KEY;
    const privateKey = process.env.NEXT_PUBLIC_API_PRIVATE_KEY;

    if (!privateKey || !apiKey) {
      throw new Error('API keys are not defined');
    }

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const timestamp = Date.now().toString();

    const hash = crypto
      .createHash('md5')
      .update(timestamp + privateKey + apiKey)
      .digest('hex');

    const endpoint = `https://gateway.marvel.com/v1/public/characters/${id}`;

    const url = new URL(endpoint);
    url.search = new URLSearchParams({
      apikey: apiKey,
      ts: timestamp,
      hash: hash,
      limit: '50',
    }).toString();

    console.log('--- DEBUGGING ---');
    console.log('API/CHARACTERS/: ', url);
    console.log('--- END OF DEBUGGING ---');

    const res = await fetch(url, {
      headers: {
        Accept: '*/*'
      },
      method: 'GET'
    });

    if (!res.ok) throw new Error('Failed to fetch Marvel data');

    return NextResponse.json(await res.json());
  } catch (error) {
    return NextResponse.json({ error: `${error}: Failed to fetch characters` }, { status: 500 });
  }
}


