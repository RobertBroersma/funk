import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { useUID } from 'react-uid'

enum Direction {
  HORIZONTAL,
  VERTICAL,
}

interface TabContextValue {
  id: string
  activeTab: number
  numTabs: number
  setActiveTab(tab: number): void
  direction: Direction
}

let TabContext = createContext<TabContextValue>({
  id: 'Please provide a unique id',
  activeTab: 0,
  numTabs: 0,
  setActiveTab: () => {},
  direction: Direction.HORIZONTAL,
})

export function useTab(index: number) {
  let { activeTab } = useContext(TabContext)

  return {
    isActive: activeTab === index,
  }
}

interface TabGroupProps {
  initialActiveTab?: number
  numTabs: number
  children: React.ReactNode
  direction?: Direction
}

export function TabGroup({
  initialActiveTab = 0,
  numTabs,
  direction = Direction.HORIZONTAL,
  children,
}: TabGroupProps) {
  let id = useUID()
  let [activeTab, setActiveTab] = useState(initialActiveTab)

  let value = useMemo(
    () => ({ id, activeTab, setActiveTab, numTabs, direction }),
    [activeTab, setActiveTab, numTabs, direction]
  )

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>
}

interface TabProps {
  index: number
  className: string
  activeClassName: string
  inactiveClassName: string
  trigger?: 'click' | 'hover' | 'none'
  children?: React.ReactNode
  [key: string]: any
}

export function Tab({
  index,
  className,
  activeClassName,
  inactiveClassName,
  trigger = 'click',
  ...props
}: TabProps) {
  let { id, activeTab, setActiveTab } = useContext(TabContext)
  let tabRef = useRef<HTMLButtonElement>()

  useEffect(() => {
    if (activeTab === index) {
      tabRef.current?.focus()
    }
  }, [activeTab, index])

  let calculatedClassName = useMemo(() => {
    return [
      className,
      activeTab === index ? activeClassName : inactiveClassName,
    ].join(' ')
  }, [className, activeClassName, inactiveClassName, activeTab, index])

  let interactionProps = useMemo(() => {
    let interactions: any = {}

    interactions.onClick = () => setActiveTab(index)

    if (trigger === 'hover') {
      interactions.onMouseEnter = () => setActiveTab(index)
    }

    return interactions
  }, [trigger, setActiveTab, index])

  return (
    <button
      ref={tabRef}
      role="tab"
      aria-controls={`${id}-${index}`}
      aria-selected={activeTab === index}
      tabIndex={activeTab === index ? 0 : -1}
      className={calculatedClassName}
      {...interactionProps}
      {...props}
    />
  )
}

type HTMLTags = keyof JSX.IntrinsicElements

interface TabPanelProps {
  as?: HTMLTags
  index: number
  className: string
  activeClassName: string
  inactiveClassName: string
  children?: React.ReactNode
  [key: string]: any
}

export function TabPanel({
  as: Component = 'div',
  index,
  className,
  activeClassName,
  inactiveClassName,
  ...props
}: TabPanelProps) {
  let { id, activeTab } = useContext(TabContext)

  let calculatedClassName = useMemo(() => {
    return [
      className,
      activeTab === index ? activeClassName : inactiveClassName,
    ].join(' ')
  }, [className, activeClassName, inactiveClassName, activeTab, index])

  return (
    <Component
      style={{
        ...props.style,
        visibility: activeTab === index ? 'visible' : 'hidden',
      }}
      id={`${id}-${index}`}
      role="tabpanel"
      aria-expanded={activeTab === index}
      className={calculatedClassName}
      {...props}
    />
  )
}

interface TabListProps {
  as?: HTMLTags
  children?: React.ReactNode
  [key: string]: any
}

export function TabList({ as: Component = 'div', ...props }: TabListProps) {
  let tabListRef = useRef<any>()
  let { setActiveTab, numTabs, activeTab, direction } = useContext(TabContext)

  let handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      let actions: Record<string, () => void> = {
        End: () => {
          setActiveTab(numTabs - 1)
        },
        Home: () => {
          setActiveTab(0)
        },
      }

      if (direction === Direction.HORIZONTAL) {
        actions.ArrowLeft = () => {
          let previous = activeTab - 1 >= 0 ? activeTab - 1 : numTabs - 1
          setActiveTab(previous)
        }

        actions.ArrowRight = () => {
          let next = activeTab + 1 < numTabs ? activeTab + 1 : 0
          setActiveTab(next)
        }
      }

      if (direction === Direction.VERTICAL) {
        actions.ArrowUp = () => {
          let previous = activeTab - 1 >= 0 ? activeTab - 1 : numTabs - 1
          setActiveTab(previous)
        }

        actions.ArrowDown = () => {
          let next = activeTab + 1 < numTabs ? activeTab + 1 : 0
          setActiveTab(next)
        }
      }

      let action = actions[e.key]

      if (action) {
        e.preventDefault()
        action()
      }
    },
    [setActiveTab, activeTab, numTabs, direction]
  )

  useEffect(() => {
    tabListRef.current.addEventListener('keyup', handleKeyUp)

    return () => tabListRef.current.removeEventListener('keyup', handleKeyUp)
  }, [handleKeyUp])

  // @ts-ignore
  return <Component ref={tabListRef} role="tablist" {...props} />
}

TabGroup.Tab = Tab
TabGroup.TabPanel = TabPanel
TabGroup.TabList = TabList
TabGroup.useTab = useTab

TabGroup.direction = Direction
