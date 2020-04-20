import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true, $data: true });

const schema = {
  title: 'Design Schema',
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' , minLength: 2, maxLength : 3},
    workExperience: {
      description: 'Work experience in years',
      type: 'integer',
      minimum: 0,
      maximum: 100
    },
    profession: {
      type: 'string',
      options: [
        {
          label: 'Developer',
          value: 'developer'
        },
        {
          label: 'Tester',
          value: 'tester'
        },
        {
          label: 'Product owner',
          value: 'product-owner'
        },
        {
          label: 'Project manager',
          value: 'project-manager'
        },
        {
          label: 'Businessman',
          value: 'businessman'
        }
      ]
    },
    acceptTermsOfUse: { type: 'boolean' }
  },
  required: ['firstName', 'lastName']
};

function createValidator(schema) {
  const validator = ajv.compile(schema);

  return model => {
    validator(model);

    if (validator.errors && validator.errors.length) {
      throw { details: validator.errors };
    }
  };
}

const schemaValidator = createValidator(schema);

export default new JSONSchemaBridge(schema, schemaValidator);