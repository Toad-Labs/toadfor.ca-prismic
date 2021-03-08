export class HomeContent {

  id = null;
  uid = null;

  contentBlocks = [];

  constructor(data) {
    this.id = data.id || null;
    this.uid = data.uid || null;

    // Assign the content blocks
    if (Array.isArray(data.contentBlocks)) {
      this.contentBlocks = data.contentBlocks;
    }

  }

}
