const { z } = require('zod');

const addSchoolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

const listSchoolsSchema = z.object({
  latitude: z.preprocess(val => parseFloat(val), z.number().min(-90).max(90)),
  longitude: z.preprocess(val => parseFloat(val), z.number().min(-180).max(180)),
});

function validate(schema, property) {
  return (req, res, next) => {
    try {
      schema.parse(req[property]);
      next();
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message,
        }))
      });
    }
  };
}

const validateSchoolInput = validate(addSchoolSchema, 'body');
const validateListSchools = validate(listSchoolsSchema, 'query');

module.exports = { validateSchoolInput, validateListSchools };