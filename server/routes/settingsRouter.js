import { Router } from "express";
const router = Router();

// router.post("/create", (req, res) => { });

router.patch("/update", (req, res) => { //likely uses params/query
  res.send("Update settings");
});

router.patch("archive", (req, res) => { }); //likely uses params/query

export { router as settingsRouter };
