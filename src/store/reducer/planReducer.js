import { PLAN_DETAIL, PUSH_PLAN_DETAIL, ADD_PLAN, PLAN_UPDATE } from '../actionTypes'

const defaultState = {
  plan: [],
  planIns: [],
  updatePlancheck: false
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
    case ADD_PLAN:
      return {...state, planIns: [...state.planIns, action.payload]}
    case PLAN_UPDATE:
      if(action.payload){
        return {...state, updatePlancheck: true}
      }
    default:
    return state
  }
}

export default planReducer
