export class BlogPost {

  id = null;
  uid = null;
  title = '';
  date = null;

  coverImageSrc = null;
  coverImageAlt = null;

  contentBlocks = [];

  constructor(data) {
    this.id = data.id || null;
    this.uid = data.uid || null;
    this.title = data.title || '';

    // Set date value
    if (data.date) {
      this.date = new Date(data.date)
    }

    // Set the cover image
    this.coverImageSrc = data.coverImageSrc || null;
    this.coverImageAlt = data.coverImageAlt || null;

    // Assign the content blocks
    if (Array.isArray(data.contentBlocks)) {
      this.contentBlocks = data.contentBlocks;
    }

  }

}
