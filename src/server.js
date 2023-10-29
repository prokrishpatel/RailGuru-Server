const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

app.get("/wheretogo", async (req, res) => {
  const { from, to, date } = req.query; // Extract "from," "to," and "date" query parameters

  if (!from || !to || !date) {
    return res.status(400).json({ error: "Both 'from,' 'to,' and 'date' parameters are required." });
  }

  try {
    const response = await axios.get(
      `https://indian-railway-api.cyclic.app/trains/gettrainon?from=${from}&to=${to}&date=${date}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from the API" });
  }
});
app.get("/route",async(req,res)=>{
  const{tno} = req.query;
  try{
    const respons = await axios.get(
      `https://indian-railway-api.cyclic.app/trains/getRoute?trainNo=${tno}`
    );
    res.json(respons.data);
  }catch(er){
    res.status(500).json({er: "failed to fetch"});
  }
});
app.get("/gettrain",async(req,res)=>{
  const{tnot} = req.query;
  try{
    const respons = await axios.get(
      `https://indian-railway-api.cyclic.app/trains/getTrain/?trainNo=${tnot}`
    );
    res.json(respons.data);
  }catch(er){
    res.status(500).json({er: "failed to fetch"});
  }
});

app.get("/", async (req, res) => {
  res.send('success');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
