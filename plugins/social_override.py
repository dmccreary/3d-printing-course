"""
Social media card override hook for MkDocs Material.

Forces every page to use the static cover image (img/cover.png) as its
og:image / twitter:image when no page-level image is set in frontmatter.
This ensures consistent social previews on Facebook, LinkedIn, and Twitter
even when the Material social-cards plugin is generating layout-only cards.
"""


def on_page_context(context, *, page, config, nav):
    site_url = config.get("site_url", "").rstrip("/")
    cover_url = f"{site_url}/img/cover.png"

    if "image" not in page.meta:
        page.meta["image"] = cover_url

    return context
