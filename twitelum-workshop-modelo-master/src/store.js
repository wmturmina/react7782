import { createStore} from 'redux'

function tweetsReducer(stateAtual = [], action = {}){
    let stateDeRetorno = stateAtual
    if(action.type === 'CARREGA_TWEETS') {
        stateDeRetorno = action.tweets
    }
    return stateDeRetorno
}

export default createStore(tweetsReducer)
