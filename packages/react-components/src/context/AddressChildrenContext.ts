import { createContext } from 'react'
import { Address } from '@commercelayer/sdk'

export interface InitialAddressContext {
  address: Address | undefined
}

const initial: InitialAddressContext = {
  address: undefined
}

const AddressChildrenContext = createContext<InitialAddressContext>(initial)

export default AddressChildrenContext
