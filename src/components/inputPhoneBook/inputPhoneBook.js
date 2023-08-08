import React, { useState } from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";
import css from "./inputPhoneBook.module.css";

export default function InputPhoneBook({ submitChange }) {
  const [name, setName] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const [number, setNumber] = useState("");

  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   switch (name) {
  //     case "name":
  //       setName(value);
  //       break;

  //     case "number":
  //       setNumber(value);
  //       break;

  //     default:
  //       console.warn("ERROR");
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitChange({ name, number });
    setName("");
    setNumber("");
  };

  return (
    <div>
      <form type="submit" onSubmit={handleSubmit} className={css.formContainer}>
        <label className={css.labelStyle}>
          Name
          <Field
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChangeName}
            value={name}
          />
        </label>
        <label className={css.labelStyle}>
          Number
          <Field
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChangeNumber}
            value={number}
          />
        </label>

        <button type="submit" className={css.buttonAddStyle}>
          Add contact
        </button>
        <ErrorMessage name="name" component="div" />
      </form>
    </div>
  );
}

InputPhoneBook.propTypes = {
  submitChange: PropTypes.func.isRequired,
};
