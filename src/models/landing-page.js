export class LandingPage {

  id = null;
  uid = null;

  title = '';
  brief = '';

  contentBlocks = [];

  error = null;

  constructor(data) {
    this.id = data.id || null;
    this.uid = data.uid || null;

    // Assign the title and brief text
    this.title = data.title || '';
    this.brief = data.brief || '';

    // Assign the content blocks
    if (Array.isArray(data.contentBlocks)) {
      this.contentBlocks = data.contentBlocks;
    }

  }

}
