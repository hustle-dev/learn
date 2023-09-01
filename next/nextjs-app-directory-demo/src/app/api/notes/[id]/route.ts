import { zUpsertNote } from '@/app/api/notes/type'
import { prisma } from '@/globals/db'
import { NextRequest, NextResponse } from 'next/server'

// /api/notes/[id]/route.ts
// 노트 ID는 패스 파라메터 `[id]`로 전달

// 노트 개별 정보 취득
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const note = await prisma.note.findUnique({
    where: { id: Number(params.id) },
  })
  if (note === null) {
    return new NextResponse(null, { status: 404 })
  }
  return NextResponse.json(note)
}

// 노트 변경
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json()
  const parsedData = zUpsertNote.parse(data)
  const note = await prisma.note.update({
    where: { id: Number(params.id) },
    data: { title: parsedData.title, body: parsedData.body },
  })
  return new NextResponse(null, { status: 204 })
}

// 노트 삭제
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const note = await prisma.note.delete({
    where: { id: Number(params.id) },
  })
  return new NextResponse(null, { status: 204 })
}
