import axios from "axios";

const ServerURL="http://localhost:5000"

const postData=async(url,body)=>{

    try{
          

    var response= await axios.post(`${ServerURL}/${url}`,body)
      var result= await response.data

      return(result)

        }catch(error)
        {
            return(false)
        }


    }
    export const getData=async(url)=>{
      try{
    var response=await axios.get(`${ServerURL}/${url}`)
    var result= await response.data
    
     return(result)
      }
    
    catch(error)
    {
      return(false)
    }
    }
    

export  {ServerURL,postData}
