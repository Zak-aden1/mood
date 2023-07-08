'use client'

import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"

interface Content {
  summary: string,
  subject: string,
  mood: string,
  negative: boolean,
  color: string,
  id: string
}

interface Entry {
  entry: {
    id: string
    content: string,
    analysis: Content
  }
}

const Editor: React.FC<Entry> = ({ entry }) => {
  const [value, setvalue] = useState<string>(entry.content)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [analysis, setAnalysis] = useState<Content>(entry.analysis)
  console.log('entry', entry.analysis);

  const { color, mood, summary, subject, negative } = analysis
  const analysisData = [
    {name: 'Summary', value: summary},
    {name: 'Subject', value: subject},
    {name: 'Mood', value: mood},
    {name: 'Negative', value: negative ? 'True' : 'false'},
  ]

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const data = await updateEntry(entry.id, _value)

      setAnalysis(data.analysis)

      setIsLoading(false)
    }
  })

  return (
    <>
      <div className="w-full h-full col-span-2">
        {isLoading && <div>...loading</div>}
        <textarea 
          className="w-full h-full p-8 text-xl outline-none" 
          value={value} 
          onChange={e => setvalue(e.target.value)}>
        </textarea>
      </div>
      <div className="col-span-1 border-l border-black/10">
        <div className="px-6 py-10" style={{backgroundColor: color}}>
          <h2 className="text-white text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map(item => (
              <li className="flex px-2 py-4 items-center justify-between border-bottom border-t border-black/10" key={item.name}>
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Editor