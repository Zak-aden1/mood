import { analyse } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const POST = async () => {
  const user = await getUserByClerkId()

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day'
    },
  })

  const analysis = await analyse(entry.content)
  console.log('entryi.id', analysis);
  
  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryID: entry.id,
      ...analysis
    }
  })

  revalidatePath('/journal')

  return NextResponse.json({data: entry})
}