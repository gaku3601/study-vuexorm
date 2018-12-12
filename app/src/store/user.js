// User Model
import { Model } from '@vuex-orm/core'
import { firestore } from '@/firebase'

export class User extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'users'

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(''),
      email: this.attr('')
    }
  }
}

export const users = {
  actions: {
    async post ({ commit }, {name, email}) { // eslint-disable-line no-unused-vars
      await firestore.collection('user').add({
        name: name,
        email: email,
        timestamp: Date.now()
      })
    },
    async fetch () {
      await firestore.collection('user').onSnapshot(q => {
        q.forEach(doc => {
          this.dispatch('entities/users/insert', { data: {id: doc.id, name: doc.data().name, email: doc.data().email}})
        })
      })
    },
    async clear () {
      this.getters['entities/users/all']().forEach(async item => {
        await firestore.collection('user').doc(item.$id).delete()
      })
    }
  }
}
