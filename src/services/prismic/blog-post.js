import Prismic from '@prismicio/client';
import PrismicDOM from 'prismic-dom';
import { apiEndpoint } from './api';
import { BlogPost } from '../../models/blog-post';
import { RichTextContentBlock } from '../../models/content-blocks/richtext';

/*
 * Function that returns a BlogPost object
 * as well as payload data (error, not found, etc.)
 *
 * payload = {
 *  found: true / false,
 *  error: null or truthy,
 *  blogPost: BlogPost
 * }
 *
 */
function getBlogPostDataById(uid, successCallback, errorCallback) {

  var payload = {
    found: null,
    error: null,
    blogPost : null,
  }

  Prismic.client(apiEndpoint).query([
    Prismic.Predicates.at('my.blog_post.uid', uid),
    Prismic.Predicates.at('document.type', 'blog_post')
  ])
    .then(response => {

      console.log(response);

      // Check if a result was found
      if(response.results.length === 0) {

        // Setup the payload object
        payload.found = false;

      }
      else {

        var contentBlocks = []

        // First create an array of content blocks
        response.results[0].data.body.forEach(element => {

          // Rich text content type
          if (element.slice_type === "richtext") {
            const richTextContentBlock = new RichTextContentBlock({
              type : element.slice_type,
              contentHTML : PrismicDOM.RichText.asHtml(element.primary.text),
            })
            contentBlocks.push(richTextContentBlock);
          }

        });

        // Convert the response data into the BlogPost model
        const blogPost = new BlogPost({
          id : response.results[0].id,
          uid : response.results[0].uid,
          date : response.results[0].first_publication_date,
          title : PrismicDOM.RichText.asText(response.results[0].data.post_main_title),
          coverImageSrc : response.results[0].data.main_image?.url,
          coverImageAlt : response.results[0].data.main_image?.alt,
          contentBlocks,
        })

        //state.documentId = response.results[0].id;
        //state.slices = response.results[0].data.page_content;


        // Setup the payload object
        payload.found = true;
        payload.blogPost = blogPost;

      }

      successCallback(payload);

    })
    .catch((errorResponse) => {

      // Setup the payload object
      payload.found = false;
      payload.error = errorResponse;

      errorCallback(payload);
    });

}

export {
  getBlogPostDataById
}
