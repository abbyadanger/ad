I've been adding a lot of small but *mighty* features to the blog. It feels very rewarding to put hard work into something I enjoy - Here's what's new!
### Read Time Calculator
Honestly this is just something I've seen on several other blogs/websites and I wanted to see if I could build it. I also noticed some dead space at the top of the blog post pages and figured this would be the perfect thing to add - I love silly and useless things ✨
#### How it works
In the spirit of building *everything* on this website from scratch, this was no different. And also like *everything* on this website, this was *wayyyyyy* more complex than I thought. I had to create & implement a whole new system that stores [metadata](https://www.geeksforgeeks.org/software-engineering/what-is-metadata/) about my each one of my blog posts.
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
Since all this metadata is in a global place to access, it allows the code to work on multiple things at once - It can now display the content of the blog post **AND** calculate the read time at the same time (yay!)

Not to mention the addition of metadata helps to keep everything more organized - It allows me to add tags for each post, has a published toggle for easily hiding posts, and the crucial date/id fields. I <3 using [JSON](https://www.w3schools.com/whatis/whatis_json.asp) for something like this.
### Subscribe Button
I know a *very very very* small group of people are probably reading my blog, but it seemed likely that even those who are reading my blog, could easily forget to check it regularly. The idea is elementary - People enter their email to subscribe 🤝 I send them an email when I post new stuff.
#### How it works
Simplicity is the theme here. I want everything to work as simply as it possibly can. I don't want to think about it too much. I started with the button and after a few design iterations, I finally liked the way it looked (thanks, [Materialize](https://mui.com/))

Aside from the button itself, there is the input box. Ideally, you will enter your email in this box, but really you can enter whatever you want into the box and it will act the same way (shhhhhhh 🤫) I purposefully chose **not** to add any validation here, because validation isn't always *simple.*

The next piece is having a place to store all the email addresses. I was able to create a free database using [Supabase](https://supabase.com/) - The table is just called emails .… and it literally just stores emails. So whenever someone subscribes, their email shows up in here. Currently there are a whopping **FOUR** subscribers 🥳 (including myself, of course)

<img src="docs/pics/emails.png" width="60%">

So that's it. You click subscribe, enter your email (or whatever you want), and the email gets added to a database - Life can be so simple.
### Weekly Newsletter
Absolutely no one asked for a weekly newsletter, but I'm being very serious about the blog so hey why not. I didn't know where to begin in terms of building this or how it worked ... So I just started ? Sometimes that's the best way to figure something out - [Just do it](https://www.creativereview.co.uk/just-do-it-slogan/) ... as they say ... or at least try to just do it .... ? 🤷

I was actually really happy with how this turned out ... btw did you sign up yet? 🤔

<img src="docs/pics/newsletter.png" width="60%">

#### How it works
I started by googling "how to send email in code?????" A lovely (also free) service called [EmailJS](https://www.emailjs.com/) came up at the top of the search, so I started there. Like I said, I just started (trying?) to use it - I set up an email service that could send up to ~200 emails from my own personal email every month 📬

The other hard part was figured out how to actually configure this in my code, after reading lots and lots and lots of documentation, I figured that out too (yay!) I'm realizing that GitHub is an especially great platform, not only to keep my repository, but also for fun extras like [GitHub Actions](https://github.com/features/actions) that have essentially automated this whole process by triggering the email service for me.

So, it goes like this:
1. Every Sunday at 9 AM, GitHub will automatically run my ```weekly-newsletter.yml``` workflow
2. The system reads my `blog-posts.json` (metadata!) file
3. Filters by posts published in the past 7 days
4. Personalized HTML email templates are generated with links to the new blog posts
5. EmailJS sends this email to all subscribers found in the database *(sent in batches of 5 with 2-second delays to avoid crashing* 🚨*)*

The best part about this, is that the only thing I have to do ... is write 😵 and upload my blog content. The code handles the rest.

### Fin
OK that's it. I really like writing and articulating the things I code. Sorry probably a little boring. Maybe no one even read this far ... lol

Bye!

-A


