const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity, Country_Activity } = require("../db.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getInfoApi = async () => {
  const apiUrl = await axios.get("https://restcountries.com/v3.1/all");
  //como la info que me llega de la api es un arreglo de objetos, le puedo aplicar un map
  const apiInfo = await apiUrl.data.map((e) => {
    return {
      id: e.cca3,
      name: e.name.common,
      img: e.flags.png,
      continent: e.continents[0],
      capital: e.capital ? e.capital[0] : "Does not have capital",
      subregion: e.subregion,
      area: e.area,
      population: e.population,
    };
  });
  //console.log("ESTO ME DEVUELVE LA API", apiInfo);
  return apiInfo;
};

const getInfoDb = async () => {
  return await Country.findAll({
    include: {
      model: Activity,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllInfo = async () => {
  const infoApi = await getInfoApi();
  const infoDb = await getInfoDb();
  const allInfo = infoApi.concat(infoDb);
  return allInfo;
};

router.get("/countries", async (req, res) => {
  const { name } = req.query;
  const info = await getAllInfo();

  try {
    let db = await Country.findAll();
    if (!db.length) await Country.bulkCreate(info);
    if (name) {
      let query = await info.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      query.length
        ? res.status(200).send(query)
        : res.status(404).send("Country not found");
    } else {
      res.status(200).send(info);
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/countries/:id", async (req, res) => {
  const { id } = req.params;
  if(id){
    const idCountry = await Country.findAll({
        where: {id : id.toUpperCase()},
        include:{
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season', 'id'],
            through:{
                attributes: []
            }
        }
        })
    idCountry.length
    ? res.status(200).send(idCountry)
    : res.status(404).send("Country not found");
    }
});


router.post("/activities", async (req, res) => {
  const { name, difficulty, duration, season, country } = req.body;
  const activities = await Activity.create({
    name,
    difficulty,
    duration,
    season,
    country,
  });
  const actDb = await Country.findAll({
    where: {
      name: country,
    },
  });
  activities.addCountry(actDb);
  res.status(200).send("Activity succesfully created");
});
module.exports = router;
