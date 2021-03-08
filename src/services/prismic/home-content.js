import Prismic from '@prismicio/client';
import PrismicDOM from 'prismic-dom';
import { apiEndpoint } from './api';
import { HomeContent } from '../../models/home-content';
import { HomeHeroContentBlock } from '../../models/content-blocks/home-hero';
import { HomeBlogPostsContentBlock } from '../../models/content-blocks/home-blog-posts';
import { getBlogTeaserDataByIds } from './blog-teaser';

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
function getHomeContentData(successCallback, errorCallback) {

  var payload = {
    found: null,
    error: null,
    homeContent : null,
  }

  Prismic.client(apiEndpoint).query([
    Prismic.Predicates.at('document.type', 'homepage')
  ])
    .then(response => {

        console.log(response);

        // Check if a result was found
        if (response.results.length === 0) {

          // Setup the payload object
          payload.found = false;

        }
        else {

          var contentBlocks = [];

          // First create an array of content blocks
          response.results[0].data.body.forEach(element => {

            // Home Hero Slice adapted to a Home Hero content block
            if (element.slice_type === "hero") {
              const homeHero = new HomeHeroContentBlock({
                type: 'homeHero',
                title: PrismicDOM.RichText.asText(element.primary.title),
                text: PrismicDOM.RichText.asText(element.primary.sub_title),
                image: {
                  src: element.primary.image.url,
                  alt: element.primary.image.alt,
                }
              });
              contentBlocks.push(homeHero);
            }

            // Home Blog Article Teaser Slice adapted to a Home Blog Article Teaser content block
            if (element.slice_type === "home_blog_posts") {

              // Get the IDS for the teaser blog posts
              var blogPostIds = [];
              //var something;
              element.items?.forEach(item => {
                blogPostIds.push(item.blog_post.id);
              });

              const homeBlogPosts = new HomeBlogPostsContentBlock({
                type: 'homeBlogPosts',
                title: PrismicDOM.RichText.asText(element.primary.title),
                text: PrismicDOM.RichText.asText(element.primary.sub_title),
                blogPostIds: blogPostIds,
              });

              contentBlocks.push(homeBlogPosts);

            }

          });

          // Convert the response data into the Home Content model
          const homeContent = new HomeContent({
            id: response.results[0].id,
            uid: response.results[0].uid,
            contentBlocks,
          });

          //state.documentId = response.results[0].id;
          //state.slices = response.results[0].data.page_content;
          // Setup the payload object
          payload.found = true;
          payload.homeContent = homeContent;

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
  getHomeContentData
}
