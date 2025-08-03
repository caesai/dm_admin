const parser = new DOMParser()

export const renderHTMLContent = (html: string | null) => {
  if (!html) return 'Текст отсутствует'

  const doc = parser.parseFromString(html, 'text/html')
  return <div dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }} />
}
