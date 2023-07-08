import HistoryChart from "@/components/HistoryChart"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const userData = async () => {
  const user = await getUserByClerkId()

  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  const sum = analysis.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analysis.length)

  return { analysis, avg } 
}

const History = async () => {
  const { avg, analysis } = await userData()

  return <div className="h-full w-full">
    <div>Average Sentiment: {avg}</div>
    <div className="h-full w-full"><HistoryChart data={analysis} /></div>
  </div>
}

export default History