const { Program } = require('../../../db');

const createProgram = async (req, res, next) => {
  try {
    const programObj = Program.makeProgramObject(req.body);
    const program = await Program.create(programObj);
    res.json(program);
  } catch (err) {
    next(err);
  }
};

module.exports = createProgram;
