import React, { useCallback, useState } from "react";
import {
  Form as PolarisForm,
  FormLayout,
  Autocomplete,
} from "@shopify/polaris";
import { useDispatch } from "react-redux";
import { changeCurrentCity } from "../actions";

const Form = () => {
  const dispatch = useDispatch();
  const defaultOptions = [
    { value: "moscow", label: "Moscow" },
    { value: "paris", label: "Paris" },
    { value: "berlin", label: "Berlin" },
    { value: "dubai", label: "Dubai" },
    { value: "london", label: "London" },
  ];
  const [options, setOptions] = useState(defaultOptions);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(defaultOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = defaultOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [defaultOptions]
  );

  const updateSelection = useCallback(
    (selected) => {
      const [selectedItem] = selected;

      const matchedOption = options.find((option) =>
        option.value.match(selectedItem)
      );

      const selectedValue = matchedOption && matchedOption.label;

      setSelectedOptions(selected);
      setInputValue(selectedValue);
      dispatch(changeCurrentCity(selectedItem));
    },
    [options]
  );

  const handleSubmit = useCallback((_event) => {}, []);

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      value={inputValue}
      placeholder="Choose city"
    />
  );

  return (
    <PolarisForm onSubmit={handleSubmit} implicitSubmit={true}>
      <FormLayout>
        <Autocomplete
          options={options}
          selected={selectedOptions}
          onSelect={updateSelection}
          textField={textField}
        />
      </FormLayout>
    </PolarisForm>
  );
};

export default Form;
