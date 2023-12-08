const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error('Unable to fetch posts.');
  }
  return response.json();
};

export const getAllPosts = async () => {
  const response = await fetch(apiUrl);
  return handleResponse(response);
};

export const getPostsBySearch = async (search: string) => {
  const response = await fetch(`${apiUrl}?q=${search}`);
  return handleResponse(response);
};
