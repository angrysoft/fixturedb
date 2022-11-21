import React, { SyntheticEvent, useContext, useEffect } from "react";
import Button from "../../components/Button";
import { Form, IFormValues } from "../../components/Form";
import Input from "../../components/Input";
import { useApi } from "../../hooks/useApi";
import { AppContext } from "../../store/store";

interface ISearchFormProps {
  children?: JSX.Element | JSX.Element[];
}

const SearchForm: React.FC<ISearchFormProps> = (props: ISearchFormProps) => {
  const { call, loading, error, results} = useApi();
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    if (! error && !loading && results) {
      dispatch({type: "FIXTURE_LIST_LOADED", payload: results})
    }
  }, [results, error, loading, dispatch]);

  const makeQuery = (ev: SyntheticEvent, values: IFormValues) => {
    ev.preventDefault();
    dispatch({type: "FIXTURE_SEARCH_CALL"})
    call(`/api/v1/search/${values.query}`, {method: "GET"})
  };

  return (
    <Form handleSubmit={makeQuery}>
      <Input id="query" type="text" label="Szukaj" />
      <Button>Szukaj</Button>
    </Form>
  );
};

export { SearchForm };
