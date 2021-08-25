import {useState} from "react";
import "./styles/App.css"
import MyButton from "./components/ui/buttons/MyButton";
import DragDropList from "./components/DragDropList";
import Select from "./components/ui/select/Select";
import {getList, setList} from "./api/DataService";


const App = () => {

    const optionAttributes = [
        {value: 'EQS', text: 'EQS'},
        {value: 'C123', text: 'C123'},
        {value: 'A123', text: 'A123'},
        {value: 'G', text: 'G'}]
    const [listName, setListName] = useState('EQS')
    const [cardList, setCardList] = useState([])

    const downloadData = () => {
        getList(listName, setCardList)
    }

    const sendData = () => {
        setList(listName, cardList)
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