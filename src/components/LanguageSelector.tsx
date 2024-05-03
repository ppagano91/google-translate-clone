import { Form } from "react-bootstrap"
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../utils/consts"
import { ChangeEvent, type FC } from "react"
import { FromLanguage, Language } from "../types/types"

type Props = 
| {type: 'from', value: FromLanguage, onChange: (language: FromLanguage) => void}
| {type: 'to', value: Language, onChange: (language: Language) => void}

const LanguageSelector: FC<Props> = ({type, value, onChange}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)

  }
  return (
    <Form.Select aria-label="Selecciona el idioma" onChange={handleChange} value={value}>
      {type === 'from' && <option value={AUTO_LANGUAGE}>Detectar Idioma</option>}
        {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => {
            return (
                <option key={key} value={key}>
                    {literal}
                </option>
            )
        })}
    </Form.Select>
  )
}

export default LanguageSelector