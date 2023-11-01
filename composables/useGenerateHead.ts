export const useGenerateHead = (page, lang) => {
  return {
    htmlAttrs: { lang },
    title: useGetPageTitle(page),
    meta: useGenerateMeta(page),
    link: useGenerateLinks(page),
  }
}

export const useGenerateMeta = (page) => {
  if (!page) {
    console.error('generateMeta: No page provided')
    return []
  }

  const config = useRuntimeConfig()
  const pageDescription = getPageDescription(page)
  const pageImage = getPageImage(page)

  const meta = [
    {
      hid: 'description',
      name: 'description',
      content: pageDescription,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: useGetPageTitle(page),
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: pageDescription,
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: config.public.APP_URL + page.url,
    },
  ]

  if (page.seo_hidden) {
    meta.push({ hid: 'robots', name: 'robots', content: 'noindex' })
  }

  if (pageImage?.url) {
    meta.push({
      hid: 'og:image',
      property: 'og:image',
      content: pageImage.url,
    })
  }

  if (pageImage?.alt) {
    meta.push({
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: pageImage.alt,
    })
  }

  return meta
}

export const useGenerateLinks = (page) => {
  if (!page) {
    console.error('generateLinks: No page provided')
    return []
  }

  const config = useRuntimeConfig()
  const nuxtApp = useNuxtApp()

  const pageAlternates = Array.isArray(page.alternates)
    ? page.alternates ?? []
    : []
  const alternates = pageAlternates.map((alternatePage) => {
    // remove "/de" from url if its the root page
    const url = alternatePage.is_root
      ? alternatePage.url.substring(3)
      : alternatePage.url
    return {
      rel: 'alternate',
      hreflang: alternatePage.language + '-ch',
      href: removeTrailingSlash(config.public.APP_URL + url),
    }
  })

  // sort alternates by current set locale
  alternates.sort((a, b) =>
    a.hreflang.includes(nuxtApp.$i18n.locale) ? -1 : 1
  )

  // define x-default link
  const rootPage = pageAlternates.filter((p) => p.is_root)

  if (rootPage?.length > 0) {
    alternates.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: removeTrailingSlash(
        config.public.APP_URL + rootPage[0]?.url.substring(3)
      ),
    })
  }

  return [
    {
      hid: 'canonical',
      rel: 'canonical',
      href: config.public.APP_URL + page.url,
    },
    ...alternates,
  ]
}

// ------ HELPERS ------

// TITLE
const useGetPageTitle = (page) => {
  if (!page) return ''

  const title = removeHtmlTags(page.seo_title || page.heading || page.title)

  return escapeHtml(title)
}

// DESCRIPTION
const getPageDescription = (page) => {
  if (!page) return null

  let description = removeHtmlTags(page.seo_description || page.lead || '')
  if (description?.length > 155) {
    description = description.slice(0, 155) + '...'
  }
  return escapeHtml(description)
}

// IMAGE
const getPageImage = (page) => {
  if (page.seo_image) {
    return {
      url: page.seo_image?.permalink,
      alt: page.seo_image?.alt || '',
    }
  }

  if (page.image) {
    return {
      url: page.image?.permalink,
      alt: page.image?.alt || '',
    }
  }

  if (!Array.isArray(page.heros) || !page?.heros?.length) return null
  if (!page.heros[0]?.image || !page.heros[0]?.file) return null
  const image = page.heros[0]?.image || page.heros[0]?.file
  if (!image.is_image) return null

  return {
    url: image.permalink,
    alt: image.alt || '',
  }
}

// REMOVE TRAILING SLASH
const removeTrailingSlash = (str) => {
  if (!str) return null
  return str.endsWith('/') ? str.slice(0, -1) : str
}

const escapeHtml = (unsafe) => {
  if (!unsafe) return ''
  return unsafe
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#034;/g, '"')
    .replace(/&#34;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&#38;/g, '&')
    .replace(/&#060;/g, '<')
    .replace(/&#60;/g, '<')
    .replace(/&#062;/g, '>')
    .replace(/&#62;/g, '>')
}
