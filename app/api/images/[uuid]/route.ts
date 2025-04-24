import { NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';

// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// // Set up S3 client
// const s3 = new S3Client({ region: 'eu-central-1' });

import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } },
) {
  const { uuid } = params;

  try {
    const command = new GetObjectCommand({
      Bucket: 'esgnaturerisk',
      Key: `images/salmar-042025/${uuid}.jpg`, // Correct path
    });

    const { Bucket, Key } = (command as any).input;
    const url = `https://${Bucket}.s3.amazonaws.com/${Key}`;
    // const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
    return NextResponse.json({ url }); // Responds with { url: ... }
  } catch (error) {
    return new NextResponse('Error fetching image from S3', { status: 500 });
  }
}
