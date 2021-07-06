import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import MetaMaskOnboarding from '@metamask/onboarding'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import MetaMaskIcon from '../../assets/images/metamask.svg'
import WalletConnectIcon from '../../assets/images/walletconnect.svg'
import appConfig from '../../configs/app'
import type { ProviderWhitelist } from '../../hooks/useDApp'

type ConnectorItem = {
  id: ProviderWhitelist
  name: string
  icon: StaticImageData
}
type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  handleTriggerConnect: (name: ProviderWhitelist) => void
}

export default function WalletModal({
  open,
  setOpen,
  handleTriggerConnect,
}: Props): JSX.Element {
  const connectors: ConnectorItem[] = [
    { id: 'Injected', name: 'Metamask', icon: MetaMaskIcon },
    { id: 'WalletConnect', name: 'WalletConnect', icon: WalletConnectIcon },
  ]
  // initialize metamask onboarding
  const [isMetaMaskInstalled, setMetaMaskInstalled] = useState<boolean>(false)
  const onboarding = useRef<MetaMaskOnboarding>()
  const ctaButtonRef = useRef(null)

  useEffect(() => {
    onboarding.current = new MetaMaskOnboarding()
    setMetaMaskInstalled(MetaMaskOnboarding.isMetaMaskInstalled())
  }, [])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div>
                  <Dialog.Title as="div" className="flex">
                    <h3 className="flex-1 text-lg leading-6 font-medium text-gray-900">
                      Connect to wallet
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
                    {connectors.map(({ id, name, icon }, i) => (
                      <div
                        key={id}
                        className={classNames('flex', {
                          'mb-3': i < connectors.length - 1,
                        })}
                      >
                        {isMetaMaskInstalled || id !== 'Injected' ? (
                          <button
                            type="button"
                            className="inline-flex flex-1 items-center px-6 py-3 border border-gray-200 text-base font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
                            onClick={() => handleTriggerConnect(id)}
                          >
                            <span className="flex flex-1 pr-4">{name}</span>
                            <Image
                              className="flex"
                              src={icon}
                              alt={name}
                              width={24}
                              height={24}
                            />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="inline-flex flex-1 items-center px-6 py-3 border border-gray-200 text-base font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
                            onClick={() =>
                              onboarding.current?.startOnboarding()
                            }
                          >
                            <span className="flex flex-1 pr-4">
                              Install Metamask
                            </span>
                            <Image
                              className="flex"
                              src={MetaMaskIcon}
                              alt={'Install Metamask'}
                              width={24}
                              height={24}
                            />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="bg-gray-50 sm:rounded-lg">
                  <div className="p-2 sm:p-3">
                    <div className="text-sm text-gray-500">
                      <p>
                        By connecting a wallet, you agree to {appConfig.appName}
                        &nbsp;
                        <Link href="#">
                          <a
                            ref={ctaButtonRef}
                            className="text-sm font-medium text-indigo-600 truncate"
                          >
                            Terms of Service
                          </a>
                        </Link>
                        .
                      </p>
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
