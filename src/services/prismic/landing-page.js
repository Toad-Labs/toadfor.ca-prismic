import Prismic from '@prismicio/client';
import PrismicDOM from 'prismic-dom';
import { apiEndpoint } from './api';
import { LandingPage } from '../../models/landing-page';

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
function getLandingPageDataByUid(uid, successCallback, errorCallback) {

  var payload = {
    found: null,
    error: null,
    landingPage : null,
  }

  console.log('UID:', uid);

  Prismic.client(apiEndpoint).query([
    Prismic.Predicates.at('my.landing_page.uid', uid),
    Prismic.Predicates.at('document.type', 'landing_page')
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
        response.results[0].data.body?.forEach(element => {

          // Rich text content type
          // TODO: have the type default assigned
          if (element.slice_type === "richtext") {
            const richTextContentBlock = new RichTextContentBlock({
              type : element.slice_type,
              contentHTML : PrismicDOM.RichText.asHtml(element.primary.text),
            })
            contentBlocks.push(richTextContentBlock);
          }

          // Rich text content type
          if (element.slice_type === "image") {
            const blogPostImageContentBlock = new BlogPostImageContentBlock({
              image : {
                src : element.primary.img.medium.url,
                alt : element.primary.img.medium.alt,
              }
            })
            contentBlocks.push(blogPostImageContentBlock);
          }

          // Rich text content type
          if (element.slice_type === "quote") {
            const blogPostQuoteContentBlock = new BlogPostQuoteContentBlock({
              quote : {
                text : PrismicDOM.RichText.asText(element.primary.quote),
                author : PrismicDOM.RichText.asText(element.primary.name_of_the_author),
              }
            })
            contentBlocks.push(blogPostQuoteContentBlock);
          }

          // Rich text content type
          if (element.slice_type === "embed") {
            const blogPostEmbedContentBlock = new BlogPostEmbedContentBlock({
              embed : {
                html : element.primary.embed.html
              }
            })
            contentBlocks.push(blogPostEmbedContentBlock);
          }

        });

        // Convert the response data into the BlogPost model
        const landingPage = new LandingPage({
          id : response.results[0].id,
          uid : response.results[0].uid,
          title : PrismicDOM.RichText.asText(response.results[0].data.title),
          brief : PrismicDOM.RichText.asText(response.results[0].data.brief),
          coverImage : {
            src : response.results[0].data.cover_image.url,
            alt : response.results[0].data.cover_image.alt,
          },
          contentBlocks,
        })

        //state.documentId = response.results[0].id;
        //state.slices = response.results[0].data.page_content;


        // Setup the payload object
        payload.found = true;
        payload.landingPage = landingPage;

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
  getLandingPageDataByUid
}
