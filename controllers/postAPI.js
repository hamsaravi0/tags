const { default: axios } = require('axios');
const { InternalServerError } = require('../middleware/ErrorTypes');
const getPosts = require('./integrations/methods/post')

module.exports = {
  ping: (req, res, next) => {
    try {
      const r = { "success": true };
      return res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  },

  byTags: (req, res, next) => {
    const tags = req.query.tags.split(",");
    axios.all(tags.map((tag) => { return getPosts(tag) }))
      .then(axios.spread((...results) => {
        const accumulated = results.map((res) => { return res.data.posts });
        const ids = new Set(), consolidated = [];
        accumulated.forEach((posts) => {
          posts.forEach((post) => {
            if (!(ids.has(post.id))) {
              ids.add(post.id);
              consolidated.push(post);
            }
          })
        });
        const dir = req.query.direction || 'asc', sortBy = req.query.sortBy || 'id';
        consolidated.sort((postA, postB) => (dir === 'asc' ? 1 : -1) * (parseInt(postA[sortBy]) - parseInt(postB[sortBy])));
        const r = { "posts": consolidated };
        return res.status(200).json(r);
      }))
      .catch((e) => {
        next(InternalServerError);
      })
  }
}
