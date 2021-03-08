export class BlogPostQuoteContentBlock {

  type = 'blogQuote';
  quote = {
    text: null,
    author: null,
  }

  error = null;

  constructor(data) {

    // Set the image attributes
    this.quote.text = data.quote?.text || null;
    this.quote.author = data.quote?.author || null;

  }

}
