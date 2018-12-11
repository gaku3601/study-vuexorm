<template>
  <div class="home">
    <div>
    <p>user</p>
    <div>{{$store.getters['entities/users/all']()}}</div>
    <button @click="insertUser2">click!2</button>
    </div>
    <div>
    <p>post</p>
    <div>{{$store.getters['entities/posts']().with('author').get()}}</div>
    <button @click="insertPost">click!</button>
    </div>
    <div>
    <p>comment</p>
    <div>{{$store.getters['entities/comments']().with('post.author').get()}}</div>
    <button @click="insertCommnet">click!</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  created () {
    this.$store.dispatch('entities/users/insert', { data: {id: 1, name: 'gaku', email: 'pro.gaku@gmail.com'} })
    this.$store.dispatch('entities/users/insert', { data: {id: 2, name: 'gaku2', email: 'pro.gaku@gmail.com'} })
  },
  methods: {
    insertUser2 () {
      this.$store.dispatch('entities/users/insert', { data: {id: 3, name: 'gaku3', email: 'pro.gaku@gmail.com'} })
    },
    insertPost () {
      this.$store.dispatch('entities/posts/insert', { data: {id: 123, user_id: 2, title: 'test', body: 'こんにちわ！', publish: true} })
    },
    insertCommnet () {
      this.$store.dispatch('entities/comments/insert', { data: {id: 1, post_id: 123, comment: 'test' }})
    }
  }
}
</script>
