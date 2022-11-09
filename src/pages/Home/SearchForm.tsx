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
    getList(values.query).then((snapshot) => {
      // console.log(snapshot.docs[0].data());
      // console.log(snapshot.docs[snapshot.docs.length - 1]);
      snapshot.forEach((item) => console.log(item.data()));
    });
  };
  return (
    <Form handleSubmit={makeQuery}>
      <Input id="query" type="text" label="Szukaj" />
    </Form>
  );
};

export { SearchForm };
