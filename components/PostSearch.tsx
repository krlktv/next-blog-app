'use client';
import { getPostsBySearch } from '@/services/getPosts';
import { FormEventHandler, useState } from 'react';
import useSWR from 'swr';

const PostSearch = () => {
  const { mutate } = useSWR('posts');
  const [search, setSearch] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      const posts = await getPostsBySearch(search);
      mutate(posts);
    } catch (error) {
      console.error('Error fetching posts');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='search' placeholder='search' value={search} onChange={handleInputChange} />
      <button type='submit'>Search</button>
    </form>
  );
};

export { PostSearch };
