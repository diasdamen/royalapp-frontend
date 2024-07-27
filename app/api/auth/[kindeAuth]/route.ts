import { NextResponse } from 'next/server';

import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";
// export const GET = handleAuth();

export async function GET(req: Request) {
  // Handle authentication without arguments
  try {
    const result = await handleAuth(); // Call without arguments if that's the correct usage
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to handle authentication' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}