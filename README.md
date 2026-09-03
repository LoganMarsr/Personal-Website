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

## Updating content

- **Resume** — replace `assets/Logan-Marshall-Resume.pdf`, keeping the filename.
- **Portrait** — replace `images/headshot.jpg`. It is displayed square, so a
  square source crops best; 800x800 or larger stays sharp on retina screens.
- **Photos from an iPhone** — convert `.heic` to `.jpg` before committing;
  browsers cannot display HEIC.
- **Video** — encode to H.264 MP4 and keep it small; it loads only when a
  viewer opens it (`preload="none"`). Do not use Git LFS: GitHub Pages
  serves the LFS pointer file rather than the video.

  ```bash
  ffmpeg -i clip.MOV -vf "scale=-2:720" -c:v libx264 -crf 27 -preset slow \
         -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k out.mp4
  ffmpeg -i out.mp4 -ss 6 -frames:v 1 -q:v 3 out-poster.jpg
  ```

  Add it as a gallery tile with `data-video` and `data-caption`; `site.js`
  plays it in the lightbox.
- **New project** — copy an `<article class="project">` block in
  `projects.html`, bump the number, and swap the gallery. Projects without
  photos use a `.datacard` spec table instead of a gallery.

## Deploying on GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
The site is plain static files, so no workflow is needed.
