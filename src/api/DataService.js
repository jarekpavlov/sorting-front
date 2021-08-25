import axios from "axios";

export const getList = async (listName, setCardList) => {
    try {
        let res = await axios.get('http://localhost:8080/carpolicy?parameter=' + listName)
        setCardList(res.data)
        console.log(res.data)
    } catch (e) {
        console.log(e);
        alert('There is no connection to the endpoint.')
    }
}

export const setList = async (listName, cardList) => {
    try {
        await axios.post('http://localhost:8080/carpolicy?parameter=' + listName, cardList)
        console.log('The data was sent')
        alert('The data was sent successfully')
    } catch (e) {
        console.log(e);
        alert('There is no connection to the endpoint.')
    }
}
