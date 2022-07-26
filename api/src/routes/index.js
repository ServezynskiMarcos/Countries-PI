const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Country, Activity, Country_Activity } = require("../db.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//!Esta funcion me trae toda la info de la Api
const getInfoApi = async () => {
  const apiUrl = await axios.get("https://restcountries.com/v3.1/all");
  //?como la info que me llega de la api es un arreglo de objetos, le puedo aplicar un map
  const apiInfo = await apiUrl.data.map((e) => {
    return {
      id: e.cca3,
      name: e.name.common,
      img: e.flags.png,
      continent: e.continents[0],
      //?compruebo si tiene o no tiene capital
      capital: e.capital ? e.capital[0] : "Does not have capital",
      subregion: e.subregion,
      area: e.area,
      population: e.population,
    };
  });
  //console.log("ESTO ME DEVUELVE LA API", apiInfo);
  return apiInfo;
};
//!Esta funcion me trae la info de la Base de datos
const getInfoDb = async () => {
  //? Trae todo del modelo de Country incluyendo Activity
  return await Country.findAll({
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: {
        attributes: [],
      },
    },
  });
};
//! Esta funcion concatena la info que me llega de la Api con la info de la Base de datos
const getAllInfo = async () => {
  const infoApi = await getInfoApi();
  const infoDb = await getInfoDb();
  const allInfo = infoApi.concat(infoDb);
  return allInfo;
};
//?En esta ruta tengo hecho el llamado por query y la ruta que me trae todo
router.get("/countries", async (req, res) => {
  const { name } = req.query;
  const info = await getInfoApi();
  try {
    //? Compruebo si la base de datos esta llena
    let db = await Country.findAll();
    //? Si no hay nada en la base de datos, la llena con la info traida de getAllInfo
    if (!db.length) await Country.bulkCreate(info);
    //? Si en la ruta existe un query
    if (name) {
      //?filtra todo lo que tengo y me trae el pais que encuentre con el name
      let query = await info.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      query.length
        ? res.status(200).send(query) //?si encontró un pais, me lo devuelve
        : res.status(404).send("Country not found"); //?si no encontró un pais, error
    } else {
      //? Si no hay query, traeme todo
      const all = await Country.findAll({
        include: {
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season"],
          through: {
            attributes: [],
          },
        },
      });
      res.status(200).json(all);
    }
  } catch (e) {
    console.log(e);
  }
});
//! Esta ruta hace las busquedas por ID
router.get("/countries/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const idCountry = await Country.findAll({
      //?Me trae de la base de datos lo que coincida con el ID, uso toUpperCase pq el id esta en mayusculas
      where: { id: id.toUpperCase() },
      //? y en la busqueda que me incluya el modelo activities con sus datos
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
        through: {
          attributes: [],
        },
      },
    });
    idCountry.length
      ? res.status(200).send(idCountry)
      : res.status(404).send("Country not found");
  }
});
router.get("/activities", async (req, res) => {
  const activities = await Activity.findAll({
    include: {
      model: Country,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  res.status(200).json(activities);
});

router.post("/activities", async (req, res) => {
  //?a todo esto me lo traigo del body
  const { name, difficulty, duration, season, country } = req.body;
  //?aca estoy creando un nuevo modelo de actividades
  const activitiesCreate = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });
  //?Busco en mi modelo de Country el pais que me llega por body
  const countryDB = await Country.findAll({
    where: {
      name: country,
      //?donde name sea igual al pais que le estoy pasando por body
    },
  });
  //?creo la actividad y la agrego al pais matcheado por el name
  //console.log("este es el pais", countryDB);
  return activitiesCreate.addCountry(countryDB);
  res.status(200).send("Activity succesfully created");
});
module.exports = router;
