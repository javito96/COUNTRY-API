const axios = require ('axios');
const {Country, Activity} = require ('../db')

const fillDataBase =async()=>{
    const resApi = await axios.get('https://restcountries.com/v3/all');
    const infoApi = resApi.data.map(el=>{
        return {
            id : el.cca3 ,
            name: el.name.common,
            image: el.flags[1],
            capital: el.capital,
            continent: el.continents,
            area: el.area,
            population: el.population,
            subregion: el.subregion
        };
    })
    for (let i =0; i<infoApi.length;i++){
        await Country.create(infoApi[i]) 
    }
};





const controllers = {
    getAll : async (req,res)=>{
        const {name} = req.query;
        try{
            const contador = await Country.count()
            if (contador===0) await fillDataBase();
            if(name){
                const allCoutries = await Country.findAll({include:Activity}); //{include:Activity}
                const filteredByName = allCoutries.filter(p=>{
                    return p.name.toLowerCase().includes(name.toLowerCase())
                })
                return res.status(200).send(filteredByName)
            } else {
                const countriesDb = await Country.findAll({include:Activity}); //{include:Activity}
                return res.status(200).send(countriesDb)
            }

        }catch(err){
            res.status(400).send({err: err.message})
        }
    },



        getByID : async(req, res) => {
            const {id} = req.params
            const allCoutries = await Country.findAll({include:Activity})
            try{
                if(id) {
                    let countryID = await allCoutries.filter(e => e.id == id) 
                    countryID.length ?
                    res.status(200).json(countryID) :
                    res.status(404).send(`country with id "${id}" does not work!!`)
                };                
            }catch{
                   res.status(404).send(`country with id "${id}" does not work!!`)
               }
        }


        
    }

module.exports = controllers;