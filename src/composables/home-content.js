import { reactive, toRefs } from 'vue';
import PrismicClient from '../services/prismicClient'


const state = reactive({
  error: null,
  page: null,
  sections: null,
  loaded: false,
});

/*
  page : {

  }
  sections : [
    {
      type: blah,
      ...
    }
  ]
  hero : {
    heading: "",
    image: {
      src: "",
      alt: ""
    }
    text: [
      "",
      ""
    ],
    links:[
      {

      }
    ]
  }
 */


export default function useHomeContent() {

  /* Load function
   *
   */
  function load() {
    if (!state.loaded) {
      try {

        // Get the products from the ShopifyClient Service and then
        // commit the products to the Products Store
        PrismicClient.getHomePageData(
          (data) => {
            console.log('Response Data', data);
            state.sections = data.sections;
          }, (err) => {
            // TO DO: Add error processing
            state.error = err;
          });

        state.loaded = true;

      } catch (e) {
        state.error = e;
      }
    }
  }

  return {
    ...toRefs(state),
    load,
  };

}
