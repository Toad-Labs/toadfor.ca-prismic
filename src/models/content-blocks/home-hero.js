export class HomeHeroContentBlock {

  type = 'homeHero';
  title = '';
  text = '';
  image = {
    src: null,
    alt: null,
  }

  ctaButtons = [];

  error = null;

  constructor(data) {
    this.title = data.title || '';
    this.text = data.text || '';

    // Set the cover image
    this.image.src = data.image?.src || null;
    this.image.alt = data.image?.alt || null;

    // Assign the call to action buttons array
    if (Array.isArray(data.contentBlocks)) {
      this.contentBlocks = data.contentBlocks;
    }
  }

}
