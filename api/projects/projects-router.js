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

router.put("/:id", async (req, res) => {
  try {
    const { name, description, completed } = req.body;
    const project = await Projects.get(req.params.id);
    const update = await Projects.update(req.params.id, req.body);
    if (!project) {
      res.status(404).json({ message: "id not found" });
    } else if (!name || !description) {
      res.status(400).json({ message: "fill out all required fields" });
    } else {
      res.json(update);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = await Projects.get(req.params.id);
    const removeProject = await Projects.remove(req.params.id);
    if (!id) {
      res.status(404).json("hey");
    } else {
      res.json(removeProject);
    }
  } catch (error) {}
});
router.get("/:id/actions", async (req, res) => {
  try {
    const action = await Projects.get(req.params.id);
    if (!action) {
      res.status(404).json({ message: "id does not exist" });
    } else {
      res.json(action);
    }
  } catch {}
});
router.get("/", (req, res) => {});
router.get("/", (req, res) => {});
router.post("/", (req, res) => {});
router.put("/", (req, res) => {});
router.delete("/", (req, res) => {});
module.exports = router;
