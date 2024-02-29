import { Args } from '../../types/types.js';

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export type CreatePost = {
  dto: Omit<Post, 'id'>;
};

export type ChangePost = CreatePost & Args;
