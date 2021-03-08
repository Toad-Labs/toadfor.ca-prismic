import { BlogTeaser } from '../blog-teaser';

export class HomeBlogPostsContentBlock {

  type = 'homeBlogPosts';
  title = '';
  text = '';

  blogPostIds = [];

  error = null;

  constructor(data) {
    this.title = data.title || '';
    this.text = data.text || '';

    // Assign the call to action buttons array
    if (Array.isArray(data.blogPostIds)) {
      this.blogPostIds = data.blogPostIds;
    }

  }

}
