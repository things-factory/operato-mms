import { UPDATE_OPERATO_SELLER } from '../actions/main'

const INITIAL_STATE = {
  operatoSeller: 'ABC'
}

const operatoSeller = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_OPERATO_SELLER:
      return { ...state }

    default:
      return state
  }
}

export default operatoSeller
