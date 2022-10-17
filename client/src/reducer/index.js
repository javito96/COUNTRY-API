const initialState={
    countries: [],
    allCountries: [],
    activities:[],
    detail:[],
    
}

function rootReducer(state= initialState, action){
    switch(action.type) {
        case 'GET_COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            };
            case  'NAME':
                return {
                    ...state,
                    countries: action.payload
                }
        case 'FILTER_CONTINENT':
            const allCountries = state.allCountries
            const countriesFilterd = action.payload === 'all' ? allCountries :
            allCountries.filter(el=>el.continent.includes(action.payload) || 
            el.continent.map((el) => el.name).includes(action.payload))

            return{
                ...state,
                countries: countriesFilterd
            }
         case 'FILTER_ACTIVITY':
                const  allCountiesAct= state.allCountries
                const activitiesFilter = action.payload === 'all' ? allCountiesAct :
                allCountiesAct.filter(el=>el.activities.includes(action.payload) || 
                el.activities.map((el) => el.name).includes(action.payload))
    
                return{
                    ...state,
                    countries: activitiesFilter
                }

        case 'GET_ACTIVITIES':
            return{
                ...state,
                activities: action.payload
            }

            case 'ORDER_ALPHABETICAL':
                const sortArr = action.payload === "asc" ?
            state.countries.sort(function (a, b){
                if(a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }    
                return 0;                
            }) :
            state.countries.sort(function(a, b) {  //de forma descendente
                if(a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name){
                    return 1
                }
                return 0;
            })
            return{
                ...state,
                countries: sortArr
            };


            case 'ORDER_POPULATION':

                const sortArr1 = action.payload === 'max' ?
                state.countries.sort(function (a, b){
                    if(a.population > b.population) {
                        return 1;
                    }
                    if (b.population > a.population){
                        return -1;
                    }    
                    return 0;                
                }) :
                state.countries.sort(function(a, b) {  //de forma descendente
                    if(a.population > b.population) {
                        return -1;
                    }
                    if (b.population > a.population){
                        return 1
                    }
                    return 0;
                })
                return{
                    ...state,
                    countries: sortArr1
                };

                case 'GET_DETAIL':
                    return{
                        ...state,
                        detail: action.payload,
                        cargando: false,
                    }
                case 'CLEAR_DETAIL':
                    return{
                        ...state,
                        detail: []
                    }
        


        default: 
        return state


    }

}

export default rootReducer;