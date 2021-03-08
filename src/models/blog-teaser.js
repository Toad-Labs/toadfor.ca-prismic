export class BlogTeaser {

  id = null;
  uid = null;
  title = '';
  date = null;

  constructor(data) {
    this.id = data.id || null;
    this.uid = data.uid || null;
    this.title = data.title || '';

    // Set date value
    if (data.date) {
      this.date = new Date(data.date)
    }

  }

}
