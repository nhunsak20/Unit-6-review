module.exports = {
  getPosts: async (req, res) => {
    let { id } = req.params
    const db = req.app.get('db')
    let posts = await db.get_posts(id)
    if (posts[0]){
      posts.forEach((e,i) => {
        posts[i].p_time = e.p_time.toDateString()
      })
      res.status(200).send(posts)
    } else {
      res.sendStatus(500);
    }
  },
  addPost: (req, res) => {
    //#user id
    let { id } = req.params
    const { post } = req.body
    const db = req.app.get('db')
    db.add_post([id, post, new Date()]).then(()=> {
      res.sendStatus(201)
    }).catch(() => {
      res.sendStatus(500)
    })
  
  },
  editPost: (req, res) => {
    //#post id
    let { id } = req.params
    const { text } = req.body
    const db = req.app.get('db')

    console.log(`update: ${id}, text: ${text}`)

    db.edit_post([id, text]).then(() => {
      res.sendStatus(200)
    }).catch(() => {
      res.sendStatus(500)
    })
  },
  deletePost: async (req, res) => {
    //#post id
    let { id } = req.params
    const db = req.app.get('db')

    await db.delete_post(id).then(()=> {
      res.sendStatus(200)
    }).catch(() => {
      res.sendStatus(500)
    })
    
  }
};
