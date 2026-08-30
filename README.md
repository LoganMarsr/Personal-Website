# Logan Marshall — Portfolio

Personal portfolio site for mechanical engineering internship applications.
Static HTML/CSS/JS, no build step.

**Live site:** _(enable GitHub Pages — see below)_

## Structure

```
index.html        Home — hero, spec strip, about, selected work, toolbox, contact
projects.html     5 projects with CAD galleries + lightbox
experience.html   Internships, leadership, and everything else
education.html    Degrees, coursework, awards, technical skills
404.html          Not-found page
styles.css        Design system (engineering blueprint)
site.js           Mobile nav, image lightbox, scroll reveals
favicon.svg       LM monogram
assets/           Resume PDF
images/           CAD renders and project photos
```

## Design language

An engineering blueprint: dark navy ground with a fine CSS grid, cyan linework,
monospace annotation labels, dimension lines under section headings, CAD-style
corner brackets on cards, and a real drawing **title block** as the page footer.

Palette and type are defined as custom properties at the top of `styles.css` —
change them in one place to restyle the whole site.

## Running locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Updating content

- **Resume** — replace `assets/Logan-Marshall-Resume.pdf`, keeping the filename.
- **Portrait** — save a photo as `images/logan-portrait.jpg` and point the
  `<img>` in the `.portrait` block of `index.html` at it (currently showing
  `images/portrait-placeholder.svg`).
- **New project** — copy an `<article class="project">` block in
  `projects.html`, bump the number, and swap the gallery. Projects without
  photos use a `.datacard` spec table instead of a gallery.

## Deploying on GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
The site is plain static files, so no workflow is needed.
