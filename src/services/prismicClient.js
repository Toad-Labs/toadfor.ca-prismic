import Prismic from '@prismicio/client';
import PrismicDOM from 'prismic-dom';

const baseDomain = 'https://toadforca.cdn.prismic.io';
const apiVersion = 'v2';
const apiEndpoint = `${baseDomain}/api/${apiVersion}`;

// Setup the Prismic client object
const client = Prismic.client(apiEndpoint);


export default class PrismicClient {

  // Base query wrapper
  static query(pqData, successCallback, errorCallback) {
    Prismic.client(apiEndpoint).query(pqData)
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
    const prismicQuery = Prismic.Predicates.at('document.type', 'homepage');

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
        }
      });

      const data = {
        sections: sections,
      }

      successCallback(data);
    } ,
    (responseError) => {
      console.log('You suck', responseError);
      errorCallback(responseError);
    });
  }

  // Normalise the home page data

}

/*

export default {

  getHomePageData() {
    return Prismic.client(apiEndpoint).getSingle('homepage')
      .then(document => {
        // response is the response object, response.results holds the documents
        console.log("Document", document);
        return document.data;
      });
  },

  getHomePageHeroContent() {

    var data;

    Prismic.client(apiEndpoint).getSingle('homepage')
      .then(document => {
        // response is the response object, response.results holds the documents
        console.log("Document", document);
        data = document.data
      }, function(err) {
        console.log("Something went wrong: ", err);
    });

    console.log("Document", data);

    return data;

  }

}
*/
