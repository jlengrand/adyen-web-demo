import isEmail from 'validator/lib/isEmail';
import { User } from '../../../models';

const checkForExistingUser = async ({ username }) => {
  try {
    const existingUser = await User.find({ username });
    return existingUser && existingUser.length
      ? {
          message: 'Username unavailable',
          location: 'username'
        }
      : false;
  } catch (err) {
    console.error('ERROR CHECKING FOR EXISTING USER', err);
  }
};

const checkSizedFields = reqBody => {
  const sizedFields = {
    username: {
      min: 5,
      max: 15
    },
    password: {
      min: 7,
      max: 20
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(field => 'min' in sizedFields[field] && reqBody[field].trim().length < sizedFields[field].min);
  const tooLargeField = Object.keys(sizedFields).find(field => 'max' in sizedFields[field] && reqBody[field].trim().length > sizedFields[field].max);
  return tooSmallField || tooLargeField
    ? {
        message: tooSmallField
          ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
          : `Cannot exceed ${sizedFields[tooLargeField].max} characters`,
        location: tooSmallField || tooLargeField
      }
    : checkForExistingUser(reqBody);
};

const checkEmail = reqBody => {
  return isEmail(reqBody.email)
    ? checkSizedFields(reqBody)
    : {
        message: 'Invalid Email address',
        location: 'reqBody.email'
      };
};

const checkPasswordForInvalidChars = reqBody => {
  const invalidChars = /[ ]/g;
  return invalidChars.test(reqBody.password)
    ? {
        message: 'Password contains invalid characters',
        location: 'Password'
      }
    : checkEmail(reqBody);
};

const checkUsernameForInvalidChars = reqBody => {
  const invalidChars = /[^A-Za-z0-9]+/g;
  return invalidChars.test(reqBody.username)
    ? {
        message: 'Username can only contain numbers and letters',
        location: reqBody.username
      }
    : checkPasswordForInvalidChars(reqBody);
};

const checkFieldTypes = reqBody => {
  const stringFields = ['username', 'password', 'email'];
  const nonStringField = stringFields.find(field => field in reqBody && typeof reqBody[field] !== 'string');

  return nonStringField
    ? {
        message: 'Incorrect field type: expected string',
        location: nonStringField
      }
    : checkUsernameForInvalidChars(reqBody);
};

const checkRequiredFields = reqBody => {
  const requiredFields = ['username', 'password', 'email'];
  const missingField = requiredFields.find(field => !(field in reqBody));

  return missingField
    ? {
        message: 'Missing field',
        location: missingField
      }
    : checkFieldTypes(reqBody);
};

export const runUserValidation = reqBody => checkRequiredFields(reqBody);
