import { useContext,createContext,useState,useEffect } from "react";
import axios from "axios";

const StateContext=createContext()

export const StateContextProvider =({children})=>{
    const [weather , setWether]=useState({})
    const [values,setValues]=useState([])
    const [place,setPlace]=useState('Vatakara')
    const [thisLocation,setLocation]=useState('')

    const fetchWeather=async()=>{
        const options={
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
            },
            Headers:{
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host':'visual-crossing-weather.p.rapidapi.com'
            }
        }
        try{
            const response=await axios.request(options)
            console.log("Data",response.data);
            const thisData=Object.values(response.data.location)[0]
            setLocation(thisData.address)
            setValues(thisData.values)
            setWether(thisData.values[0])
        }catch(err){
            console.error(err)
            alert('This place does not exist')
        }
    }
    useEffect(()=>{
        fetchWeather()
    },[place])
    useEffect(() => {
        console.log(values)
    }, [values])

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation
        }}>
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = ()=>useContext(StateContext)