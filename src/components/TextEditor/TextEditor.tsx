import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
// => Tiptap packages
import { useEditor, EditorContent, Editor, BubbleMenu } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Bold from '@tiptap/extension-bold'
import Underline from '@tiptap/extension-underline'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import History from '@tiptap/extension-history'
import * as Icons from './Icons'
import { LinkModal } from './LinkModal'
// @ts-expect-error its ok
import css from './editor.module.css'
import TurndownService from 'turndown'
import EmojiPicker from 'emoji-picker-react'
import useClickOutside from 'src/hooks/useClickOutside.ts'
import HardBreak from '@tiptap/extension-hard-break'

interface IProps {
  initialContent?: string | undefined
  onUpdate: (a: any) => void
}

export const TextEditor: React.FC<IProps> = ({ onUpdate, initialContent }) => {
  const [editorContent, setEditorContent] = useState('')
  const [isEmoji, setIsEmoji] = useState<boolean>(false)
  const emojiPickerRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML())
    },
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Link.configure({
        openOnClick: false,
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.setHardBreak(),
          }
        },
      }).configure({
        HTMLAttributes: {
          class: 'hard-break',
        },
      }),
    ],
    content: initialContent,
  }) as Editor
  useEffect(() => {
    if (editor && initialContent) {
      const formattedContent = convertNewLinesToHtml(initialContent)
      editor.commands.setContent(formattedContent)
    }
  }, [initialContent, editor])
  const [modalIsOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState<string>('')

  const openModal = useCallback(() => {
    setUrl(editor.getAttributes('link').href)
    setIsOpen(true)
  }, [editor])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setUrl('')
  }, [])

  const saveLink = useCallback(() => {
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run()
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    }
    closeModal()
  }, [editor, url, closeModal])

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    closeModal()
  }, [editor, closeModal])

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run()
  }, [editor])

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run()
  }, [editor])

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run()
  }, [editor])

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run()
  }, [editor])

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run()
  }, [editor])

  const openEmojiPopup = () => {
    setIsEmoji(true)
  }

  const closeEmojiPopup = () => {
    setIsEmoji(false)
  }

  const convertNewLinesToHtml = (text: string): string => {
    return text.replace(/\n/g, '<br>')
  }

  if (!editor) {
    return null
  }

  const onEmojiClick = ({ emoji }: { emoji: string }) => {
    editor.commands.insertContent(emoji)
  }

  const turndownService = useMemo(() => {
    const service = new TurndownService()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // now handled manually
    service.remove('lineBreak')

    service.addRule('underline', {
      filter: ['u'],
      replacement: function (content) {
        return '<u>' + content + '</u>'
      },
    })

    service.addRule('strike', {
      filter: ['s'],
      replacement: function (content) {
        return '<s>' + content + '</s>'
      },
    })

    service.addRule('italic', {
      filter: ['em', 'i'],
      replacement: function (content) {
        return '<i>' + content + '</i>'
      },
    })

    service.addRule('bold', {
      filter: ['strong', 'b'],
      replacement: function (content) {
        return '<b>' + content + '</b>'
      },
    })

    service.addRule('code', {
      filter: ['code'],
      replacement: function (content) {
        return '<pre>' + content + '</pre>'
      },
    })

    service.addRule('external-link', {
      filter: function (node) {
        return node.nodeName === 'A'
      },
      replacement: function (content, node) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const url = node.getAttribute('href')
        if (!url?.startsWith('http')) return content
        return `<a href="${url}">${content}</a>`
      },
    })

    return service
  }, [])

  const convertHtmlToMarkdownWithFormatting = (html: string): string => {
    let markdown = turndownService.turndown(html)
    markdown = markdown.replace(/<br\s*[^>]*>/gi, '\n')
    markdown = markdown.replace(/<p[^>]*>/gi, '').replace(/<\/p>/gi, '\n\n')
    return markdown.trim()
  }

  useEffect(() => {
    const markdown = convertHtmlToMarkdownWithFormatting(editorContent)
    onUpdate(markdown)
  }, [editorContent])

  useClickOutside(emojiPickerRef, closeEmojiPopup)

  return (
    <div className={css.editor}>
      <div className={css.menu}>
        <button
          className={css.menu_button}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Icons.RotateLeft />
        </button>
        <button
          className={css.menu_button}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Icons.RotateRight />
        </button>
        <button
          className={classNames(css.menu_button, {
            'is-active': editor.isActive('link'),
          })}
          onClick={openModal}
        >
          <Icons.Link />
        </button>
        <button
          className={classNames(css.menu_button, {
            'is-active': editor.isActive('bold'),
          })}
          onClick={toggleBold}
        >
          <Icons.Bold />
        </button>
        <button
          className={classNames(css.menu_button, {
            'is-active': editor.isActive('underline'),
          })}
          onClick={toggleUnderline}
        >
          <Icons.Underline />
        </button>
        <button
          className={classNames(css.menu_button, {
            'is-active': editor.isActive('italic'),
          })}
          onClick={toggleItalic}
        >
          <Icons.Italic />
        </button>
        <button
          className={classNames(css.menu_button, {
            'is-active': editor.isActive('strike'),
          })}
          onClick={toggleStrike}
        >
          <Icons.Strikethrough />
        </button>
        <button
          className={classNames(css.menu_button, {
            'is-active': editor.isActive('code'),
          })}
          onClick={toggleCode}
        >
          <Icons.Code />
        </button>
        <div
          ref={emojiPickerRef}
          className={classNames(css.menu_button, {
            'is-active': editor.isActive('code'),
          })}
          onClick={openEmojiPopup}
        >
          <Icons.Emoji />
          <EmojiPicker open={isEmoji} onEmojiClick={onEmojiClick} className={css.emojipicker} />
        </div>
      </div>

      <BubbleMenu
        className={css.bubble_menu_light}
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor, from, to }) => {
          // only show the bubble menu for links.
          return from === to && editor.isActive('link')
        }}
      >
        <button className={css.button} onClick={openModal}>
          Edit
        </button>
        <button className={css.button_remove} onClick={removeLink}>
          Remove
        </button>
      </BubbleMenu>
      <EditorContent editor={editor} />

      <LinkModal
        url={url}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Link Modal"
        closeModal={closeModal}
        onChangeUrl={(e) => setUrl(e.target.value)}
        onSaveLink={saveLink}
        onRemoveLink={removeLink}
      />
    </div>
  )
}
