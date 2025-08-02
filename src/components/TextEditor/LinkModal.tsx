import React from 'react'
import type { Props as ReactModalProps } from 'react-modal'
import * as Icons from './Icons'
import { Modal } from './Modal'
// @ts-expect-error its ok
import css from './editor.module.css'

interface IProps extends ReactModalProps {
  url: string
  closeModal: () => void
  onChangeUrl: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSaveLink: (e: React.MouseEvent<HTMLButtonElement>) => void
  onRemoveLink: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function LinkModal(props: IProps) {
  const { url, closeModal, onChangeUrl, onSaveLink, onRemoveLink, ...rest } = props
  return (
    <Modal {...rest}>
      <h2 className={css.modal_title}>Edit link</h2>
      <button className={css.modal_close} type="button" onClick={closeModal}>
        <Icons.X />
      </button>
      <input className={css.modal_input} autoFocus value={url} onChange={onChangeUrl} />
      <div className={css.modal_buttons}>
        <button className={css.button_remove} type="button" onClick={onRemoveLink}>
          Remove
        </button>
        <button className={css.button_save} type="button" onClick={onSaveLink}>
          Save
        </button>
      </div>
    </Modal>
  )
}
