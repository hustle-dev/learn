'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { z } from 'zod'

const NewNote: React.FC = () => {
  const router = useRouter()
  // 1. 폼의 입력 값을 관리하기 위한 state
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  // 2. 작성한 API를 호출하는 함수
  const createNote = useCallback(async () => {
    const res = await fetch(`/api/notes`, {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.ok) {
      const id = z.number().parse(await res.json())
      alert('Note created')
      // 추후 상세 페이지를 구현하면 해당 페이지로 전환
      router.push(`/notes`)
      // 3. 현재 페이지의 데이터를 서버에서 다시 가져온다
      router.refresh()
    } else {
      alert('Note failed to create')
    }
  }, [body, router, title])

  return (
    <div className="flex flex-col bg-gray-100 rounded-lg relative p-5 gap-2.5">
      <div className="sm:col-span-2">
        <label htmlFor="title" className="inline-block text-gray-800 text-sm sm:text-base mb-2">
          Title
        </label>
        <input
          name="title"
          className="w-full bg-gray-50 text-gray-800 border focus:ring ring-pink-300 rounded outline-none transition duration-100 px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="body" className="inline-block text-gray-800 text-sm sm:text-base mb-2">
          Body
        </label>
        <textarea
          name="body"
          className="w-full h-64 bg-gray-50 text-gray-800 border focus:ring ring-pink-300 rounded outline-none transition duration-100 px-3 py-2"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end gap-2.5">
        <Link
          href={`/notes`}
          className="inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-pink-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2"
        >
          Cancel
        </Link>
        <button
          onClick={createNote}
          className="inline-block bg-pink-500 hover:bg-pink-600 active:bg-pink-700 focus-visible:ring ring-pink-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2"
        >
          Create
        </button>
      </div>
    </div>
  )
}

export default NewNote
