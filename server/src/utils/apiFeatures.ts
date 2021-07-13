export class ApiFeatures {
  constructor(public query, public queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const location = this.queryString.location
      ? {
          address: {
            $regex: this.queryString.location,
            $options: 'i'
          }
        }
      : {};
    this.query = this.query.find(location);
    return this;
  }

  filter() {
    const queryStringCopy = { ...this.queryString };
    const excludedFields = ['page', 'location'];
    excludedFields.forEach((field) => delete queryStringCopy[field]);
    this.query = this.query.find(queryStringCopy);
    return this;
  }

  paginate(itemsPerPage: number) {
    const currentPage = this.queryString.page || 1;
    const skip = itemsPerPage * (currentPage - 1);
    this.query = this.query.limit(itemsPerPage).skip(skip);
    return this;
  }
}
