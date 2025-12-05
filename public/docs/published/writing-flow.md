
Here's my writing + posting ***flow***

## Idea
Seems self explanatory, but this is step one. I have a thought. I love to have thoughts. I have many.

## Write & Edit
Time to write said thought. This part usually happens in the morning before work, sitting at my kitchen table, with a coffee 💓

### Editor
As soon as I decided on how this flow would work, I knew that finding a good text/markdown editor would be imperative.

I tried a few different ones but ultimately decided on [Obsidian](https://obsidian.md/) - I actually love this tool a lot! The UI is intuitive, clean, minimal, adaptive, etc.

My codebase is set up to read [markdown](https://www.ibm.com/docs/en/SSYKAV?topic=train-how-do-use-markdown) files which contain the content for my blog posts, but if you know anything about markdown or have ever had to write in [markdown syntax](https://www.markdownguide.org/basic-syntax/) ...... it sucks 💩

Obsidian takes away a lot of this pain by allowing users to write in a very *normal* seeming text editor, when really behind the scenes it's creating a markdown file for you.

<img src="docs/pics/obsidian.png" width="80%">

One huge perk of using Obsidian has been the ability to setup my [vault](https://forum.obsidian.md/t/what-exactly-is-a-vault/4369) (vault = where Obsidian stores all your markdown files) as a folder directly inside of my codebase. You also have the power to organize your vault to your liking.

<img src="docs/pics/obsidian2.png" width="60%">

There's even more to Obsidian ([graphing](https://help.obsidian.md/plugins/graph), [canvas](https://help.obsidian.md/plugins/canvas), [plugins](https://help.obsidian.md/plugins), etc.) but for the ye olde **[ad blog](https://abbydanger.com/blog)** the text editor is all I really need from it.

## Repository Updates
After I write something beautiful and profound in Obsidian, I hop over to VS Code  to update my repository (repository = codebase)

### In VS Code
The only thing I have to do here is update a single file with metadata about my new post - For example, the metadata for this post is as follows:
```
{
  "id": "writing-flow",
  "filename": "writing-flow.md",
  "title": "My Writing + Posting Flow",
  "dateFormatted": "12.5.2025",
  "slug": "writing-flow",
  "tags": ["how", "process", "tech", "code"],
  "published": true,
  "readTime": null
}
```

After that, I just have to commit & push the changes to my repository. You'll notice *allllllllllll*  changes are included here (new markdown file, post screenshots, etc.) all thanks to how well Obsidian integrates with VS Code and local repositories in general ..... 💜

<img src="docs/pics/vscode.png" width="60%">

### The Pipeline
After I commit & push everything, the pipeline runs. It usually takes ~3 minutes. Then my changes will be *live* on [abbydanger.com](abbydanger.com)

<img src="docs/pics/pipeline.png" width="60%">
<img src="docs/pics/pipeline2.png" width="60%">

### So That's It
That's how every blog post is born 👶

There's probably so much room for improvement here and I'm not really sure how other people/blogs are doing it, but this is how I'm doing it 😉 I just sort of thought of it and then created it. Not too shabby.

See ya.

-A

  
