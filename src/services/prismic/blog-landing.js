import Prismic from '@prismicio/client';
import PrismicDOM from 'prismic-dom';
import { apiEndpoint } from './api';
import { BlogLandingPage } from '../../models/blog-landing-page';

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
function getBlogLandingPageData(successCallback, errorCallback) {

  var payload = {
    found: null,
    error: null,
    blogLandingPage : null,
  }

  Prismic.client(apiEndpoint).query([
    Prismic.Predicates.at('document.type', 'blog_landing_page')
  ])
    .then(response => {

      console.log(response);

      // Check if a result was found
      if(response.results.length === 0) {

        // Setup the payload object
        payload.found = false;

      }
      else {

        console.log('Response data:', response.results[0]);

        // Convert the response data into the BlogPost model
        const blogLandingPage = new BlogLandingPage({
          id : response.results[0].id,
          title : PrismicDOM.RichText.asText(response.results[0].data.title),
          brief : PrismicDOM.RichText.asText(response.results[0].data.brief),
        })

        //state.documentId = response.results[0].id;
        //state.slices = response.results[0].data.page_content;

        // Setup the payload object
        payload.found = true;
        payload.blogLandingPage = blogLandingPage;

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
  getBlogLandingPageData
}
