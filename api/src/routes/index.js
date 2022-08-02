const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");

//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { Country, Activity } = require("../db.js");
const router = Router();

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
// const getInfoApi = () => {
//   fetch("https://restcountries.com/v3.1/all")
//     .then((response) => response.json())
//     .then(data => data.map((e)=> {
//         return {
//           id: e.cca3,
//           name: e.name.common,
//           img: e.flags.png,
//           continent: e.continents[0],
//           //?compruebo si tiene o no tiene capital
//           capital: e.capital ? e.capital[0] : "Does not have capital",
//           subregion: e.subregion,
//           area: e.area,
//           population: e.population,
//         };
//     }));
// };
router.get("/countries", async (req, res) => {
  const { name } = req.query;
  const info = await getInfoApi();
  try {
    const db = await Country.findAll(); //!
    if (!db.length) await Country.bulkCreate(info);
    if (name) {
      const query = await info.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      query.length
        ? res.status(200).send(query)
        : res.status(404).send("Country not found");
    } else {
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
    res.status(404).send({ msg: e });
  }
});

router.get("/countries/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const idCountry = await Country.findAll({
      where: { id: id.toUpperCase() },
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season", "id"],
        through: {
          attributes: [],
        },
      },
    });
    idCountry.length
      ? res.status(200).json(idCountry)
      : res.status(404).json("Country not found");
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
  activities.length
    ? res.status(200).json(activities)
    : res.status(404).json("Activities not found");
});

router.get("/activities/:id", async (req, res) => {
  let { id } = req.params;
  if (id) {
    const activityId = await Activity.findAll({
      where: { id },
      include: {
        model: Country,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    activityId.length
      ? res.status(200).json(activityId)
      : res.status(400).send("error, no se encuentra la actividad");
  }
});

router.post("/activities", async (req, res) => {
  const { name, difficulty, duration, season, country } = req.body;
  try {
    const activitiesCreate = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    const countryDB = await Country.findAll({
      where: {
        name: country,
      },
    });
    res.status(200).send("activity created")
    return activitiesCreate.addCountry(countryDB);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/del/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const del = await Activity.findByPk(id);
    if (!del) {
      return res.status(404).json("error, activity not found");
    }
    await del.destroy();
    return res.status(200).json("activity deleted successfully");
  } catch (err) {
    return res.json({ error: err.message });
  }
});

module.exports = router;
