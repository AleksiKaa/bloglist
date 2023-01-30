const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(b => b.likes).reduce((prev, cur) => prev + cur, 0)
}

const favoriteBlog = (blogs) => {
    let fav = { likes: 0 }
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > fav.likes) fav = blogs[i]
    }

    return fav
}

const mostBlogs = (blogs) => {
    const map = new Map()

    const authors = blogs.map(b => b.author)

    for (let i = 0; i < authors.length; i++) {
        if (map.get(authors[i]) === undefined) {
            map.set(authors[i], 1)
        } else {
            const temp = map.get(authors[i])
            map.set(authors[i], temp + 1)
        }
    }

    const best = [...map.entries()].reduce((a, e) => e[1] > a[1] ? e : a)

    return {
        author: best[0],
        blogs: best[1]
    }
}

const mostLikes = (blogs) => {
    const map = new Map()

    for (let i = 0; i < blogs.length; i++) {
        if (map.get(blogs[i].author) === undefined) {
            map.set(blogs[i].author, blogs[i].likes)
        } else {
            const temp = map.get(blogs[i].author)
            map.set(blogs[i].author, temp + blogs[i].likes)
        }
    }

    const best = [...map.entries()].reduce((a, e) => e[1] > a[1] ? e : a)

    return {
        author: best[0],
        likes: best[1]
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}