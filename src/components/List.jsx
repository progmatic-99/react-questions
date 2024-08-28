import { useState, useRef } from "react";

const initialItems = [
  {
    id: 1,
    name: "Item 1",
    category: "Category A",
    color: "red",
    isActive: false,
  },
  {
    id: 2,
    name: "Item 2",
    category: "Category B",
    color: "blue",
    isActive: false,
  },
  {
    id: 3,
    name: "Item 3",
    category: "Category A",
    color: "green",
    isActive: false,
  },
  {
    id: 4,
    name: "Item 4",
    category: "Category C",
    color: "red",
    isActive: false,
  },
];

export const List = () => {
  const [items, setItems] = useState([...initialItems]);
  const inputRef = useRef(null);

  function debounce(fn, delay=1000) {
    let timer
    return function() {
      let context = this, args = arguments;
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }
  const handleSearch = (e) => {
    const filter = e.target.value;
    const re = new RegExp(filter, "gi");
    console.log(re);
    const filterItems = initialItems.filter((item) => {
      const fullQuery = `${item.name} ${item.category}`;
      if (fullQuery.search(re) !== -1) {
        return item;
      }
    });
    setItems(filterItems);
  };

  const betterSearch = debounce(handleSearch)

  const handleClick = (clickedItem) => {
    const newItems = items.map((item) => {
      if (item.id === clickedItem.id) {
        item.isActive = !item.isActive;
      }
      return item;
    });
    setItems(newItems);
  };
  return (
    <>
      <input ref={inputRef} onInput={betterSearch} />
      <ul>
        {items.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => handleClick(item)}
              style={{ backgroundColor: item.isActive ? item.color : "" }}
            >
              {item.name} {item.category}
            </li>
          );
        })}
      </ul>
    </>
  );
};
