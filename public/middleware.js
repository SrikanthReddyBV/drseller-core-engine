import { NextResponse } from 'next/server';
import { DRSELLER_CONFIG } from './lib/config';

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const today = new Date();
    const expiryDate = new Date(DRSELLER_CONFIG.contract_expiry);

    // 1. Check if the 1-year contract is still valid
    if (today > expiryDate || !DRSELLER_CONFIG.is_platform_active) {
        return new NextResponse(
            JSON.stringify({
                error: "Platform License Expired or Suspended.",
                notice: "Renewal required. All disputes settled in Bangalore Courts."
            }),
            { status: 403, headers: { 'content-type': 'application/json' } }
        );
    }

    // 2. Protect the (authenticated) group
    // We will add Supabase Auth session checks here in the next step

    return NextResponse.next();
}

export const config = {
    matcher: ['/(authenticated)/:path*', '/api/:path*'],
};