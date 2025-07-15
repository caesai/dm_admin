import React, { useCallback, useEffect, useMemo, useState } from 'react'
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

interface IProps {
  onUpdate: (a: any) => void
}

export const TextEditor: React.FC<IProps> = ({ onUpdate }) => {
  const [editorContent, setEditorContent] = useState('')
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
    ],
    content: 'Текст рассылки...',
  }) as Editor
  const [modalIsOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState<string>('')

  const openModal = useCallback(() => {
    console.log(editor.chain().focus())
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

  if (!editor) {
    return null
  }

  const turndownService = useMemo(() => {
    const service = new TurndownService()
    service.addRule('underline', {
      filter: ['u'],
      replacement: function (content) {
        return '<u>' + content + '</u>'
      },
    })

    service.addRule('s', {
      filter: ['s'],
      replacement: function (content) {
        return '<s>' + content + '</s>'
      },
    })
    
    service.addRule('em', {
      filter: ['em'],
      replacement: function (content) {
        return '<i>' + content + '</i>'
      },
    })
    
    service.addRule('strong', {
      filter: ['strong'],
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
        // @ts-expect-error
        let url = node.getAttribute('href')
        if (!url?.startsWith('http')) return content
        return `<a href="${url}">${content}</a>`
      },
    })

    return service;
  }, [])

  useEffect(() => {
    const markdown = turndownService.turndown(editorContent)
    onUpdate(markdown)
  }, [editorContent])

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
