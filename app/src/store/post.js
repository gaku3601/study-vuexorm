// Post Model
import { Model } from '@vuex-orm/core'
import {User} from './user'
import { firestore } from '@/firebase'

export class Post extends Model {
  static entity = 'posts'

  // `this.belongsTo` is for the belongs to relationship.
  static fields () {
    return {
      id: this.attr(null),
      user_id: this.attr(null),
      title: this.attr(''),
      body: this.attr(''),
      author: this.belongsTo(User, 'user_id')
    }
  }
}

export const posts = {
  actions: {
    async post ({ commit }, {user_id, title, body}) { // eslint-disable-line no-unused-vars
      await firestore.collection('post').add({
        user_id: user_id,
        title: title,
        body: body,
        timestamp: Date.now()
      })
    },
    async fetch () {
      await firestore.collection('post').onSnapshot(q => {
        q.forEach(doc => {
          this.dispatch('entities/posts/insert', { data: {id: doc.id, user_id: doc.data().user_id, title: doc.data().title, body: doc.data().body}})
        })
      })
    },
    async clear () {
      this.getters['entities/posts/all']().forEach(async item => {
        await firestore.collection('post').doc(item.$id).delete()
      })
    }
  }
}
