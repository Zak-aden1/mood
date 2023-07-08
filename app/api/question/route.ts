import { qa } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  // console.log('request', request.json());
  
  const { question } = await request.json()
  console.log('request quesiton', question);
  
  const user = await getUserByClerkId()

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id
    },
    select: {
      id: true,
      content: true,
      createdAt: true
    }
  })

  const answer = await qa(question, entries) 

  return NextResponse.json({data: answer})
}