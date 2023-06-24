import { analyse } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json()
  const user = await getUserByClerkId()
  
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  const analysis = await analyse(updatedEntry.content)

  await prisma.analysis.upsert({
    where: {
      entryID: updatedEntry.id
    },
    create: {
      entryID: updatedEntry.id,
      ...analysis
    },
    update: analysis
  })

  revalidatePath('/')

  return NextResponse.json({ data: { ...updatedEntry, analysis: analysis }})
}