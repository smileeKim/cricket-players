const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();

app.use(express.json());

const dbPath = path.join(__dirname, "cricketTeam.db");
let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error ${e}`);
    process.exit(1);
  }
};
initializeDbAndServer();

// Get the Players Name
app.get("/players/", async (request, response) => {
  const getPlayersQuery = `SELECT * FROM cricket_team;`;
  const playersDetail = await db.all(getPlayersQuery);
  response.send(playersDetail);
});

// Create A New Player In The Team
app.post("/players/", (request, response) => {
  const playersDetails = request.body;
  console.log(playersDetails);
});
