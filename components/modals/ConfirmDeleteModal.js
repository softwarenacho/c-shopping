import { useLanguageContext } from '@/context/LanguageContext'
import { Button, Modal } from 'components'

export default function ConfirmDeleteModal(props) {
  //? Props
  const { title, isLoading, isShow, onClose, onCancel, onConfirm } = props

  //? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <>
      <Modal isShow={isShow} onClose={onClose} effect="ease-out">
        <Modal.Content onClose={onClose}>
          <Modal.Body>
            <div className="px-3 py-6 space-y-4 text-center bg-white md:rounded-lg">
              <p>
                {dict.profile?.review?.delete?.deletion}
                <span className="font-bold text-red-500">{title}</span>
                {dict.profile?.review?.delete?.confirm}？
              </p>
              <div className="flex justify-center gap-x-20">
                <Button onClick={onConfirm} isLoading={isLoading}>
                  {dict.profile?.review?.delete?.action}
                </Button>
                <Button className="!bg-green-500" onClick={onCancel}>
                  {dict.profile?.review?.delete?.cancel}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
