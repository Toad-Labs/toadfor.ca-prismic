import Prismic from '@prismicio/client';
import PrismicDOM from 'prismic-dom';

const baseDomain = 'https://toadforca.cdn.prismic.io';
const apiVersion = 'v2';
const apiEndpoint = `${baseDomain}/api/${apiVersion}`;

// Setup the Prismic client object
const client = Prismic.client(apiEndpoint);

// Private helper classes
// titleblogs: [
// {
//  id: '',
//  title: '',
//  url: '',
// }
function normaliseBlogSummariesData(responseSuccess) {

  var normaliseData = [];

  // Walk through the results
  responseSuccess.results.forEach(element => {
    normaliseData.push({
      id: element.id,
      title: PrismicDOM.RichText.asText(element.data.title),
      uid: element.uid,
    });
  })

  return normaliseData;
}



// Public methods
export default class PrismicClient {

  // Base query wrapper
  static query(pqData, successCallback, errorCallback) {
    Prismic.client(apiEndpoint).query(...pqData)
      .then(successResponse => {
        // response is the response object, response.results holds the documents
        successCallback(successResponse);
      })
      .catch((errorResponse) => {
        console.log('Error', errorResponse);
        errorCallback(errorResponse);
      });
  }

  // Get the home page data
  static getHomePageData(successCallback, errorCallback) {
    const prismicQuery = [
        Prismic.Predicates.at('document.type', 'homepage')
    ]

    PrismicClient.query(prismicQuery,
    (responseSuccess) => {
      console.log('You da best', responseSuccess);

      // Normalise the data
      const responseData = responseSuccess.results[0].data;

      var sections = [];

      // Walk through the slices
      responseData.body.forEach(element => {

        switch(element.slice_type) {

          // Hero Slice type
          case 'hero':
            sections.push({
              type: 'hero',
              heading: PrismicDOM.RichText.asText(element.primary.title),
              text: PrismicDOM.RichText.asText(element.primary.sub_title),
              image: {
                src: element.primary.image.url,
                alt: element.primary.image.alt
              }
            });
            break;

          // Blog Articles Slice type
          case 'blog_articles':

            // Identify article ids
            var articleIds = [];

            element.items.forEach(el => {
              articleIds.push(el.blog_article.id);
            });

            sections.push({
              type: 'blog_articles',
              heading: PrismicDOM.RichText.asText(element.primary.title),
              text: PrismicDOM.RichText.asText(element.primary.sub_title),
              articleIds: articleIds,
            });
            break;
        }
      });

      const data = {
        sections: sections,
      }

      successCallback(data);
    },
    (responseError) => {
      console.log('You suck', responseError);
      errorCallback(responseError);
    });
  }


  // Get the home page data
  static getBlogSummariesDataByIds(ids, successCallback, errorCallback) {

    // TODO: Check input ids for errors

    var prismicQuery = [
      Prismic.Predicates.in('document.id', ids),
      {fetch: ['blog_post.title', 'blog_post.uid']}
    ]

    PrismicClient.query(
      prismicQuery,
      (responseSuccess) => {
        // Take the data we got, strip it, change the object names,
        // so that we can pass the data in a standardised way
        const data = normaliseBlogSummariesData(responseSuccess)
        successCallback(data);
      },
      (responseError) => {
        console.error('Whoops', responseError);
        errorCallback(responseError);
      });

  }

}
