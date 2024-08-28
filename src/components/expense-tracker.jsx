import { useRef, useState } from "react"


const ExpenseTracker = () => {
  const [expenseItems, setExpenseItems] = useState([])
  const nameRef = useRef("")
  const amountRef = useRef("")
  const dropdownRef = useRef("")

  const handleSubmit = () => {
    if (nameRef.current.value === "") {
      alert('Name cannot be empty!!')
      return
    }
    if (amountRef.current.value === "" || amountRef.current.value <= 0 || isNaN(amountRef.current.value)) {
      alert('Amount cannot be empty')
      return
    }

    const item = {
      name:    nameRef.current.value,
      amount:   amountRef.current.value,
      category: dropdownRef.current.value
    }
    nameRef.current.value = ""
    amountRef.current.value = ""
    dropdownRef.current.value = ""
    console.log(expenseItems)

    setExpenseItems(prevState => [...prevState, item])
    let totalExpenses = 0;
    let totalFoodExpenses = 0;
    let totalTravelExpenses = 0;
    let totalShoppingExpenses = 0;
    expenseItems.forEach(item => {totalExpenses += parseInt(item.amount)})
    expenseItems.forEach(item => {
      if (item.category === "food" && item.amount) totalFoodExpenses += item.amount
    })
  }

  return (
    <>
    <input placeholder="Name" ref={nameRef}/>
    <input placeholder="Amount" ref={amountRef} />
    <select name="cars" id="cars" ref={dropdownRef}>
      <option value="" selected>Select Category</option>
      <option value="food">Food</option>
      <option value="travel">Travel</option>
      <option value="shopping">Shopping</option>
    </select>
    <button onClick={handleSubmit}>Add Expense</button>
    <table>
      <thead>
        <tr>Sr No</tr>
        <tr>Name</tr>
        <tr>Amount</tr>
        <tr>Category</tr>
      </thead>
      <tbody>
    {
      expenseItems.length > 0 && expenseItems.map((item, idx) => {
        return (
        <tr key={item.name}>
          <td>{idx + 1}</td>
          <td>{item.name}</td>
          <td>{item.amount}</td>
          <td>{item.category.toUpperCase()}</td>
        </tr>
        )
      })
    }
    </tbody>
    </table>
    </>
  )
}

export default ExpenseTracker