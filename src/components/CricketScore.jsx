import React , {useEffect,useState} from "react";
import "dotenv";
import "../App.css";

const Cricketscore = () =>{
    const [res,setResult] = useState([]);
    const[search, setSearch] = useState(''); 
const apikey = import.meta.env.VITE_API_KEY;
const fetchcricketscore = async()=>{
   
    try{
        
const result = await fetch("https://api.cricapi.com/v1/cricScore?apikey=7c3e9053-dae4-4000-81dd-fa83e1103076");
const data = await result.json();


setResult(data.data) 
    }
    catch(err){
        console.log(err);
    }
}





useEffect(() => {
fetchcricketscore()
},[])

console.log(res);

const filtereddata = res.filter((match) =>

    match.status != "Match not Started" && ( match.series.toLowerCase().includes(search.toLowerCase()) || match.t1.toLowerCase().includes(search.toLowerCase()) || match.t2.toLowerCase().includes(search.toLocaleLowerCase))


)


console.log(filtereddata);



    return(
        <div className="max-w-screen-x1 min-h-screen">
            
            

<div className="flex items-center justify-center gap-4 pt-5 nav"> 
    
<h1 style={{fontFamily:"monospace" ,fontWeight:"bold" , color:"white" , fontSize:"x-large" ,display:"flex" , justifyContent:"flex-start" , alignItems:"flex-start"}}>Live Cricket Matches</h1>
    
    <input onChange={(e) =>setSearch(e.target.value)}type="text" className="w-[30%] p-4 border border-indigo-500 outline-none rounded-lg text-white" style={{marginLeft:"35vw"}} placeholder="search your team .." />

    <button className="px-6 py-2 rounded-lg border-none outline none bg-blue-700 text-white hover:bg-white hover:text-black duration-300 transition">Search</button>

  
</div>



<div className="w-full h-full  grid grid-cols-3 gap-4 mt-5 p-5" style={{marginRight:"0px"}}> 

{
        (filtereddata ) ? (filtereddata.map((match, index) => { 
            
            return <div className="card  "  >
    
    

     

       <h2 style={{padding:" 5vh 3vw 1vh 2vw" , fontWeight:"bold"}} >{match.series}</h2>
        <h4 className="txt opacity-70 "> {match.matchType}</h4>
        
        

        <div className=" box" >
            <div className="lrcard">
              

                <img className="h-32 object-cover object-center "   src={match.t1img}></img>
                <div>
                <h2 className="teamname" style={{textWrap:"pretty"}}>
               {match.t1}
                </h2></div>
                 <h4 className="opacity-70 font-medium">{match.t1s}</h4> 

            </div>

            <div className="lrcard">
                <img className="h-32 object-cover object-center" src={match.t2img}></img>
                <h2 className="teamname">{match.t2}</h2>
               
                <h4 className="opacity-70 font-medium">{match.t2s}</h4>
                
            </div>

            
</div>
<h4 style={{padding:"1vh 0vw 5vh 2vw", display:"flex" ,justifycontent:" space-around",alignitems: "flex-start" , fontSize:"bold" }}> Status : <span style={{color:"green"}}> {match.status}</span></h4>
</div>
}))
:(<p style={{color:"white"}}>No Result</p>)

}

   


</div>  



</div>
    )}      
   
export default Cricketscore;

