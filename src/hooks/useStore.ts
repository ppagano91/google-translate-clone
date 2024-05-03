import { useReducer } from 'react'
import { Action, FromLanguage, Language, type State } from '../types/types'
import { AUTO_LANGUAGE } from '../utils/consts'


const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: 'es',
  result: '',
  loading: false
}

function reducer (state: State, action: Action){
  const {type} = action
  
  if (type === 'INTERCHANGE_LANGUAGES'){

    if (state.fromLanguage === AUTO_LANGUAGE) return state

    return{
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE'){
    return {
      ...state,
      fromLanguage: action.payload
    }
  }

  if (type === 'SET_TO_LANGUAGE'){
    return {
      ...state,
      toLanguage: action.payload
    }
  }

  if (type === 'SET_FROM_TEXT'){
    return{
      ...state,
      loading: true,
      setFromText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT'){
    return{
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state

}

export function useStore(){
    const [{
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading
      }, dispatch] = useReducer(reducer, initialState)

    const interchangeLanguages = () => {
        dispatch({type: 'INTERCHANGE_LANGUAGES'})
    }

    const setFromLanguage = (payload: FromLanguage) => {
        dispatch({type: 'SET_FROM_LANGUAGE', payload: payload})
    }

    const setToLanguage = (payload: Language) =>{
        dispatch({type: 'SET_TO_LANGUAGE', payload})
    }

    const setFromText = (payload: Language) => {
        dispatch({type: 'SET_FROM_TEXT', payload})
    }

    const setResult = (payload: Language) => {
        dispatch({type: 'SET_RESULT', payload})
    }




    return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
    }
}