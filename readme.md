# Serious Options Choir website

A lightweight reconstruction of the Serious Options Choir website, built with Jekyll for GitHub Pages. The design uses the choir’s archived copy, teal visual identity, logo, photography, and poster artwork while replacing the former GoDaddy forms and scripts with a fast, accessible static site.

## Pages

- Home: mission, land acknowledgement, participation links, and credits
- About: choir history, leadership, and performance gallery
- Performances: current-news links and a clearly labelled past-concert highlight
- Join the Choir: rehearsal expectations, intake guidance, and the archived application PDF
- Custom 404 page

Current concert and intake details intentionally link to the choir’s external social channels. There is no contact form, database, tracking script, cookie banner, or server-side email feature.

## Local preview with Podman Desktop

Prerequisites: Podman Desktop with a running Linux machine. From the repository root:

```powershell
$root = (Get-Location).Path
podman run --rm -it --publish 4000:4000 `
  --mount "type=bind,source=$root,target=/srv/jekyll" `
  --volume jekyll-bundle:/usr/local/bundle `
  --workdir /srv/jekyll `
  docker.io/library/ruby:3.2-bookworm `
  bash -lc "gem install bundler -v 4.0.18 --no-document && bundle install && bundle exec jekyll serve --host 0.0.0.0 --livereload --force_polling"
```

Open `http://127.0.0.1:4000/`. Build the production output without starting a server:

```powershell
$root = (Get-Location).Path
podman run --rm `
  --mount "type=bind,source=$root,target=/srv/jekyll" `
  --volume jekyll-bundle:/usr/local/bundle `
  --workdir /srv/jekyll `
  --env JEKYLL_ENV=production `
  docker.io/library/ruby:3.2-bookworm `
  bash -lc "gem install bundler -v 4.0.18 --no-document && bundle install && bundle exec jekyll build --trace"
```

The named `jekyll-bundle` volume caches gems between runs. The generated site is written to `_site/` and is excluded from Git.

If a corporate TLS proxy such as Zscaler causes certificate verification errors, add your organization’s **public root CA** to the container trust store. Do not disable Bundler or RubyGems SSL verification.

### Optional native Ruby workflow

With Ruby, Bundler, and a supported Ruby DevKit installed on Windows:

```powershell
bundle install
bundle exec jekyll serve --livereload
```


## Publish with GitHub Pages

1. Push this repository to GitHub on the `main` or `master` branch.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. The workflow in `.github/workflows/jekyll.yml` builds and deploys the site.
4. Check the workflow run, then open the deployment URL shown by GitHub.

### Custom domain

`CNAME` and `_config.yml` are configured for `seriousoptionschoir.ca`. Before changing DNS, verify control of the domain. In the DNS provider:

- Add a `CNAME` record for `www` pointing to `<github-user-or-org>.github.io`.
- Add GitHub’s current apex-domain `A`/`AAAA` records for `@` by following [GitHub’s custom-domain documentation](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages).
- Add the domain in **Settings → Pages**, wait for the DNS check, then enable **Enforce HTTPS**.

GitHub’s published IP addresses can change, so use their current documentation rather than copying old DNS values. If deploying first at a `github.io/repository` project URL, temporarily remove `CNAME` and update `url`/`baseurl` in `_config.yml`.

## Routine updates

- Global details and social URLs: `_config.yml`
- Home page: `index.html`
- About page: `about.md`
- Performances: `performances.md`
- Membership details: `join-the-choir.md`
- Colors and layout: `assets/css/style.scss`
- Photos: `assets/images/`

Keep dates explicit and move expired performances into an archive section so visitors never mistake old events for upcoming ones. Optimize new images before committing them (roughly 1600–2000 px wide for hero images and 800–1200 px for gallery images).

## Content provenance

Public-facing text and media were recovered from the choir’s archived website snapshot. Existing design and photography credits are retained on the site. These assets remain the property of their respective owners and are not offered under an open-source license.
