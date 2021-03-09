export class LandingPage {

  id = null;
  uid = null;

  title = '';
  brief = '';

  coverImage = {
    src: null,
    alt: null,
  }

  contentBlocks = [];

  error = null;

  constructor(data) {
    this.id = data.id || null;
    this.uid = data.uid || null;

    // Assign the title and brief text
    this.title = data.title || '';
    this.brief = data.brief || '';

    // Assign the cover image
    this.coverImage.src = data.coverImage?.src || null;
    this.coverImage.alt = data.coverImage?.alt || null;

    // Assign the content blocks
    if (Array.isArray(data.contentBlocks)) {
      this.contentBlocks = data.contentBlocks;
    }

  }

}
