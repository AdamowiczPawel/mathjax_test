import express from "express";
import cors from "cors";
import { handleGenerateSVG } from "./handleGenerateSVG.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/", (req, res) => {
  res.send("Server is running");
});

app.get("/generateSVG", handleGenerateSVG);

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
