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

module.exports = router;
