import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import { Fragment, useRef } from 'react'
import type { Chain } from '../../configs/chains'
import ExplorerLink from '../ExplorerLink'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  address: string
  chain: Chain
  handleLogout: () => void
}

export default function AccountModal({
  open,
  setOpen,
  address,
  chain,
  handleLogout,
}: Props): JSX.Element {
  const ctaButtonRef = useRef(null)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-20 inset-0 overflow-y-auto"
        initialFocus={ctaButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div>
                  <Dialog.Title as="div" className="flex">
                    <h3 className="flex-1 text-lg leading-6 font-medium text-gray-900">
                      Your Wallet
                    </h3>
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </Dialog.Title>
                  <div className="mt-5 flex flex-col">
                    <div className="bg-gray-50 sm:rounded-lg p-2 sm:p-3 truncate">
                      {address}
                    </div>
                    <div className="mt-2 pl-3">
                      <ExplorerLink
                        chain={chain}
                        type={'address'}
                        value={address}
                        Label={({ name }) => (
                          <>
                            View on <span className="capitalize">{name}</span>
                          </>
                        )}
                      />
                    </div>
                    <div className="flex justify-center mt-4">
                      <button
                        ref={ctaButtonRef}
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-cta-color-main hover:bg-primary-cta-color-hover"
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
