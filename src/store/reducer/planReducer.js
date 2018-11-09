import { PLAN_DETAIL, PUSH_PLAN_DETAIL } from '../actionTypes'

const defaultState = {
  plan: []
}

function planReducer(state = defaultState, action){
  switch (action.type) {
    case PLAN_DETAIL:
       const plan = state.plan.map(plan => {
        if(plan.id == action.payload.id) {
          return action.payload;
        }
        return plan
      })
      return {...state, plan}
      
    case PUSH_PLAN_DETAIL:
      return {...state, plan: [...state.plan, action.payload]}
    default:
    return state
  }
}

export default planReducer
