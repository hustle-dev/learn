import 'server-only'
import Link from 'next/link'
import { Suspense } from 'react'
import ErrorBoundary from '@/app/components/ErrorBoundary'
import FetchError from '@/app/components/FetchError'
import Loading from '@/app/components/Loading'
import { apiUrl } from '@/app/constants/api'
import NoteList from './NoteList'
import { zNotes } from '../api/notes/type'

// 1. 정적 / 동적 렌더링이나 재생성 간격을 지정
export const revalidate = 0

export const metadata = {
  title: 'List Notes',
}

export default async function Page() {
  // 2. API를 이용한 데이터 취득
  const notes = await getNotes()
  return (
    <main className="mx-2 sm:mx-4 relative">
      {/* 노트 작성 페이지는 아직 없으므로 목록 페이지로 전환 */}
      <Link
        href="/notes"
        className="absolute top-0 right-2 z-10 text-white bg-pink-500 hover:bg-pink-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
      >
        <svg
          aria-hidden="true"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="4 4 8 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">New Note</span>
      </Link>
      <h2 className="mb-6 text-gray-400 text-xs">List Notes</h2>
      {/* 3. Client Components의 Suspense 사용 */}
      <ErrorBoundary fallback={<FetchError />}>
        <Suspense fallback={<Loading />}>
          <NoteList initialState={notes} />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}

const getNotes = async () => {
  const res = await fetch(`${apiUrl}/notes`, { cache: 'no-store' })
  const data = await res.json()
  const notes = zNotes.parse(data)
  return notes
}
