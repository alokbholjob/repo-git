import React,{useState, useEffect} from 'react';
import './AboutScreen.css';
import { Pie } from 'react-chartjs-2';

function AboutScreen(){
  // Important concept
    const [allPlayers, setAllPlayers]= useState([]);

    useEffect( ()=>{
        const apiKey = "https://6130765d5fc50700175f18e9.mockapi.io/api/olympic";
        
        fetch(apiKey).then(res=>{
            return res.json();
        }).then(data=>{
            setAllPlayers(data);
        })
    },[] )

    function uniqueValues(value, index, self){
        return self.indexOf(value)=== index;
    }
    const allCountriesWithRepetation= allPlayers.map(m =>m.country)
    let result= {}
    const allCountriesWithCount= allCountriesWithRepetation.map(x =>{
      if(x in result){
        result[x]= result[x]+1;
      }
      else{
        result[x]= 1;
      }
    })

    const data= {

        //map()  used to extract the countries from all players // vimp concept-- map, filter, groupBy
        // filter() used to extrat the unique values in countries i.e if(3,3,5)= then(it should be [3,5])
        labels: allCountriesWithRepetation.filter(uniqueValues),
        datasets: [
          {
            label: '# of Participant country wise',
            data: Object.keys(result).map(m =>result[m]), //object.keys() returns the keys of an array/object
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };



    return(
    <>
        <div className="container">

        <Pie data={data} />
        </div>
    </>
    )    
}
export default AboutScreen;