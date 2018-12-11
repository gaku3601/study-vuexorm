// Comment Model
import { Model } from '@vuex-orm/core'
import Post from './post'

export default class Comment extends Model {
  static entity = 'comments'

  // `this.belongsTo` is for the belongs to relationship.
  static fields () {
    return {
      id: this.attr(null),
      post_id: this.attr(null),
      comment: this.attr(''),
      post: this.belongsTo(Post, 'post_id')
    }
  }
}