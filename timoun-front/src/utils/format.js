export function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return '-'
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatDateRange(startDateStr, endDateStr) {
  const start = formatDate(startDateStr)
  if (!endDateStr) return start
  return `${start} - ${formatDate(endDateStr)}`
}

export function firstParagraph(blocks) {
  if (!Array.isArray(blocks)) return ''
  const paragraph = blocks.find((block) => block.type === 'paragraph')
  if (!paragraph || !Array.isArray(paragraph.children)) return ''
  return paragraph.children
    .filter((node) => typeof node.text === 'string')
    .map((node) => node.text)
    .join(' ')
    .trim()
}