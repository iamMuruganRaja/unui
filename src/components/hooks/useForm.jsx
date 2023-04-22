import { useState } from "react";

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;

    return setKey(name, value);
  };

  const setKey = (key, value) => {
    if (validate[key] && !!validate[key](value)) {
      return { [key]: validate[key](value) };
    }

    setValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  return {
    form: values,
    handleChange,
    setKey,
  };
};

export default useForm;
