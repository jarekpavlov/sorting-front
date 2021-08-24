import {useState} from "react";
import "./styles/App.css"
import MyButton from "./components/UI/buttons/MyButton";
import DragDropList from "./components/DragDropList";
import DataService from "./API/DataService";
import Select from "./components/UI/select/Select";


const App = () => {

    const optionAttributes = [
        {value: 'list1', text: 'List 1'},
        {value: 'list2', text: 'List 2'},
        {value: 'list3', text: 'List 3'},
        {value: 'list4', text: 'List 4'}]
    const [listName, setListName] = useState('list1')
    const [cardList, setCardList] = useState([])

    const downloadData = () => {
        DataService.getList(listName, setCardList)
    }

    const sendData = () => {
        DataService.setList(listName, cardList)
    }

    return (
        <div className='app'>
            <Select optionAttributes={optionAttributes} setListName={setListName}/>
            <MyButton onClick={e => downloadData(e)}>Download</MyButton>
            <MyButton onClick={e => sendData(e)}>Send new data</MyButton>
            <h5>Draggable list of items: </h5>
            <DragDropList cardList={cardList} setCardList={setCardList}/>
        </div>
    )
}

export default App