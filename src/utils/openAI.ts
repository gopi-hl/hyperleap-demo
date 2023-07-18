import { createParser } from 'eventsource-parser'
import type { ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import type { ChatMessage } from '@/types'

export const model = import.meta.env.OPENAI_API_MODEL || 'gpt-3.5-turbo'
export const hyperleapApiKey = import.meta.env.HYPERLEAPAI_API_KEY || ''

export const generatePayload = (apiKey: string, messages: ChatMessage[]): RequestInit & { dispatcher?: any } => ({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  },
  method: 'POST',
  body: JSON.stringify({
    model,
    messages,
    temperature: 0.6,
    stream: true,
  }),
})
// Post request for hyperleap AI

// export const generateConvoId = async() => {
//   const response = await fetch('https://api.hyperleap.ai/app/conversations', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-hl-api-key': `${hyperleapApiKey}`,
//     },
//     body: JSON.stringify({}),
//   })

//   return response.json()
// }
export const generateConvoId = async() => {
  try {
    const response = await fetch('https://api.hyperleap.ai/app/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hl-api-key': hyperleapApiKey,
      },
      body: JSON.stringify({}),
    })

    if (!response.ok)
      throw new Error(`Request failed with status ${response.status}`)
    return response.json()
  } catch (error) {
    console.error('Error making POST request:', error)
    throw error
  }
}

export const generatePayloadForHyperleapAI = (apiKey: string, message: string): RequestInit & { dispatcher?: any } => ({
  headers: {
    'Content-Type': 'application/json',
    'x-hl-api-key': `${hyperleapApiKey}`,
  },
  method: 'PATCH',
  body: JSON.stringify({
    message,
  }),
})

export const parseOpenAIStream = (rawResponse: Response) => {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  if (!rawResponse.ok) {
    return new Response(rawResponse.body, {
      status: rawResponse.status,
      statusText: rawResponse.statusText,
    })
  }

  const stream = new ReadableStream({
    async start(controller) {
      const streamParser = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data
          if (data === '[DONE]') {
            controller.close()
            return
          }
          try {
            // response = {
            //   id: 'chatcmpl-6pULPSegWhFgi0XQ1DtgA3zTa1WR6',
            //   object: 'chat.completion.chunk',
            //   created: 1677729391,
            //   model: 'gpt-3.5-turbo-0301',
            //   choices: [
            //     { delta: { content: '你' }, index: 0, finish_reason: null }
            //   ],
            // }
            const json = JSON.parse(data)
            const text = json.choices[0].delta?.content || ''
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            controller.error(e)
          }
        }
      }

      const parser = createParser(streamParser)
      for await (const chunk of rawResponse.body as any)
        parser.feed(decoder.decode(chunk))
    },
  })

  return new Response(stream)
}
