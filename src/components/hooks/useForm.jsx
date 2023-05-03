import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;

    return setKey(name, value);
  };

  const setKey = (key, value) => {
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
