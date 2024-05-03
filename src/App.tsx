import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'
import {Container, Row, Col, Button, Stack} from 'react-bootstrap'
import { AUTO_LANGUAGE } from './utils/consts'
import { ArrowIcon } from './components/Icons'
import LanguageSelector from './components/LanguageSelector'
import { SectionType } from './types/types.d'
import { TextArea } from './components/TextArea'


function App() {
  const {loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    setFromLanguage,
    interchangeLanguages,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  return (
    <>
      <Container fluid>
        <h1 style={{fontSize: '36px'}}>Google Translate</h1>
        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onChange={setFromLanguage}/>
                <TextArea                  
                  type={SectionType.From}
                  value={fromText}
                  onChange={setFromText}
                  />
            </Stack>
          </Col>
          <Col xs='auto'>
          <Button variant='link' disabled={fromLanguage===AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowIcon/>
          </Button>
          </Col>
          <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}/>
               <TextArea
                  loading={loading}
                  type={SectionType.To}
                  value={result}
                  onChange={setResult}
                  />
          </Stack>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
