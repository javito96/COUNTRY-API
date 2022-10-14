import axios from 'axios';

export function getCountries(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/countries')
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}

export function searchName(name){
    return async function (dispatch){
        try{
            var json = await axios.get('http://localhost:3001/countries?name='+name);
            return dispatch({
                type: 'NAME',
                payload: json.data
            })
        }catch(error){
            alert(`country ${name} not found`)
        }
    }
}

export function filterByContinent(payload){
    return{
        type: 'FILTER_CONTINENT',
        payload
    }
}
 
export function filterByActivities(payload){
    return{
        type: 'FILTER_ACTIVITY',
        payload
    }
}

export function getActivities(){
 return async function(dispatch){
    const info = await axios('http://localhost:3001/activities')
    return dispatch({
        type: 'GET_ACTIVITIES',
        payload: info.data
    })
 }
}


export function orderByAlphabetical(payload){
    return {
        type: 'ORDER_ALPHABETICAL',
        payload        
    }
}

export function ordenByPopulation(payload){
    return{
        type: 'ORDER_POPULATION',
        payload
    }
}

export function getDetail(id) {
    return async function (dispatch){
        try{

            dispatch({type: 'CARGANDO'});
            let json = await axios.get('http://localhost:3001/countries/'+id)
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        }catch(error){
            alert('id not found front')
        }
    }
}
export function clearDetail(payload){
    return{
        type: 'CLEAR_DETAIL',
        payload
    }
}
