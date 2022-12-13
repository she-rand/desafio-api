const formulario=document.querySelector("#formulario")
const resultado=document.querySelector("#resultado")
const monto=document.querySelector("#monto")
const moneda=document.querySelector("#moneda")
const spinner=document.querySelector("#spinner")

const ctx = document.getElementById('myChart');
let grafico;


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
        const dataHoy = await responseToday.json();
        const dataDays = await responseDays.json();
        console.log(dataHoy);
        return {valorHoy:dataHoy[moneda].valor,valorDays:dataDays.serie.slice(0,10).reverse()};
    }catch(error){
        resultado.innerHTML=`<p>Error al obtener los datos desde la api</p>`

    }
    
    
};

const validaciones=()=>{
    
    if(isNaN(parseInt(monto.value))){
        resultado.innerHTML=`<p>Debe ingresar un número en moneda</p>`;
    return false;
    }
    return true;
}
const renderChart=(labels,data)=>{
    console.log(grafico)
    if(grafico){
        grafico.destroy();
    }
    grafico= new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Valores en cl pesos',
            data: data,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
     

}

formulario.addEventListener("submit", async(e)=>{
    e.preventDefault();
    if(validaciones()==false){
        return;
    }
   
    let valores;
    try{
        spinner.classList.remove("d-none")
        valores=await getValores(moneda.value);
        if(valores===undefined){
            throw "Hay un error al traer datos"
        }
    }catch(error){
        console.log("Error")
    }finally{
        spinner.classList.add("d-none")
       


    }
    
    console.log(valores.valorDays);
    const labels = valores.valorDays.map((item) => {
        return item.fecha.split("T")[0].split("-").reverse().join("-");
    });
    
    const data = valores.valorDays.map((item) => {
        return item.valor;
    });
   
    resultado.innerHTML=`<p>Resultado:${parseInt(monto.value)/parseFloat(valores.valorHoy)}</p>`
    renderChart(labels,data);

})



