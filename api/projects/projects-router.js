// Write your "projects" router here!
const Projects = require("./projects-model");
const { validateById, validateBody } = require("./projects-middleware");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateById, async (req, res, next) => {
  try {
    const projects = await Projects.get(req.params.id);
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateBody, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.json(project);
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/:id", validateById, validateBody, async (req, res, next) => {
  try {
    const update = await Projects.update(req.params.id, req.body);
    res.json(update);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateById, async (req, res, next) => {
  try {
    const removeProject = await Projects.remove(req.params.id);
    res.json(removeProject);
  } catch (error) {
    next(error);
  }
});
router.get("/:id/actions", validateById, async (req, res, next) => {
  try {
    const action = await Projects.getProjectActions(req.params.id);
    res.json(action);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    custom: "something went wrong on the projects router",
  });
});
module.exports = router;
