import axios from 'axios';
import { useState } from 'react';

export default function useRequest({ url, method, body }) {
  const [errors, setErrors] = useState(null);
  const [isErrored, setIsErrored] = useState(false);

  const filterErrors = (fieldName) => {
    if (!errors) return [];
    return errors.filter((val) => val.field === fieldName);
  };

  const getMiscErrors = () => {
    if (!errors) return [];
    return errors.filter((val) => !val.hasOwnProperty('field'));
  };

  const ErrorHelpText = ({ fieldName }) => {
    const filtered = filterErrors(fieldName);
    if (!filtered?.length > 0) return null;
    return filtered.map((val) => (
      <div key={val.message} className="invalid-feedback">
        {val.message}
      </div>
    ));
  };

  const MiscErrors = () => {
    const miscErrors = getMiscErrors();
    if (miscErrors.length === 0) return null;
    return (
      <div className="alert alert-danger">
        <h4>Oops</h4>
        <ul className="my-0">
          {errors.map((err) => (
            <li key={err.message}>{err.message}</li>
          ))}
        </ul>
      </div>
    );
  };

  const determineRequired = (fieldName) => filterErrors(fieldName).length > 0;

  const validationClassname = (fieldName) => {
    const def = 'form-control';
    const errorExists = filterErrors(fieldName).length > 0;
    if (errorExists) {
      return def + ' is-invalid';
    }
    return def;
  };

  const errorStyling = (fieldName) => {
    return {
      className: validationClassname(fieldName),
      required: determineRequired(fieldName),
    };
  };

  const doRequest = () => {
    return axios({ url, method: method.toLowerCase(), data: body }).catch(
      (err) => {
        setErrors(err.response.data.errors);
        setIsErrored(true);
        throw err;
      }
    );
  };

  return {
    doRequest,
    errors,
    isErrored,
    errorStyling,
    ErrorHelpText,
    MiscErrors,
  };
}
