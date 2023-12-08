'use client';
import { PostSearch } from '@/components/PostSearch';
import { Posts } from '@/components/posts';
import { getAllPosts } from '@/services/getPosts';
import { Metadata } from 'next';
import { useEffect, useState } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
  title: 'Blog | Next Blog App',
};

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Blog page</h1>
      <PostSearch onSearch={setPosts} />
      {loading ? <Loading /> : <Posts posts={posts} />}
    </>
  );
}
