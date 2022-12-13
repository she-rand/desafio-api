const formulario=document.querySelector("#formulario")
const resultado=document.querySelector("#resultado")
const monto=document.querySelector("#monto")
const moneda=document.querySelector("#moneda")


const getValores= async (moneda) => {
    try{
        const responseToday = await fetch("https://mindicador.cl/api/");
        const responseDays = await fetch(`https://mindicador.cl/api/${moneda}`);
        console.log(responseToday)
        if(!responseToday.ok){
            throw "Error al obtener los datos de hoy"
        }
        if(!responseDays.ok){
            throw "Error al obtener los datos para el grafico"
        }
        const data = await response.json();
        console.log(data);
    }catch(error){
        resultado.innerHTML=`<p>Error al obtener los datos desde la api</p>`

    }
    
    
};

formulario.addEventListener("submit", async(e)=>{
    e.preventDefault();

    const response=await fetch("https://mindicador.cl/ap");
    console.log(response);
    if(!response.ok){
        return console.log("error");
    }
    const data=await response.json();

    console.log(data[moneda.value]);
    resultado.innerHTML=`<p></p>`;

})

const renderChar=async(moneda)=>{

    const resp= await fetch(`https://mindicador.cl/api/${moneda}`);

}