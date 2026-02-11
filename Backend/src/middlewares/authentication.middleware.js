const userJoiSchema = require("../validator/user.validation")

const userSchemaValidationApi = (req, res, next) => {
    const { error } = userJoiSchema.validate(req.body); 
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
  
  module.exports = userSchemaValidationApi;