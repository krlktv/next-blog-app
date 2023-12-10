'use client';

import Loading from '@/app/blog/loading';
import { getAllPosts } from '@/services/getPosts';
import Link from 'next/link';
import useSWR from 'swr';

const Posts = () => {
  const { data: posts, isLoading: loading } = useSWR('posts', getAllPosts);

  return loading ? (
    <Loading />
  ) : (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export { Posts };
