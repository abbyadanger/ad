Warning - This will be really technical and probably boring if you don't like to code ... <3

Slowly, but surely, I am implementing more and more (mini) features into this website that have been fun but challenging to create. I felt as though the blog post component was lacking and wanted to spice it up a little bit. I noticed on a lot of other tech blogs, read-time estimators are pretty popular features, among display other (kinda useless) metadata - So I decided I can build my own read-time estimator :)

Previously, the only data I was displaying in the blog post component was text directly from the markdown files that I write my blog content into (I'm writing THIS blog post content into a markdown right now actually) So I was manually writing metadata (like date, time, and the title) at the top of the page.

However, manually writing this data direcitly into the markdown files posed an issue if I also wanted to add a read-time estimator because I'd have to manually estimate how long I *think* it would take to read a blog post and then *manually* write it into the top of the file. Lots of *manual* stuff .... Which is slow & hard to remember to do & leaves room for error. I needed a way to *dynamically* estimate the read-time of these markdown files so that when I display the data from the markdown file, the read-time is *automatically* calculated.

(Does this make sense? I feel like I've never annotated something I've coded so much lol)

So in order to reduce all the manual work, I needed to add an organized record or log of all my blog posts that contain their metadata. Something like this:
```
{
  "posts": [
    {
      "id": "welcome",
      "filename": "welcome.md",
      "title": "Welcome to the blog :O",
      "dateFormatted": "10.28.2025",
      "slug": "welcome",
      "tags": ["personal", "intro"],
      "published": true,
      "readTime": null
    }
  ]
}
```[H-='
]