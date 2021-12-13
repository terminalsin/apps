import {useApiPromise} from '@phala/react-libs'
import {VoidFn} from '@polkadot/api/types'
import {useEffect, useState} from 'react'

const useAllBalances = (address?: string) => {
  const {api} = useApiPromise()
  const [allBalances, setAllBalances] = useState()

  useEffect(() => {
    let unsub: VoidFn
    if (api && address) {
      api.derive.balances
        .all(address, (result) => {
          setAllBalances(result)
        })
        .then((_unsub) => (unsub = _unsub))
    }

    return () => {
      unsub?.()
    }
  }, [api, address])

  return allBalances
}

export default useAllBalances
