"use client";
import React from "react";
import { BackButton } from "../../components/BackButton";
import { Form } from "../components/Form";
import { InputGroup } from "../components/InputGroup";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { InputDatalist } from "../components/Datalist";

interface IAddFixtureProps {
  children?: JSX.Element | JSX.Element[];
}

const AddFixture: React.FC<IAddFixtureProps> = (props: IAddFixtureProps) => {
  const handleSubmit = () => {};
  return (
    <>
      <BackButton backTo="/admin" title={"Add New Fixture"} />
      <Form onSubmitHandle={handleSubmit} submitMethod="POST">
        <InputGroup>
          <InputDatalist label="Manufacture" id="manufacture" required listItems={[]} />
          <Input type="text" label="model" id="model" required />
          <Input type="number" label="Weight" id="weight" required />
        </InputGroup>
        <InputGroup>
          <Select
            id="type"
            label="Type"
            items={[
              { id: "0", name: "led" },
              { id: "1", name: "light" },
            ]}
            required
          />
        </InputGroup>
      </Form>
    </>
  );
};

export default AddFixture;
