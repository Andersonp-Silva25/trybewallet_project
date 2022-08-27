const CURRENCE_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrence = async () => {
  const response = await fetch(CURRENCE_API);
  const currences = await response.json();
  return currences;
};

export default getCurrence;
