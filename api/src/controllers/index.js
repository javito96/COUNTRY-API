const axios = require ('axios');
const {Country, Activity} = require ('../db')

const apiInfo = async() => {
    const apiUrl = await axios.get('https://restcountries.com/v3/all')
    const apiInfoD = await apiUrl.data.map(el=>{
        return{
            id: el.cca3,
            name: el.name.common,
            image: el.flags[1],
            capital: el.capital,
            contintent: el.contintent,
            area: el.area,
            population: el.population,
            subregion: el.subregion
        }
    })
    return apiInfoD
}

const getDBInfo = async () => {
    return await Country.findAll({
        include:{
            model: Activity,
            attributes: ['name'],
            through:{
                attributes: [],
            }
        }
    })
}


const getAllCountries = async ()=>{
    const infoApi = await apiInfo();
    const dbInfo = await getDBInfo();
    const allInfo = infoApi.concat(dbInfo)
    return allInfo
}

const controllers = {
    getAll : async (req, res) => {
        const name = req.query.name
        let countryTotal = await getAllCountries();
        try{
            if(name){
                let countryName = await countryTotal.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
                countryName.length ?
                res.status(200).send(countryName):
                res.status(404).send(`country "${name}" not found!!`);
                
            }else {
                res.status(200).send(countryTotal)
            }
        }catch{
            res.status(404).send('all countries not found')
        };
        },


        getByID : async(req, res) => {
            const {id} = req.params
            const countriesTotal = await getAllCountries()
            try{
                if(id) {
                    let countryID = await countriesTotal.filter(e => e.id == id) 
                    countryID.length ?
                    res.status(200).json(countryID) :
                    res.status(404).send(`country with id "${id}" does not work!!`)
                };                
            }catch{
                   res.status(404).send(`country with id "${id}" does not work`)
               }
        }


        
    }

module.exports = controllers;