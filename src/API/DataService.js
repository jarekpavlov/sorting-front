import axios from "axios";

export default class DataService {
    static getList(listName, setCardList) {
        axios.get('http://localhost:8080/get-car-policy?parameter=' + listName)
            .then(res => {
                console.log(res.data)
                let companyData = res.data
                setCardList(companyData)
            })
            .catch(err => {
                console.log(err);
                alert('There is no connection to the endpoint.')
            })
    }

    static setList(listName, cardList) {
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
}