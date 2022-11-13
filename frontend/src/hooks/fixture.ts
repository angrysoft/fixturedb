import { useApi } from "./useApi";


const useFixtureList = () => {
  const {results, call, loading, error} = useApi();

  const getList = (queryString: string, itemsLimit: number = 25, offset?: number) => {
    
  }

  return { getList, loading };
}

export { useFixtureList };