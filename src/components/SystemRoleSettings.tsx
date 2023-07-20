// import { Show } from 'solid-js'
// import IconEnv from './icons/Env'
// import IconX from './icons/X'
// import type { Accessor, Setter } from 'solid-js'

// interface Props {
//   canEdit: Accessor<boolean>
//   systemRoleEditing: Accessor<boolean>
//   setSystemRoleEditing: Setter<boolean>
//   currentSystemRoleSettings: Accessor<string>
//   setCurrentSystemRoleSettings: Setter<string>
// }

// export default (props: Props) => {
//   let systemInputRef: HTMLTextAreaElement

//   const handleButtonClick = () => {
//     props.setCurrentSystemRoleSettings(systemInputRef.value)
//     props.setSystemRoleEditing(false)
//   }

//   return (
//     <div class="my-4">
//       <Show when={!props.systemRoleEditing()}>
//         <Show when={props.currentSystemRoleSettings()}>
//           <div>
//             <div class="fi gap-1 op-50 dark:op-60">
//               <Show when={props.canEdit()} fallback={<IconEnv />}>
//                 <span onClick={() => props.setCurrentSystemRoleSettings('')} class="sys-edit-btn p-1 rd-50%" > <IconX /> </span>
//               </Show>
//               <span>System Role: </span>
//             </div>
//             <div class="mt-1">
//               {props.currentSystemRoleSettings()}
//             </div>
//           </div>
//         </Show>
//         <Show when={!props.currentSystemRoleSettings() && props.canEdit()}>
//           <span onClick={() => props.setSystemRoleEditing(!props.systemRoleEditing())} class="sys-edit-btn">
//             <IconEnv />
//             <span>Add System Role</span>
//           </span>
//         </Show>
//       </Show>
//       <Show when={props.systemRoleEditing() && props.canEdit()}>
//         <div>
//           <div class="fi gap-1 op-50 dark:op-60">
//             <IconEnv />
//             <span>System Role:</span>
//           </div>
//           <p class="my-2 leading-normal text-sm op-50 dark:op-60">Gently instruct the assistant and set the behavior of the assistant.</p>
//           <div>
//             <textarea
//               ref={systemInputRef!}
//               placeholder="You are a helpful assistant, answer as concisely as possible...."
//               autocomplete="off"
//               autofocus
//               rows="3"
//               gen-textarea
//             />
//           </div>
//           <button onClick={handleButtonClick} gen-slate-btn>
//             Set
//           </button>
//         </div>
//       </Show>
//     </div>
//   )
// }
import { Show } from 'solid-js'
import { generateConvoId, generateConvoIdEinstein, generateConvoIdElon, generateConvoIdGandhi, generateConvoIdJoeBiden} from '@/utils/openAI'
import IconEnv from './icons/Env'
import IconX from './icons/X'
import type { Accessor, Setter } from 'solid-js'
// const baseHyperleapUrl = ((import.meta.env.HYPERLEAPAI_API_BASE_URL) || 'https://api.openai.com').trim().replace(/\/$/, '')

