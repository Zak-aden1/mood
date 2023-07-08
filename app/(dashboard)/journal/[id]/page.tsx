import Editor from "@/components/Editor"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db";

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id
      },
    },
    include: {
      analysis: true
    }
  })

  console.log('user ENTRY!!!!!!!', entry);
  return entry
}

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)

  return <div className="h-full w-full grid grid-cols-3">
        <Editor entry={entry}/>
    </div>

}

export default EntryPage