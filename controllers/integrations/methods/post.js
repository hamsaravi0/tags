const axiosPostByTagClient = require('../client')

const URL = process.env.API_ENDPOINT || "https://api.hatchways.io/assessment/blog/posts?tag=";

const getPostsbyTag = (tag) => {
    return axiosPostByTagClient.get(URL + `${tag}`);
}

module.exports = getPostsbyTag;
