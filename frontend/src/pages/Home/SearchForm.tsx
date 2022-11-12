import React, { SyntheticEvent } from "react";
import { Form, IFormValues } from "../../components/Form";
import Input from "../../components/Input";
import { useFixtureList } from "../../hooks/fixture";

interface ISearchFormProps {
  children?: JSX.Element | JSX.Element[];
}

const SearchForm: React.FC<ISearchFormProps> = (props: ISearchFormProps) => {
  const { getList } = useFixtureList();

  const makeQuery = (ev: SyntheticEvent, values: IFormValues) => {
    ev.preventDefault();
    console.log("query", values);
  };
  return (
    <Form handleSubmit={makeQuery}>
      <Input id="query" type="text" label="Szukaj" />
    </Form>
  );
};

export { SearchForm };
