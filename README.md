# Federalist Themes

A collection of [Federalist](https://federalist.18f.gov/) themes.

## Features

Here's what we provide in every Federalist Theme.

### US Web Design System

All themes are built with the [U.S. Web Design System](). This provides provides
a fast, accessible, mobile-friendly government website backed by user research
right out of the box.


### Content focused

Content provided into includes are treated as markdown by default making it easy
to use existing includes with rich content. If you need to provide raw HTML for
more tailored content, you can do that too!


### Federalist grows with you

Our themes start simple so you can focus on getting your content up quickly.
More advanced customizations in the theme are ready when you are!


## Usage


### Configuration

These settings are available from your `_config.yml`.


#### `description` string

Description of your site. This is used for site metadata and helps with SEO and
other web integrations.

```yaml
description: >-
  A collection of Federalist themes.
```


#### `contact` object

Provide contact informtion to be displayed on your site.

Property | Description | Required? | Default
-------- | ----------- | --------- | -------
`twitter`   | [Twitter](https://twitter.com/) handle. | no |


#### `favicons` array of object

Configures favicons in your `<head>` tag.

Property | Description | Required? | Default
-------- | ----------- | --------- | -------
`href`   | Value for the `href` attribute in the `link` tag. | yes |
`rel`    | Value for the `rel` attribute in the `link` tag. | no | `'icon'`
`sizes`  | Value for the `sizes` attribute in the `link` tag. | no |
`type`   | Value for the `type` attribute in the `link` tag. | yes |

```yaml
favicons:
  - href: /assets/uswds/img/favicons/favicon.ico
    type: image/ico
    rel: icon shortcut
    sizes: '192x192'
  - href: /assets/uswds/img/favicons/favicon-57.png
    type: image/png
    rel: icon
    sizes: '57x57'
```


<a name="primary_nav"></a>
#### `primary_nav` array of object

Describes the primary navigation menu in the header.

Property | Description | Required? | Default
-------- | ----------- | --------- | -------
`text`   | Display text for the link. | yes |
`href`   | `href` attribute for the link. | yes |
`children` | List of child links if this is a menu. Nested menus are not supported. | no |
`section` | Name of the section for organizing pages and indicating the current section. See below. | no |


```yaml
primary_nav:
  - text: Resources
    href: '/'
    children:
      - text: Link
        href: '#'
      - text: Link
        href: '#'
      - text: Link
        href: '#'
  - text: Simple link
    href: '#'
```

For the `section` property, you can name the section and add a `nav_section` to
individual pages. When viewing a page with a `nav_section`, the matching
navigation link will be indicated as the current section with the `.usa-current`
class.


#### `secondary_nav` array of object

Configures the secondary navigation menu. See [`primary_nav`](#primary_nav).
Submenus are not supported.


#### `search` string

Configures site search with [Search.gov](https://search.gov/#). See [Federalist
documentation](https://federalist-docs.18f.gov/pages/using-federalist/search/)
to configure site search.


#### `stylesheets` array of string

List of CSS stylesheets to include in your `<head>` tag.

```yaml
stylesheets:
  - /assets/css/my_site.css
```


### Layouts


#### `landing`

The landing layout is meant to be used with the front page of your website. The
landing layout is based on the [USWDS Landing page
template](https://designsystem.digital.gov/page-templates/#landing-page).


#### `default`

A bare-bones layout containing only the header and footer. This layout can be
used for pages with custom structure or as the basis for any custom layouts you
create.

#### `base`

An empty layout containing only the non-visible `<head>` content. This layout
should rarely be used.

Page parameters:
 - `body_classes` space separated list of classes to add to the `<body>` element.


### Includes

We standardize template variables where possible. Content provided to templates
are escaped by default. Most includes accept a `content` property for the body
content of the component which is treated as markdown.


#### Passing in HTML

We follow a convention with variables passed to includes. By default, we will
escape content strings based to includes for safe rendering within HTML. If you
would like to pass HTML in directly, most variables are suffixed with `_html` to
indicate that HTML content. Here's an example:

```markdown
---
# index.html
# Normally you would pass in your content for escaping
hero_with_text:
  heading: Heading for my hero is escaped.

# However, you may include raw HTML by passing in the `heading_html` variable
# instead. Make sure to sanitize your content yourself. You should never render
# content provided directy from users.
hero_with_html:
  heading_html: <strong>This</strong> heading contains markup.
---
{% include hero.html hero=page.hero_with_text %}
{% include hero.html hero=page.hero_with_html %}
```

#### Common include properties

**`heading`** refers to the heading or title of a component.
**`content`** refers to the body content for a component.

#### `hero.html`

#### `media_blocks.html`

#### `secondary_lead.html`

#### `tagline.html`

#### `usa-banner.html`


### Using USWDS

All the Federalist themes are based on the [U.S. Web Design
System](https://designsystem.digital.gov/).
By default, we include the minified CSS provided by the US Web Design System.
which allows you to use the CSS classes described in the USWDS and copy/paste
examples directly from the USWDS [component
library](https://designsystem.digital.gov/components/).

For advanced users, you may use the SCSS files provided by USWDS.

### Overriding layouts and includes



## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.


## Development

This section explains the technical details to get the project setup for
developing on the Federalist themes.

Install the Node.js dependencies.

    $ npm install

Build the Jekyll themes.

    $ npm run build

Start the watch task to automatically copy common templates into the themes
directories.

    $ npm run watch

Then, you can `cd` into individual theme directories and run Jekyll just as you
would a stand-alone theme.

    $ cd federalist-standard-theme
    $ bundle install
    $ bundle exec jekyll serve


### Directories

This table explains the different directories

Directory | Description


### Common tasks


#### Update USWDS

When a new verison of [USWDS](https://github.com/uswds/uswds/releases) comes out, here's how to update the themes.

Bump the version in [package.json](package.json).

Run the build.

    $ npm run build

Run the automated tests.

    $ npm test

Then, run the steps for [packaging and publishing](#package-and-publish)


#### Package and publish

This packages the themes as a gem and publishes them to
[rubygems](https://rubygems.org/).




### Prerequisites

- [Node.js](https://nodejs.org/en/) 10+
- [Ruby](https://www.ruby-lang.org/en/) 2+
- [Bundler](https://bundler.io/)


### Semantic versioning for Jekyll themes

What does Semantic versioning mean for Jekyll themes?


## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in
[CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright
> and related rights in the work worldwide are waived through the [CC0 1.0
> Universal public domain
> dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication.
> By submitting a pull request, you are agreeing to comply with this waiver of
> copyright interest.
