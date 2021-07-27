import { httpGet } from './mock-http-interface';

// Utility Type - Generic Lookup Union for a defined key value, with others optional and undefined
type OneOf<T> = {
  [K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, undefined>>
}[ keyof T ]

type PossibleResults = {
  'Arnie Quote': string,
  FAILURE: string
}

type TResult = OneOf<PossibleResults>

export const getArnieQuotes = async (urls : string[]) : Promise<TResult[]> => {
  const responses = await Promise.all(urls.map(url => httpGet(url)));
  
  return responses.map(({ status, body }) => {
    const key = status === 200 ? 'Arnie Quote' : 'FAILURE';
    return { [key]: JSON.parse(body).message } as TResult;
  })
};
