import {useState} from "react";
import "./styles/App.css"
import MyButton from "./components/UI/buttons/MyButton";
import MyInput from "./components/UI/inputs/MyInput";
import axios from "axios";


const App = () => {

    const [listName, setListName] = useState('')
    const [cardList, setCardList] = useState([])
    const [currentCard, setCurrentCard] = useState(null)

    function clickDownloadButton(e) {
        axios.get('http://localhost:8080/get-car-policy?parameter=' + listName)
            .then(res => {
                let companyData = res.data.carPolicyList
                console.log(companyData)
                setCardList(companyData)
            })
            .catch(err => {
                console.log(err);
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
        })
    }

    function dragStartHandler(e, card) {
        setCurrentCard(card)
    }

    function dragEndHandler(e) {
        e.target.style.background = 'white'
    }

    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.background = 'lightblue'
    }

    function dragDropHandler(e, card) {
        e.preventDefault()
        setCardList(cardList.map(c => {
            // if (card.order > currentCard.order && (c.order > currentCard.order)) {
            //     return {...c, order: c.order-1}
            // }
            // if (card.order < currentCard.order && (c.order < currentCard.order)) {
            //     return {...c, order: c.order+1}
            // }
            if (c.id === card.id) {
                return {...c, order: currentCard.order}
            }
            if (c.id === currentCard.id) {
                return {...c, order: card.order}
            }
            return c
        }))
        e.target.style.background = 'white'
    }

    const sortCards = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }
    return (
        <div className='app'>
            {cardList.sort(sortCards).map((card) =>
                <div key={card.id}
                     onDragStart={(e) => dragStartHandler(e, card)}
                     onDragLeave={(e) => dragEndHandler(e)}
                     onDragEnd={(e) => dragEndHandler(e)}
                     onDragOver={(e) => dragOverHandler(e)}
                     onDrop={(e) => dragDropHandler(e, card)}
                     draggable={true}
                     className={'card'}>
                    {card.name}
                </div>
            )}
            <MyInput
                value = {listName}
                type="text"
                placeholder="The name of the list"
                onChange={e => setListName(e.target.value)}/>
            <MyButton onClick={e => clickDownloadButton(e)}>Download</MyButton>
            <MyButton onClick={e => clickSendButton(e)}>Send new data</MyButton>
        </div>
    )
}

export default App