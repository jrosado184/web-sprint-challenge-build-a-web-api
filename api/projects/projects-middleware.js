// add middlewares here related to projects
const Projects = require("./projects-model");

async function validateById(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
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
  const { name, description } = req.body;
  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "please fill in the required fields!" });
  }
  next();
}

module.exports = {
  validateById,
  validateBody,
};
