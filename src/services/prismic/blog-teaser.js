import Prismic from '@prismicio/client';
import PrismicDOM from 'prismic-dom';
import { apiEndpoint } from './api';
import { BlogTeaser } from '../../models/blog-teaser';

/*
 * Function that returns a BlogPost object
 * as well as payload data (error, not found, etc.)
 *
 * payload = {
 *  found: true / false,
 *  error: null or truthy,
 *  blogTeasers: BlogTeaser[]
 * }
 *
 */
function getBlogTeaserData(successCallback, errorCallback) {

  var payload = {
    found: null,
    error: null,
    blogTeasers : [],
  }

  Prismic.client(apiEndpoint).query([
    Prismic.Predicates.at('document.type', 'blog_post')
  ])
    .then(response => {

      // Check if a result was found
      if(response.results.length === 0) {

        // Setup the payload object
        payload.found = false;

      }
      else {

        console.log(response);

        var blogTeasers = []

        // First create an array of blog teasers blocks
        response.results.forEach(element => {

          // Convert the response data into the BlogPost model
          const blogTeaser = new BlogTeaser({
            id : element.id,
            uid : element.uid,
            title : PrismicDOM.RichText.asText(element.data.post_main_title),
            date : element.first_publication_date,
          });

          blogTeasers.push(blogTeaser);

        });

        // Setup the payload object
        payload.found = true;
        payload.blogTeasers = blogTeasers;

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

function getBlogTeaserDataByIds(blogPostIds, successCallback, errorCallback) {

  var payload = {
    found: null,
    error: null,
    blogTeasers : [],
  }

  Prismic.client(apiEndpoint).query([
    Prismic.Predicates.in('document.id', blogPostIds),
    //{fetch: ['blog_post.title', 'blog_post.uid']}
  ])
    .then(response => {

      // Check if a result was found
      if(response.results.length === 0) {

        // Setup the payload object
        payload.found = false;

      }
      else {

        console.log(response);

        var blogTeasers = []

        // First create an array of blog teasers blocks
        response.results.forEach(element => {

          // Convert the response data into the BlogPost model
          const blogTeaser = new BlogTeaser({
            id : element.id,
            uid : element.uid,
            title : PrismicDOM.RichText.asText(element.data.post_main_title),
            date : element.first_publication_date,
          });

          blogTeasers.push(blogTeaser);

        });

        // Setup the payload object
        payload.found = true;
        payload.blogTeasers = blogTeasers;

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
  getBlogTeaserData,
  getBlogTeaserDataByIds,
}
