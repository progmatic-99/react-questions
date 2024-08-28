import { createContext, useContext } from "react";

const TabContext = createContext(null)

export default function Tab({value, onChange, children}) {
  return <div className="tab">
    <TabContext.Provider value={{value, onChange}}>{children}</TabContext.Provider>
  </div>
}

Tab.TabHeaders = ({children}) => {
  return (<div className="tab-headers">
    {children}
  </div>)
}

Tab.TabItem = ({index, children}) => {
  const {value, onChange} = useContext(TabContext)
  const handleClick = () => {
    onChange(index)
  }

  return (
    <div onClick={handleClick} className={`tab-item ${value === index ? 'active' : ''}`}>
      {children}
    </div>
  )
}

Tab.ContentWrapper = ({children}) => {
  return (
    <div className="wrapper">{children}</div>
  )
}

Tab.TabContent = ({index, children}) => {
  const {value} = useContext(TabContext)
  return (
    value === index ? <div className="tab-content">{children}</div> : ''
  )
}