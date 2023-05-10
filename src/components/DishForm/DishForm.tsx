import React from 'react';
import { Field, reduxForm, InjectedFormProps, reset, formValueSelector } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import './DishForm.css';

interface FormData {
  name: string;
  dishType: string;
  preparation_time: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}

const DishForm: React.FC<InjectedFormProps<FormData>> = (props) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();

  const onSubmit = (values: FormData) => {
    console.log(values);
    fetch('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(json => {
        console.log(json);
        dispatch(reset('DishForm'));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const dishType = useSelector((state: any) =>
    formValueSelector<FormData>('DishForm')(state, 'type')
  );
  
  const renderAdditionalFields = () => {
    if (dishType) {
      if (dishType === 'pizza') {
        return (
          <>
            <div className="fieldContainer">
              <label htmlFor="no_of_slices" className="label">Number of Slices:</label>
              <Field name="no_of_slices" component="input" className="input" type="number" required />
            </div>
            <div className="fieldContainer">
              <label htmlFor="diameter" className="label">Diameter:</label>
              <Field name="diameter" component="input" className="input" type="number" step="0.01" required />
            </div>
          </>
        );
      } else if (dishType === 'soup') {
        return (
          <div className="fieldContainer">
            <label htmlFor="spiciness_scale" className="label">Spiciness Scale (1-10):</label>
            <Field name="spiciness_scale" component="input" className="input" type="number" min="1" max="10" required />
          </div>
        );
      } else if (dishType === 'sandwich') {
        return (
          <div className="fieldContainer">
            <label htmlFor="slices_of_bread" className="label">Slices of Bread:</label>
            <Field name="slices_of_bread" component="input" className="input" type="number" required />
          </div>
        );
      }
    }
    return null;
  };

  return (
    <form className="myForm" onSubmit={handleSubmit(onSubmit)}>
    <div className="fieldContainer">
      <label className="label" htmlFor="name">Dish Name:</label>
      <Field className="input" name="name" component="input" type="text" required />
    </div>
    <div className="fieldContainer">
      <label className="label" htmlFor="preparation_time">Preparation Time (HH:MM:SS):</label>
      <Field className="input" name="preparation_time" component="input" type="time" step='1' required />
    </div>
    <div className="fieldContainer">
      <label className="label" htmlFor="dishType">Dish Type:</label>
      <Field className="select" name="type" component="select" required>
          <option value="">Select</option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </Field>
    </div>
    {renderAdditionalFields()}
    <div className="additionalFieldsContainer">
      <button className="submitButton" type="submit">Submit</button>
    </div>
  </form>
);
};

export default reduxForm<FormData>({
form: 'DishForm',
})(DishForm);
