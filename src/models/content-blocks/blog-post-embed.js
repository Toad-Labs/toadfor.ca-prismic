export class BlogPostEmbedContentBlock {

  type = 'blogEmbed';

  embed = {
    html: null,
  }

  error = null;

  constructor(data) {

    // Set the embed attributes
    this.embed.html = data.embed?.html || null;

    // this.image.src = data.image?.src || null;
    // this.image.alt = data.image?.alt || null;

    // Make sure that the src attribute is set
    //if (this.image.src === null || this.image.src === '') {
    //  this.error = true;
    //}

  }

}
