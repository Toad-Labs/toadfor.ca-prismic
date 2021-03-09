import { getBlogPostDataById } from './blog-post';
import { getBlogTeaserData, getBlogTeaserDataByIds } from './blog-teaser';
import { getHomeContentData } from './home-content';
import { getLandingPageDataByUid } from './landing-page';

// Default config options
const baseDomain = 'https://toadforca.cdn.prismic.io';
const apiVersion = 'v2';
const apiEndpoint = `${baseDomain}/api/${apiVersion}`;

export {
  apiEndpoint,
  getBlogPostDataById,
  getBlogTeaserData,
  getBlogTeaserDataByIds,
  getHomeContentData,
  getLandingPageDataByUid,
};


