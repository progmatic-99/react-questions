import { useState } from "react"

const SelectableGrid = ({rows, cols}) => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [selected, setSelected] = useState([])
  const handleMouseUp = () => {
    setIsMouseDown(false)
    setSelected([])
  }
  const handleMouseEnter = (boxNumber) => {
    if (isMouseDown) {
      const startBox = selected[0]
      const endBox = boxNumber
      const startRow = Math.floor((startBox - 1) / cols)
      const startCol = (startBox - 1)% cols
      
      const endRow = Math.floor((endBox - 1) / cols)
      const endCol = (endBox - 1)% cols
      const minRow = Math.min(startRow, endRow)
      const maxRow = Math.max(startRow, endRow)
      const minCol = Math.min(startCol, endCol)
      const maxCol = Math.max(startCol, endCol)

      const selectedBoxes = []
      for (let row=minRow; row<=maxRow; ++row) {
        for (let col=minCol; col<=maxCol; ++col) {
          selectedBoxes.push(row * cols + col + 1)
        }
      }
      setSelected(selectedBoxes)
    }
  }
  const handleMouseDown = (boxNumber) => {
    setIsMouseDown(true)
    setSelected([boxNumber])
  }

  return (
    <div className="grid" style={{"--rows": rows, "--cols": cols}}
    onMouseUp={handleMouseUp}
    >
      {[...Array(rows * cols).keys()].map((_, idx) => {
        return <div 
        key={idx} className={`box ${selected.includes(idx+1) ? 'selected' : '' }`}
        onMouseDown={() => handleMouseDown(idx+1)}
        onMouseEnter={() => handleMouseEnter(idx+1)}
        >{idx + 1}</div>
      })}
    </div>
  )
}

export default SelectableGrid