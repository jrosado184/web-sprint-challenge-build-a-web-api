// add middlewares here related to actions

const Action = require("./actions-model");
const Projects = require("../projects/projects-model");

async function validateById(req, res, next) {
  const actionId = await Action.get(req.params.id);
  try {
    if (!actionId) {
      res
        .status(404)
        .json({ message: `the id ${req.params.id} does not exist` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function validateBody(req, res, next) {
  const { project_id, description, notes } = req.body;
  const projectId = await Projects.get();
  const checkExistingId = projectId.some(
    (project) => project.id === project_id
  );
  if (!project_id || !description || !notes) {
    res.status(400).json({ message: "please provide all required fields!" });
  } else if (!checkExistingId) {
    res.status(404).json({ message: `project ${project_id} does not exist` });
  } else {
    next();
  }
}

module.exports = {
  validateById,
  validateBody,
};
