I've been adding a lot of small (but mighty) features to the blog. It feels very rewarding to put hard work into something I enjoy - Here's what's new!
### Read Time Calculator
Honestly this is just something I've seen on several other blogs/websites and I wanted to see if I could build it. I also noticed some dead space at the top of my blog post pages and figured this would be the perfect thing to add - I love silly and useless things.
#### How it works
In the spirit of building *everything* on this website from scratch, this was no different. And also like *everything* on this website, this was wayyyyyy more complex than I thought. To accomplish this, I had to create & implement a system that stores [metadata](https://www.geeksforgeeks.org/software-engineering/what-is-metadata/) about my each one of my blog posts.
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
}
```
Since all this metadata is in a more *global* place to access, it allows the code to work on multiple things at once - It can now display the content of the blog post **and** calculate the read time at the same time (yay!)

Not to mention the addition of metadata helps to keep **everything** more organized - It allows me to add tags for each post, has a published toggle for easily hiding posts, and the crucial date/id fields. This made me realize I <3 [JSON](https://www.w3schools.com/whatis/whatis_json.asp).
### Subscribe Button
I know a *very very* small group of people are probably reading my blog, but it seemed likely that even those who **are** reading my blog, could easily forget to check it regularly. The idea is elementary - People enter their email to subscribe and then I send them an email when I post new stuff.
#### How it works
Simplicity is the theme here. I want everything to work as simply as it possibly can. I don't want to think about it too much. I started with the button and after a few design iterations, I finally liked the way it looked (thanks, [Materialize](https://mui.com/))

Aside from the button itself, there is the input box. Ideally, you will enter your email in this box, but really you can enter whatever you want into the box and it will act the same way. I purposefully chose **not** to add any validation here, because validation isn't always *simple.* I'll explain more later on why this doesn't cause more issues ... I know you're dying to know!

The next piece is having a place to store all the email addresses. I created a free database using [Supabase](https://supabase.com/) - The table is just called emails .… and it literally just stores emails. So whenever someone subscribes, their email shows up in here. Currently there are a whopping **4 subscribers** (including myself, of course)

<img src="docs/pics/emails.png" width="400px">

So that's it. You click subscribe, enter your email (or whatever you want), the email gets added to a database, and then you see the success message - Life can be so simple.
### Weekly Newsletter
I mean no one asked for a weekly newsletter but hey why not ... right? This was probably the most daunting feature of them all. I didn't know where to begin in terms of building this or how it worked ... So I just started ? Sometimes that's the best way to figure something out - [Just do it](https://www.creativereview.co.uk/just-do-it-slogan/) ... or at least try to .... ?

I was actually really happy with how this turned out ... btw did you sign up yet?

<img src="docs/pics/newsletter.png" width="300px">

#### How it works
Using EmailJS (freeeeeeeee) up to 200 emails a month which is so perfect for just a small little girl blog like this one.
Call the API
TEMPLATE PIC

CODE BLOCK

CRON JOB?


