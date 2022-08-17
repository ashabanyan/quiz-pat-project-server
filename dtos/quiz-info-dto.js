module.exports = class QuizDTO {
  id;
  name;
  category_id;
  level_id;
  creator_id;
  cover_id;
  access_roles_id;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.category_id = model.category_id;
    this.level_id = model.level_id;
    this.creator_id = model.creator_id;
    this.cover_id = model.cover_id;
    this.access_roles_id = model.access_roles_id;
  }
};
