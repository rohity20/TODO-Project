import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);

  const addItem = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:4000/api/item', {item: itemText})
      setListItems(prev => [...prev, res.data]);
      setItemText('');
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get('http://localhost:4000/api/items')
        setListItems(res.data);
        console.log('render')
      }catch(err){
        console.log(err);
      }
    }
   
      getItemsList();

  },[]);

  return (
    <div className="App">
      <h1>TODO List App</h1>
      <form className="form" onSubmit={e => addItem(e)}>
        <input type="text" placeholder='Add Todo Item' onChange={e => {setItemText(e.target.value)} } value={itemText} />
        <button type="submit">Add</button>
      </form>


      <div className="todo-listItems">
        <h3>View Todo Items</h3>
        {
          listItems.map(item => (
          <div className="todo-item">
              <p className="item-content">{item.item}</p>
          </div>
          ))
        }
        
      </div>
    </div>
  );
}

export default App;