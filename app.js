const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 4000;
const weatherAccessKey = "b5226c519ae692c82b2ea41024d2d39b";
const app = express();

app.use(cors());
app.use(bodyParser.json());

// API for getting current weather based on location
app.get("/weather/current", async (req, res) => {
  const { location } = req.query;
  const url = `http://api.weatherstack.com/current?access_key=${weatherAccessKey}&query=${location}`;
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      if (data.error) {
        return res.status(400).json(data.error);
      }
      const { location, current } = data;
      return res.status(200).json({ location, current });
    } else {
      return res.status(response.status).json({ message: response.statusText });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// API for getting historical weather based on location and date
app.get("/weather/historical", async (req, res) => {
  const { location, date } = req.query;
  const url = `http://api.weatherstack.com/historical?access_key=${weatherAccessKey}&query=${location}&historical_date=${date}`;
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      if (data.error) {
        return res.status(400).json(data.error);
      }
      return res.status(200).json(data);
    } else {
      return res.status(response.status).json({ message: response.statusText });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
