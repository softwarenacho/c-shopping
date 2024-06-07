import { useLanguageContext } from '@/context/LanguageContext'
import { Button, Modal } from 'components'

const ConfirmUpdateModal = props => {
  //? Props
  const { title, isLoading, isShow, onClose, onConfirm, onCancel } = props

  // ? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <Modal isShow={isShow} onClose={onClose} effect="ease-out">
      <Modal.Content onClose={onClose}>
        <Modal.Body>
          <div className="px-3 py-6 space-y-4 text-center bg-white md:rounded-lg">
            <p>
              {dict.admin?.category.confirmation}
              <span className="font-bold text-green-500">{title}</span>
            </p>
            <div className="flex justify-center gap-x-20">
              <Button onClick={onConfirm} isLoading={isLoading}>
                {dict.admin?.category.confirm}
              </Button>
              <Button className="!bg-green-500" onClick={onCancel}>
                {dict.admin?.category.cancel}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default ConfirmUpdateModal
