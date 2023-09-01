import 'server-only'
import { apiUrl } from '@/app/constants/api'
import { zNote } from '@/app/api/notes/type'

export const getNote = async (id: string) => {
  const res = await fetch(`${apiUrl}/notes/${id}`, { cache: 'no-store' })
  const data = await res.json()
  const note = zNote.parse(data)
  return note
}
