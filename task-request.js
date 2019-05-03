class TaskPostRequest {
  constructor(categoryId, title) {
    this.categoryId = categoryId;
    this.title = title;
  }
}

class TaskPutRequest {
  constructor(categoryId, title, isFinished) {
    this.categoryId = categoryId;
    this.title = title;
    this.isFinished = isFinished;
  }
}
