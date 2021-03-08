export class BlogPostImageContentBlock {

  type = 'blogImage';
  image = {
    src: null,
    alt: null,
  }

  error = null;

  constructor(data) {

    // Set the image attributes
    this.image.src = data.image?.src || null;
    this.image.alt = data.image?.alt || null;

    // Make sure that the src attribute is set
    if (this.image.src === null || this.image.src === '') {
      this.error = true;
    }

  }

}
