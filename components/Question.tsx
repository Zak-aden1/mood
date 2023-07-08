'use client'

import { askQuestion } from "@/utils/api"
import { useState } from "react"

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setloading] = useState(false)
  const [aiResponse, setAiResponse] = useState()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setloading(true)
    // do ai stuff to provide answer
    
    console.log('value', value);
    const answer = await askQuestion(value)
    setValue('')
    setloading(false)
    setAiResponse(answer)
    console.log('ai res', aiResponse);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          disabled={loading}
          value={value} 
          onChange={(e) => setValue(e.target.value)}  
          type="text" 
          placeholder="Ask a question!"
          className="border border-black/20 rounded-lg px-4 py-2 mr-2 text-lg"
          />
        <button disabled={loading} type="submit" className="bg-blue-600 px-4 py-2 rounded-lg text-lg">Ask</button>
      </form>
      {loading && <div>...loading</div>}
      {aiResponse && <div>{ aiResponse }</div>}
    </div>
  )
}

export default Question