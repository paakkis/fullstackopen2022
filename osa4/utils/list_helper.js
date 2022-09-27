var _ = require('lodash');

const dummy = (blogs) => {
    return 1
  }


const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((likes, blog) => {
            return likes += blog.likes
        }, 0)
}

const favoriteBlog = (blogs) => {
    var maxLikes = Math.max(...blogs.map(e => e.likes));
    var obj = blogs.find(blog => blog.likes === maxLikes);
    return blogs.length === 0
        ? 0
        : {
            "author": obj.author,
            "likes": obj.likes,
            "title": obj.title,
        }
}

const mostBlogs = (blogs) => {
    const blogsByAuthors = _.countBy(blogs, 'author')
    const authorWithMostBlogs = Object.entries(blogsByAuthors).reduce((a,b) => a[1] > b[1] ? a : b)
    return blogs.length === 0
        ? 0
        :  { 
                "author" : authorWithMostBlogs[0], 
                "blogs": authorWithMostBlogs[1] 
            }
}

const mostLikes = (blogs) => {
    const groupedBlogs = _.groupBy(blogs, 'author')
	const byLikes = _.mapValues(groupedBlogs, totalLikes)
    const authorWithMostLikes = Object.entries(byLikes).reduce((a,b) => a[1] > b[1] ? a : b)
    return blogs.length === 0
        ? 0 
        :  { 
                "author" : authorWithMostLikes[0], 
                "likes": authorWithMostLikes[1] 
            }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}