import {ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi} from 'openai'
import { SUPPORTED_LANGUAGES } from '../utils/consts'
import { FromLanguage, Language } from '../types/types'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const configuration = new Configuration({apiKey})
const openai = new OpenAIApi(configuration)

export async function translate({
    fromLanguage,
    toLanguage,
    text
}:{
    fromLanguage: FromLanguage
    toLanguage: Language
    text: string
}) {
    const messages = [
        {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: 'You are a AI that transalte text. You receive a text from a user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can aldo receive {{auto}} which menas that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`.'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: 'Hola mundo {{Español}} [[English]]'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: 'Hello world'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: 'How are you? {{auto}} [[Deutsch]]'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: 'Wie geht es dir?'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: 'Bon dia, com estas? {{auto}} [[Español]]'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: 'Buenos días, ¿cómo estás?'
        }
    ]

    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    const completion = await openai.createChatCompletion({messages: [
        ...messages,
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: `${text} {{${fromCode}}} [[${toCode}]]`
        }
        ],
        model: 'gpt-3.5-turbo'}
    )

    return completion.data.choices[0]?.message?.content
}