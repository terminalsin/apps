import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useCustomEndpointAtom} from '@phala/app-store'
import {Drawer, ANCHOR} from 'baseui/drawer'
import CheckIcon from '../../../icons/check.svg'
import Khala from '../../../icons/khala_new.svg'
import useCustomEndpoint from '../../../hooks/useCustomEndpoint'
import {LineWrap} from '../../Navbar/styledComponent'

const NodeName = styled.span`
  margin-right: 25px;
`

type NodeType = {name: string; address: string}
const NODES: NodeType[] = [
  {name: 'Khala via Phala', address: 'wss://khala-api.phala.network/ws'},
  {
    name: 'Khala via Onfinality',
    address: 'wss://khala.api.onfinality.io/public-ws',
  },
]

const SelectNode: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const urlEndpoint = useCustomEndpoint()
  const [customEndpoint, setCustomEndpoint] = useCustomEndpointAtom()

  useEffect(() => {
    if (urlEndpoint) {
      setCustomEndpoint(urlEndpoint)
    }
  }, [urlEndpoint, setCustomEndpoint])

  const handleClick = (item: NodeType) => {
    setCustomEndpoint(item.address)
  }

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
        <Khala />
      </div>
      <Drawer
        isOpen={isOpen}
        autoFocus
        anchor={ANCHOR.top}
        onClose={() => setIsOpen(false)}
      >
        {NODES.map((item) => (
          <LineWrap
            key={item.name}
            onClick={() => {
              handleClick(item)
              close()
            }}
          >
            <NodeName>{item.name}</NodeName>
            {customEndpoint === item.address ? <CheckIcon /> : null}
          </LineWrap>
        ))}
      </Drawer>
    </div>
  )
}

export default SelectNode
