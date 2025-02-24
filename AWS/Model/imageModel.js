class imageModel {
    constructor(id, userId, imageUrl, createdAt) {
      this.id = id;
      this.userId = userId;
      this.imageUrl = imageUrl;
      this.createdAt = createdAt;
    }
  }
  
  module.exports = imageModel;