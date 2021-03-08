export class RichTextContentBlock {

  type = 'richText';
  contentHTML = null;
  error = null;

  constructor(data) {
    this.contentHTML = data.contentHTML || '';
  }

}
