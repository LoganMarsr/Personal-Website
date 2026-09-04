# Logan Marshall — Portfolio


**Live site:** (https://loganmarsr.github.io/Personal-Website/index.html)

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
media/            Project video + its poster frame
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

