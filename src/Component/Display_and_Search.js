import MaterialTable from "@material-table/core";
import { height } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { postData, ServerURL } from "../NodeServices/Services";

export default function Display_and_Search()
{
     
  var location=useLocation()
  var Emailid=location.state.res
 
  const [ImagesData,setImagesData]=useState([])



  const handleGetImages=async()=>{

    var result= await postData('insert/getimages',{email:Emailid})
     setImagesData(result.data)
  }
 useEffect(function(){
handleGetImages()
 },[])

 function displayTable()
 {
    return(
          <MaterialTable
   title="User Images"
      data={ImagesData}
      columns={[
        {
          title: "Full Name",
          field: "name",
         },
        {
          title: "Email-Id",
          field: "email",
        },
          {
            title: "picture",
            render: (rowData) => {
                return (
                  <img src={`${ServerURL}/images/${rowData.picture}`} style={{ width: 70 ,height:70 }} />
                );
              },
          }
      
      
      ]}
     
    />
    )
 }

    return(
    
        <div>
        {displayTable()}
           
        </div>
    )
}