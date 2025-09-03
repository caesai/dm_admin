const parser = new DOMParser()

export const renderHTMLContent = (html: string | null) => {
  if (!html) return 'Текст отсутствует'

  const formattedHtml = html.replace(/\n/g, '<br>')
  const doc = parser.parseFromString(formattedHtml, 'text/html')
  return <div dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }} />
}
