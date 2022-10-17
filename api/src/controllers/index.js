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

const getDBInfo = async ()=>{
    return await Country.findAll ({
        include:{
            model: Activity,
            attributes: ['name', 'hardness', 'duration', 'season'],
            through:{
                attributes: [],
            },
        }
    })
}


const controllers = {


    getAll :async (req, res) =>{
        const name = req.query.name
        let totalCountries = await getDBInfo();
        const contador = await Country.count()
            if (contador===0) await fillDataBase();
        if(name){
            let countryName = await totalCountries.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
            countryName.length ?
            res.status(200).send(countryName):
            res.status(404).send(`country "${name}" not found!!`);
    
        }else {
            res.status(200).send(totalCountries)
        }
    },


        getByID : async(req, res) => {
            const id = req.params.id
            const countriesAll = await getDBInfo()
                if(id) {
                    let countryID = await countriesAll.filter(e => e.id == id) 
                    countryID.length ?
                    res.status(200).json(countryID) :
                    res.status(404).send(`country  ID:"${id}" not found!!`)
                }
                },

//!ACTIVITIES

        getAcitivities : async(req, res) =>{
            try{
                const activities = await Activity.findAll();
                res.status(200).json(activities)
            }catch{
                res.status(404).res('there are not activities')
            }
        },

        
        createActivities: async(req, res, ) => {
            const { name, hardness,  duration, season, country } = req.body;
            // try{
                const activityCreated = await Activity.create({
                    name,
                    hardness,
                    duration,
                    season
                })
                if(country&&country.length){
                    var countryDB=[];
                    for(let i = 0; i< country.length; i++){
                        let countryFound= await Country.findOne({
                            where: {name: country[i]}
                        })
                        countryDB.push(countryFound)
                        await activityCreated.addCountry(countryDB)
                    }
                }
               
                return  res.status(200).send(activityCreated)
            // }catch{
            //     return res.status(404).send('algo salio mal al crear')

            // }
        
        },
        
    }
    

module.exports = controllers;