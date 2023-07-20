import { createParser } from 'eventsource-parser'
import type { ParsedEvent, ReconnectInterval } from 'eventsource-parser'
// import type { ChatMessage } from '@/types'
// import type { APIRoute } from 'astro'

export const model = import.meta.env.OPENAI_API_MODEL || 'gpt-35-turbo'
export const hyperleapApiKey = import.meta.env.HYPERLEAPAI_API_KEY || ''
// let currentConversationId = null

// const currentConversationId = null

// export const generatePayload = (apiKey: string, messages: ChatMessage[]): RequestInit & { dispatcher?: any } => ({
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${apiKey}`,
//   },
//   method: 'POST',
//   body: JSON.stringify({
//     model,
//     messages,
//     temperature: 0.6,
//     stream: true,
//   }),
// })
export const generateConvoId = async() => {
  try {
    const response = await fetch('https://api.hyperleap.ai/app/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hl-api-key': 'NTcwYzhhNGQyMGFkNDE2MWIyNzJjZjc3YWE3YjFiZjM=',
      },
      body: JSON.stringify({}),
    })

    if (!response.ok)
      throw new Error(`Request failed with status ${response.status}`)
    // const responseData = await response.json()
    // currentConversationId = responseData.conversationId
    return response.json()
  } catch (error) {
    console.error('Error making POST request:', error)
    throw error
  }
}
export const generateConvoIdGandhi = async() => {
  try {
    const response = await fetch('https://api.hyperleap.ai/app/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hl-api-key': 'NTcwYzhhNGQyMGFkNDE2MWIyNzJjZjc3YWE3YjFiZjM=',
      },
      body: JSON.stringify({
        // "model": "gpt-3.5-turbo-16k",
        replacements: {
          name: 'Gandhiji',
          grade: '8',
        },
        personaId: '2A29602E-1D87-4431-A52E-218622650392',
      }),
    })

    if (!response.ok)
      throw new Error(`Request failed with status ${response.status}`)
    // const responseData = await response.json()
    // currentConversationId = responseData.conversationId
    return response.json()
  } catch (error) {
    console.error('Error making POST request:', error)
    throw error
  }
}
export const generateConvoIdElon = async() => {
  try {
    const response = await fetch('https://api.hyperleap.ai/app/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hl-api-key': 'NTcwYzhhNGQyMGFkNDE2MWIyNzJjZjc3YWE3YjFiZjM=',
      },
      body: JSON.stringify({
        // "model": "gpt-3.5-turbo-16k",
        replacements: {
          name: 'Elon_Musk',
          grade: '8',
        },
        personaId: '2A29602E-1D87-4431-A52E-218622650392',
      }),
    })

    if (!response.ok)
      throw new Error(`Request failed with status ${response.status}`)
    // const responseData = await response.json()
    // currentConversationId = responseData.conversationId
    return response.json()
  } catch (error) {
    console.error('Error making POST request:', error)
    throw error
  }
}
export const generateConvoIdEinstein = async() => {
  try {
    const response = await fetch('https://api.hyperleap.ai/app/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hl-api-key': 'NTcwYzhhNGQyMGFkNDE2MWIyNzJjZjc3YWE3YjFiZjM=',
      },
      body: JSON.stringify({
        // "model": "gpt-3.5-turbo-16k",
        replacements: {
          name: 'Einstein',
          grade: '8',
        },
        personaId: '2A29602E-1D87-4431-A52E-218622650392',
      }),
    })
    if (!response.ok)
      throw new Error(`Request failed with status ${response.status}`)
    // const responseData = await response.json()
    // currentConversationId = responseData.conversationId
    return response.json()
  } catch (error) {
    console.error('Error making POST request:', error)
    throw error
  }
}
export const generateConvoIdJoeBiden = async() => {
  try {
    const response = await fetch('https://api.hyperleap.ai/app/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hl-api-key': 'NTcwYzhhNGQyMGFkNDE2MWIyNzJjZjc3YWE3YjFiZjM=',
      },
      body: JSON.stringify({
        // "model": "gpt-3.5-turbo-16k",
        replacements: {
          name: 'Joe_Biden',
          grade: '8',
        },
        personaId: '2A29602E-1D87-4431-A52E-218622650392',
      }),
    })
    if (!response.ok)
      throw new Error(`Request failed with status ${response.status}`)
    // const responseData = await response.json()
    // currentConversationId = responseData.conversationId
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

export const parseOpenAIStream = async(rawResponse: Response) => {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  if (!rawResponse.ok) {
    return new Response(rawResponse.body, {
      status: rawResponse.status,
      statusText: rawResponse.statusText,
    })
  }

  const body = await context.request.json()
  const { sign, time, messages, pass } = body
  if (!messages) {
    return new Response(JSON.stringify({
      error: {
        message: 'No input text.',
      },
    }), { status: 400 })
  }
  await generateConvoId()
  const convoId = localStorage.getItem('conversationId') // || currentConversationId
  const initOptionsHyperleap = generatePayloadForHyperleapAI(hyperleapApiKey, messages?.[messages.length - 1]?.content || '')
  const response = await fetch(`https://api.hyperleap.ai/app/conversations/${convoId}/continue`, initOptionsHyperleap).catch((err: Error) => {
    console.error(err)
    return new Response(JSON.stringify({
      error: {
        code: err.name,
        message: err.message,
      },
    }), { status: 500 })
  }) as Response

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
  return parseOpenAIStream(response) as Response
}
// export { currentConversationId }
