// eslint-disable-next-line import/no-extraneous-dependencies
import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { handleAuth } from '@auth0/nextjs-auth0';
// eslint-disable-next-line import/prefer-default-export
export const GET = handleAuth();
