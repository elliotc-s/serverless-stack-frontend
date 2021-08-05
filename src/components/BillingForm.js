import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { CardElement, injectStripe } from "react-stripe-elements";
import LoaderButton from "./LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./BillingForm.css";

function BillingForm({ isLoading, onSubmit, ...props }) {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    storage: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return fields.name !== "" && fields.storage !== "" && isCardComplete;
  }

  async function handleSubmitClick(event) {
    event.preventDefault();

    setIsProcessing(true);

    // We have access to the following props.stripe.. because of the Higher Order Component use (see export default .. at bottom of file)
    const { token, error } = await props.stripe.createToken({
      name: fields.name,
    });

    setIsProcessing(false);

    onSubmit(fields.storage, { token, error });
  }

  return (
    <Form className="BillingForm" onSubmit={handleSubmitClick}>
      <Form.Group size="lg" controlId="storage">
        <Form.Label>Storage</Form.Label>
        <Form.Control
          min="0"
          type="number"
          value={fields.storage}
          onChange={handleFieldChange}
          placeholder="Number of notes to store"
        />
      </Form.Group>
      <hr />
      <Form.Group size="lg" controlId="name">
        <Form.Label>Cardholder&apos;s name</Form.Label>
        <Form.Control
          type="text"
          value={fields.name}
          onChange={handleFieldChange}
          placeholder="Name on the card"
        />
      </Form.Group>
      <Form.Label>Credit Card Info</Form.Label>
      <CardElement
        className="card-field"
        onChange={(e) => setIsCardComplete(e.complete)}
        style={{
          base: {
            fontSize: "16px",
            color: "#495057",
            fontFamily: "'Open Sans', sans-serif",
          },
        }}
      />
      <LoaderButton
        block
        size="lg"
        type="submit"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Purchase
      </LoaderButton>
    </Form>
  );
}

/*
    https://serverless-stack.com/chapters/create-a-billing-form.html
    To begin with we are going to wrap our component with a Stripe module using the injectStripe HOC.
    A Higher-Order Component (or HOC), is one that takes a component and returns a new component.
    It wraps around a given component and can add additional functionality to it.
    In our case, this gives our component access to the props.stripe.createToken method.
*/
export default injectStripe(BillingForm);