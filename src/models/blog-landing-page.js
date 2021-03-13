export class BlogLandingPage {

  id = null;

  title = '';
  brief = '';

  // Removed the cover image
  // coverImage = {
  //  src: null,
  //  alt: null,
  // }

  error = null;

  constructor(data) {
    this.id = data.id || null;

    // Assign the title and brief text
    this.title = data.title || '';
    this.brief = data.brief || '';

    // Assign the cover image
    // this.coverImage.src = data.coverImage?.src || null;
    // this.coverImage.alt = data.coverImage?.alt || null;

  }

}
