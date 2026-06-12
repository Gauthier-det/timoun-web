import { API_URL } from '../api.js'

const SAFE_URL_RE = /^(https?:\/\/|mailto:|tel:|\/|#)/i

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function safeUrl(url) {
  if (typeof url !== 'string') return ''
  const trimmed = url.trim()
  if (!trimmed || !SAFE_URL_RE.test(trimmed)) return ''
  return trimmed
}

function inlineToHtml(children) {
  if (!Array.isArray(children)) return ''
  return children
    .map((node) => {
      if (node.type === 'link') {
        const url = safeUrl(node.url)
        const inner = inlineToHtml(node.children)
        if (!url) return inner
        return `<a href="${escapeHtml(url)}" rel="noopener noreferrer" target="_blank">${inner}</a>`
      }
      let text = escapeHtml(node.text || '')
      if (node.bold) text = `<strong>${text}</strong>`
      if (node.italic) text = `<em>${text}</em>`
      if (node.underline) text = `<u>${text}</u>`
      if (node.strikethrough) text = `<s>${text}</s>`
      if (node.code) text = `<code>${text}</code>`
      return text
    })
    .join('')
}

function blockToHtml(block) {
  switch (block.type) {
    case 'paragraph':
      return `<p>${inlineToHtml(block.children)}</p>`
    case 'heading': {
      const level = Math.min(Math.max(Number(block.level) || 2, 1), 6)
      return `<h${level}>${inlineToHtml(block.children)}</h${level}>`
    }
    case 'list': {
      const tag = block.format === 'ordered' ? 'ol' : 'ul'
      const items = (block.children || [])
        .map((item) => `<li>${inlineToHtml(item.children)}</li>`)
        .join('')
      return `<${tag}>${items}</${tag}>`
    }
    case 'quote':
      return `<blockquote>${inlineToHtml(block.children)}</blockquote>`
    case 'code':
      return `<pre><code>${inlineToHtml(block.children)}</code></pre>`
    case 'image': {
      const raw = block.image?.url
      if (!raw) return ''
      const full = /^https?:\/\//i.test(raw) ? raw : API_URL + raw
      const url = safeUrl(full)
      if (!url) return ''
      const alt = escapeHtml(block.image?.alternativeText || '')
      return `<img src="${escapeHtml(url)}" alt="${alt}" class="article-block-img" loading="lazy" />`
    }
    default:
      return ''
  }
}

export function blocksToHtml(blocks) {
  if (!Array.isArray(blocks)) return ''
  return blocks.map(blockToHtml).join('')
}