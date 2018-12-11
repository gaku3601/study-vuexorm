// Post Model
import { Model } from '@vuex-orm/core'
import User from './user'

export default class Post extends Model {
  static entity = 'posts'

  // `this.belongsTo` is for the belongs to relationship.
  static fields () {
    return {
      id: this.attr(null),
      user_id: this.attr(null),
      title: this.attr(''),
      body: this.attr(''),
      published: this.attr(false),
      author: this.belongsTo(User, 'user_id')
    }
  }
}