import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 사용자가 로그인되어 있고 현재 경로가 /인 경우 사용자를 /account로 리다이렉션한다.
  if (user && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/account', req.url))
  }

  // 사용자가 로그인하지 않았고 현재 경로가 /가 아닌 경우 사용자를 /로 리다이렉션한다.
  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/account'],
}
