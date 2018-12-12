// Comment Model
import { Model } from '@vuex-orm/core'
import {Post} from './post'
import {firestore} from '@/firebase'

export class Comment extends Model {
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

export const comments = {
  actions: {
    async post ({ commit }, {post_id, comment}) { // eslint-disable-line no-unused-vars
      await firestore.collection('comment').add({
        post_id: post_id,
        comment: comment,
        timestamp: Date.now()
      })
    },
    async fetch () {
      await firestore.collection('comment').onSnapshot(q => {
        q.forEach(doc => {
          this.dispatch('entities/comments/insert', { data: {id: doc.id, post_id: doc.data().post_id, comment: doc.data().comment}})
        })
      })
    },
    async clear () {
      this.getters['entities/comments/all']().forEach(async item => {
        await firestore.collection('comment').doc(item.$id).delete()
      })
    }
  }
}
