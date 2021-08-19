import {useState} from "react";
import "./styles/App.css"
import MyButton from "./components/UI/buttons/MyButton";
import axios from "axios";
import Option from "./components/options/Option";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";


const App = () => {

    const optionAttributes = [
        {value: 'list1', text: 'List 1'},
        {value: 'list2', text: 'List 2'},
        {value: 'list3', text: 'List 3'},
        {value: 'list4', text: 'List 4'}]
    const [listName, setListName] = useState('list1')
    const [cardList, setCardList] = useState([])

    function clickDownloadButton(e) {
        axios.get('http://localhost:8080/get-car-policy?parameter=' + listName)
            .then(res => {
                console.log(res.data.carPolicyList)
                let companyData = res.data.carPolicyList
                setCardList(companyData)
            })
            .catch(err => {
                console.log(err);
                alert('There is no connection to the endpoint.')
            })
    }

    function clickSendButton(e) {
        fetch('http://localhost:8080/set-car-policy', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                parameter: listName,
                carPolicyList: cardList
            })
        }).then(() => {
            console.log('The data was sent')
            alert('The data was sent successfully')
        }).catch(() => {
            alert('There is no connection to the endpoint.')
        })
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        console.log(result)
        console.log(list)
        return result
    }
    const onEnd = (result) => {
        console.log(result)
        if (result.destination !== null && result.source !== null) {
            setCardList(reorder(cardList, result.source.index, result.destination.index))
        }

    }
    return (
        <div className='app'>
            <select id="select" onChange={e => setListName(e.target.value)}>
                {optionAttributes.map((item, index) =>
                    <Option key={index} value={item.value}>{item.text}</Option>
                )}
            </select>
            <MyButton onClick={e => clickDownloadButton(e)}>Download</MyButton>
            <MyButton onClick={e => clickSendButton(e)}>Send new data</MyButton>
            <h5>Draggable list of items: </h5>
            <DragDropContext onDragEnd={onEnd}>
                <Droppable droppableId='droppableTag'>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                            {cardList.map((item, index) => (
                                <Draggable
                                    draggableId={item.id}
                                    key={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <div className="drag-item">{item.name}</div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                    }
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default App