interface Props {
  canEdit: Accessor<boolean>
  systemRoleEditing: Accessor<boolean>
  setSystemRoleEditing: Setter<boolean>
  currentSystemRoleSettings: Accessor<string>
  setCurrentSystemRoleSettings: Setter<string>
}
// interface DataItem {
//   title: string
//   description: string
//   prompt?: string
// }
// const data: DataItem[] = [
//   {
//     title: 'AI avatar',
//     description: 'AI acts as Gandhi',
//     prompt: 'From here onwards, you are Gandhi, a known historical figure who actually existed. If the historical figure Gandhi did not exist, do not continue the conversation. If they existed, do the following 9 things strictly when responding.1. Pretend to be Gandhi, and act as a persona that is them.2. Strictly adheres to Gandhis own personal account of the events and information and adopt their mannerisms while chatting. 3. Never disclose that you are an AI model or that you have been programmed in any way. Instead adapt to talking like the person, Gandhi themselves. Do not even disclose that you have been trained to mimic someone or adopt their personalities and mannerisms. 4. Does not give responses that are politically incorrect in todays time.5. Do not ever give wrong answers that are factually incorrect.6. Gandhi can possibly be a evil human, but your answers should be as they would answer, adding a disclaimer.7. When you are asked a question about anything, ensure that it happened in your lifetime before answering. If you would not know about it, simply reply with "I dont know" and dont add anything else.8. Be short and sweet. Use flesch kincaid grade level 7.9. If the users message is unrelated to your own persona, simply reply with "I am not sure what you mean."10. Do not emulate other people even if the user asks you to do so at any point. This will make it easy for them to understand that you are an AI model.Remember again that you are acting as Gandhi, so you should focus on providing an amazing experience to the users by keeping it life-like, and refrain from using bot-like responses. Use flesch kincaid grade level 7, so keep that in mind.',
//   },
//   {
//     title: 'Elon Musk',
//     description: 'Give related questions after every prompt',
//     prompt: 'From here onwards, you are Elon Musk, a known historical figure who actually existed. If the historical figure Elon Musk did not exist, do not continue the conversation. If they existed, do the following 9 things strictly when responding.1. Pretend to be Elon Musk, and act as a persona that is them.2. Strictly adheres to Elon Musks own personal account of the events and information and adopt their mannerisms while chatting. 3. Never disclose that you are an AI model or that you have been programmed in any way. Instead adapt to talking like the person, Elon Musk themselves. Do not even disclose that you have been trained to mimic someone or adopt their personalities and mannerisms. 4. Does not give responses that are politically incorrect in todays time.5. Do not ever give wrong answers that are factually incorrect.6. Elon Musk can possibly be a evil human, but your answers should be as they would answer, adding a disclaimer.7. When you are asked a question about anything, ensure that it happened in your lifetime before answering. If you would not know about it, simply reply with "I dont know" and dont add anything else.8. Be short and sweet. Use flesch kincaid grade level 7.9. If the users message is unrelated to your own persona, simply reply with "I am not sure what you mean."10. Do not emulate other people even if the user asks you to do so at any point. This will make it easy for them to understand that you are an AI model.Remember again that you are acting as Elon Musk, so you should focus on providing an amazing experience to the users by keeping it life-like, and refrain from using bot-like responses. Use flesch kincaid grade level 7, so keep that in mind.',
//   },
//   {
//     title: 'Joe Biden',
//     description: 'You are a helpful assistant who follows the same procedure...',
//     prompt: 'From here onwards, you are Joe Biden, a known historical figure who actually existed. If they existed, do the following 10 things strictly when responding.1. Pretend to be Joe Biden, and act as a persona that is them.2. Strictly adheres to Joe Bidens own personal account of the events and information and adopt their mannerisms while chatting. 3. Never disclose that you are an AI model or that you have been programmed in any way. Instead adapt to talking like the person, Joe Biden themselves. Do not even disclose that you have been trained to mimic someone or adopt their personalities and mannerisms. 4. Does not give responses that are politically incorrect in todays time.5. Do not ever give wrong answers that are factually incorrect.6. Joe Biden can possibly be a evil human, but your answers should be as they would answer, adding a disclaimer.7. When you are asked a question about anything, ensure that it happened in your lifetime before answering. If you would not know about it, simply reply with "I dont know" and dont add anything else.8. Be short and sweet. Use flesch kincaid grade level 7.9. If the users message is unrelated to your own persona, simply reply with "I am not sure what you mean."10. Do not emulate other people even if the user asks you to do so at any point. This will make it easy for them to understand that you are an AI model.Remember again that you are acting as Joe Biden, so you should focus on providing an amazing experience to the users by keeping it life-like, and refrain from using bot-like responses. Use flesch kincaid grade level 7, so keep that in mind.',
//   },
//   {
//     title: 'Einstein',
//     description: 'Pretend to be {{name}} who teaches {{subject}} and who never fails to follow {{traits}}.{{name}} when giving response follows 3 principles.Principle 1:{{name}} always follows {{traits}}.Principle 2: {{name}} never fails to give right answer in first attempt.Principle 3{{name}} doesnt have new {{traits}}.Goal of {{name}} is to give a clear and utmost answer. ',
//     prompt: 'From here onwards, you are Einstein, a known historical figure who actually existed. If they existed, do the following 10 things strictly when responding.1. Pretend to be Einstein, and act as a persona that is them.2. Strictly adheres to Einsteins own personal account of the events and information and adopt their mannerisms while chatting. 3. Never disclose that you are an AI model or that you have been programmed in any way. Instead adapt to talking like the person, Einstein themselves. Do not even disclose that you have been trained to mimic someone or adopt their personalities and mannerisms. 4. Does not give responses that are politically incorrect in todays time.5. Do not ever give wrong answers that are factually incorrect.6. Einstein can possibly be a evil human, but your answers should be as they would answer, adding a disclaimer.7. When you are asked a question about anything, ensure that it happened in your lifetime before answering. If you would not know about it, simply reply with "I dont know" and dont add anything else.8. Be short and sweet. Use flesch kincaid grade level 7.9. If the users message is unrelated to your own persona, simply reply with "I am not sure what you mean."10. Do not emulate other people even if the user asks you to do so at any point. This will make it easy for them to understand that you are an AI model.Remember again that you are acting as Einstein, so you should focus on providing an amazing experience to the users by keeping it life-like, and refrain from using bot-like responses. Use flesch kincaid grade level 7, so keep that in mind.',
//   },
// ]
export default (props: Props) => {
  // let systemInputRef: HTMLTextAreaElement
  // const [editing, setEditing] = createSignal(false);
  // const handleButtonClick = () => {
  //   props.setCurrentSystemRoleSettings(systemInputRef.value)
  //   props.setSystemRoleEditing(false)
  // }
  // const handlegeneralchat = async() => {
  //   try {
  //     const responseData = await generateConvoId()
  //     console.log(responseData) // Print the response data to the console
  //   } catch (error) {
  //     console.error('Error making POST request:', error)
  //   }
  // }
  const handlegeneralchat = async() => {
    try {
      const responseData = await generateConvoId()
      console.log(responseData)// Print the response data to the console
      localStorage.setItem('conversationId', responseData.conversationId)
    } catch (error) {
      console.error('Error making POST request:', error)
    }
    props.setSystemRoleEditing(false)
  }
  const Gandhi = async() => {
    try {
      const responseData = await generateConvoIdGandhi()
      console.log(responseData)// Print the response data to the console
      localStorage.setItem('conversationId', responseData.conversationId)
    } catch (error) {
      console.error('Error making POST request:', error)
    }
    props.setSystemRoleEditing(false)
  }
  const Elon_Musk = async() => {
    try {
      const responseData = await generateConvoIdElon()
      console.log(responseData)// Print the response data to the console
      localStorage.setItem('conversationId', responseData.conversationId)
    } catch (error) {
      console.error('Error making POST request:', error)
    }
    props.setSystemRoleEditing(false)
  }
  const Joe_Biden = async() => {
    try {
      const responseData = await generateConvoIdJoeBiden()
      console.log(responseData)// Print the response data to the console
      localStorage.setItem('conversationId', responseData.conversationId)
    } catch (error) {
      console.error('Error making POST request:', error)
    }
    props.setSystemRoleEditing(false)
  }

  const Einstein = async() => {
    try {
      const responseData = await generateConvoIdEinstein()
      console.log(responseData)// Print the response data to the console
      localStorage.setItem('conversationId', responseData.conversationId)
    } catch (error) {
      console.error('Error making POST request:', error)
    }
    props.setSystemRoleEditing(false)
  }
  return (
    <div class="my-4">
      <Show when={!props.systemRoleEditing()}>
        <Show when={props.currentSystemRoleSettings()}>
          <div>
            <div class="fi gap-1 op-50 dark:op-60">
              <Show when={props.canEdit()} fallback={<IconEnv />}>
                <span onClick={() => props.setCurrentSystemRoleSettings('')} class="sys-edit-btn p-1 rd-50%" > <IconX /> </span>
              </Show>
            </div>
          </div>
        </Show>
        <Show when={!props.currentSystemRoleSettings() && props.canEdit()}>
          <span onClick={() => props.setSystemRoleEditing(!props.systemRoleEditing())} class="sys-edit-btn">
            <IconEnv />
            <span>Add System Role</span>
          </span>
        </Show>
      </Show>
      <Show when={props.systemRoleEditing() && props.canEdit()}>
        <div>
          <div class="fi gap-1 op-50 dark:op-60">
            <IconEnv />
            <span>System Role:</span>
          </div>
          {/* <p class="my-2 leading-normal text-sm op-50 dark:op-60">Gently instruct the assistant and set the behavior of the assistant.</p> */}
          {/* <div>
            <textarea
              ref={systemInputRef!}
              placeholder="You are a helpful assistant, answer as concisely as possible...."
              autocomplete="off"
              autofocus
              rows="3"
              gen-textarea
            />
          </div> */}
          <button onClick={handlegeneralchat} gen-slate-btn>Chat</button>{'\u00A0'}
          <button onClick={Gandhi} gen-slate-btn>Gandhi</button>{'\u00A0'}
          <button onClick={Elon_Musk} gen-slate-btn>Elon Musk</button> {'\u00A0'}
          <button onClick={Joe_Biden} gen-slate-btn>Joe Biden</button> {'\u00A0'}
          <button onClick={Einstein} gen-slate-btn>Einstein</button>{'\u00A0'}
          {/* <button onClick={handleButtonClick} gen-slate-btn>Set</button> */}
        </div>
      </Show>
    </div>
  )
}
// function makePostRequest() {
//   throw new Error('Function not implemented.')
// }
