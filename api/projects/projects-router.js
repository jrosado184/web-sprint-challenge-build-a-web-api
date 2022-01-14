// Write your "projects" router here!
const Projects = require("./projects-model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const projects = await Projects.get(req.params.id);
    if (!projects) {
      res.status(404).json({ message: "no project with that id exists" });
    } else {
      res.json(projects);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ message: "fill out all required fields" });
  } else {
    Projects.insert(req.body)
      .then((project) => {
        res.json(project);
      })
      .catch((error) => {
        res.json(error.message);
      });
  }
});

module.exports = router;
