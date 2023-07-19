// #vercel-disable-blocks
import { ProxyAgent, fetch } from 'undici'
import { currentConversationId, generateConvoId } from '@/utils/openAI' // currentConversationId
// #vercel-end
import { generatePayload, generatePayloadForHyperleapAI, parseOpenAIStream } from '@/utils/openAI'
import type { APIRoute } from 'astro'
// import { error } from 'astro/dist/core/logger/core'

const apiKey = import.meta.env.OPENAI_API_KEY
const hyperleapApiKey = import.meta.env.HYPERLEAPAI_API_KEY || ''
const httpsProxy = import.meta.env.HTTPS_PROXY
// const baseUrl = ((import.meta.env.OPENAI_API_BASE_URL) || 'https://api.openai.com').trim().replace(/\/$/, '')
const baseHyperleapUrl = ((import.meta.env.HYPERLEAPAI_API_BASE_URL) || 'https://api.openai.com').trim().replace(/\/$/, '')
// const sitePassword = import.meta.env.SITE_PASSWORD || ''
// const passList = sitePassword.split(',') || []

export const post: APIRoute = async(context) => {
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
  // Get the current conversationId from the variable
  // const convoId = currentConversationId
  // if (sitePassword && !(sitePassword === pass || passList.includes(pass))) {
  //   return new Response(JSON.stringify({
  //     error: {
  //       message: 'Invalid password.',
  //     },
  //   }), { status: 401 })
  // }
  // if (import.meta.env.PROD && !await verifySignature({ t: time, m: messages?.[messages.length - 1]?.content || '' }, sign)) {
  //   return new Response(JSON.stringify({
  //     error: {
  //       message: 'Invalid signature.',
  //     },
  //   }), { status: 401 })
  // }
  const convoId = localStorage.getItem('conversationId') || currentConversationId
  const initOptions = generatePayload(apiKey, messages)
  const initOptionsHyperleap = generatePayloadForHyperleapAI(hyperleapApiKey, messages?.[messages.length - 1]?.content || '')
  // #vercel-disable-blocks
  if (httpsProxy)
    initOptions.dispatcher = new ProxyAgent(httpsProxy)
  // #vercel-end

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // const response = await fetch(`${baseUrl}/v1/chat/completions`, initOptions).catch((err: Error) => {
  //   console.error(err)
  //   return new Response(JSON.stringify({
  //     error: {
  //       code: err.name,
  //       message: err.message,
  //     },
  //   }), { status: 500 })
  // }) as Response
  const response = await fetch(`${baseHyperleapUrl}/app/conversations/${convoId}/continue`, initOptionsHyperleap).catch((err: Error) => {
    console.error(err)
    return new Response(JSON.stringify({
      error: {
        code: err.name,
        message: err.message,
      },
    }), { status: 500 })
  }) as Response

  return parseOpenAIStream(response) as Response
}
