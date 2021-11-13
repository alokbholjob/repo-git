import { useEffect, useState } from 'react';
import './DetailScreen.css';
import { Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { useHistory } from 'react-router';


const DetailScreen = (props) => {
    const [players, setPlayers] = useState([]);
    const history= useHistory();

    useEffect(() => {
        // we are getting data through api--method: 'GET' called
        const apiKey = "https://6130765d5fc50700175f18e9.mockapi.io/api/olympic";
        fetch(apiKey).then(res=>{
            return res.json();
        }).then(data=>{
            setPlayers(data);
        })
        //setPlayers(JSON.parse(localStorage.getItem("tableData"))); //localy we get the data

    }, [])


    const columns = [
        { dataField: 'id', text: 'REGISTRATION ID' },
        { dataField: 'name', text: 'NAME' },
        { dataField: 'age', text: 'AGE' },
        { dataField: 'gender', text: 'GENDER' },
        { dataField: 'country', text: 'COUNTRY' },
        { dataField: 'vaccinationStatus', text: 'VACCINATION STATUS' },
        { dataField: 'catagory', text: 'CATAGORY' },
        { dataField: 'previousMedalHistory.gold', text: 'GOLD' },
        { dataField: 'previousMedalHistory.silver', text: 'SILVER' },
        { dataField: 'previousMedalHistory.bronze', text: 'BRONZE' }

    ];
    //Navigating from table data to register page to upadate the data
    const rowEvents= {
        onClick: (e, row, rowIndex)=>{
            console.log("row",row);
            history.push({
                pathname: '/',
                playerId: row.id
            })
        }
    };

    return (
        <div style={{ marginTop: 40, padding: '5px'}}>
            <Container>
                <BootstrapTable keyField='table' data={players} columns={columns} rowEvents={rowEvents}/>
            </Container>
        </div>
    );

}
export default DetailScreen;