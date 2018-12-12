<template>
  <div class="home">
    <div>
      <h1>これは何？</h1>
      <p>vuex-ormを利用方法を勉強している際にできたページ</p>
      <p>stateはstoreフォルダ内にある3つ(user、post、comment)</p>
      <p>ユーザ(user)が、記事(post)を投稿でき、記事事にコメント(comment)をつけれるようなサービスを想定</p>
      <p>以下URLにコードは格納。localにcloneしてfirebase/configを自分で作成したfirebaseに接続を変えて検証するとわかりやすいかも</p>
      <a href="https://github.com/gaku3601/study-vuexorm">https://github.com/gaku3601/study-vuexorm</a>
      <h1>参考文献</h1>
      <a href="https://vuex-orm.github.io/vuex-orm/">リファレンス</a>
    </div>
    <div>
    <h2>firebaseへ格納</h2>
    <h3>ユーザ情報の格納</h3>
    <p>ユーザ名</p>
    <input v-model="name" />
    <p>email</p>
    <input v-model="email" />
    <button @click="insertUserToFirestore">ユーザ情報を格納!</button>
    </div>
    <div>
    <h3>記事情報の格納</h3>
    <p>user_id(※firebaseが出力するuserデータのidを記載)</p>
    <input v-model="user_id" />
    <p>タイトル</p>
    <input v-model="title" />
    <p>記事内容</p>
    <input v-model="body" />
    <button @click="insertPostToFirestore">記事を格納!</button>
    </div>
    <div>
    <h3>コメント情報の格納</h3>
    <p>post_id(※firebaseが出力するpostデータのidを記載)</p>
    <input v-model="post_id" />
    <p>コメント内容</p>
    <input v-model="comment" />
    <button @click="insertCommentToFirestore">コメントを格納!</button>
    </div>
    <h2>-----------------------[格納内容の表示]-------------------------</h2>
    <p>dataのall clear(押下した後、手動で更新してね(´・ω・`)b)</p>
    <button @click="clear">All Clear(´・ω・`)b</button>
    <div>
    <h3>user一覧</h3>
    <div>{{$store.getters['entities/users/all']()}}</div>
    </div>
    <div>
    <h3>post一覧(紐づくuser情報はauthorに入っている)</h3>
    <div>{{$store.getters['entities/posts']().with('author').get()}}</div>
    </div>
    <div>
    <h3>comment一覧(紐づくpost情報はpost、user情報はauthorに入っている)</h3>
    <div>{{$store.getters['entities/comments']().with('post.author').get()}}</div>
    </div>
    <h1>まとめ</h1>
    <p>storeへの格納は、各state(user,post,comment)毎に行えるのでコードの見通しがよくなる。</p>
    <p>かつ、各stateを結合して表示したい場合の結合処理を記述する必要がなく、非常に楽に結合した内容を表示できる。</p>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data () {
    return {
      name: '',
      email: '',
      user_id: '',
      title: '',
      body: '',
      post_id: '',
      comment: ''
    }
  },
  created () {
    // firestore data fetch
    this.$store.dispatch('entities/users/fetch')
    this.$store.dispatch('entities/posts/fetch')
    this.$store.dispatch('entities/comments/fetch')
  },
  methods: {
    insertUserToFirestore () {
      this.$store.dispatch('entities/users/post', {name: this.name, email: this.email})
      this.name = ''
      this.email = ''
    },
    insertPostToFirestore () {
      this.$store.dispatch('entities/posts/post', {user_id: this.user_id, title: this.title, body: this.body})
      this.user_id = ''
      this.title = ''
      this.body = ''
    },
    insertCommentToFirestore () {
      this.$store.dispatch('entities/comments/post', {post_id: this.post_id, comment: this.comment})
      this.post_id = ''
      this.comment = ''
    },
    clear () {
      this.$store.dispatch('entities/users/clear')
      this.$store.dispatch('entities/posts/clear')
      this.$store.dispatch('entities/comments/clear')
    }
  }
}
</script>
