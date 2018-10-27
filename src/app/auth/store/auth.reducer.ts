import * as Authentication from './auth.actions';
export interface State{
  token:string,
  authenticated:boolean
}
const IntitialState : State ={
  token:null,
  authenticated:false
}
export function authReducer(state=IntitialState,action: Authentication.Authentication){
  switch(action.type){
    case (Authentication.SIGNUP):
    case(Authentication.SIGNIN):
      return{
        ...state,
        authenticated:true
      }
    case(Authentication.SET_TOKEN):
    return{
      ...state,
      token:action.payload
    }
    case (Authentication.LOGOUT):
    return{
      ...state,
      authenticated:false,
      token:null
    }
    default:
      return state;
  }
}
