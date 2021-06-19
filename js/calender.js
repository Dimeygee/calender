let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
let wkday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


let currentDayTxt = document.querySelector('.date')
let tableData = document.querySelectorAll('td')
let weekDayTxt = document.querySelector('.day')
let monthTxt = document.querySelector('.month')
let arrow_left = document.querySelector('.arrow_left')
let arrow_right = document.querySelector('.arrow_right')
let tableRows = document.querySelectorAll('[data-row]')
let yearTxt = document.querySelector('.year')
let smallTxt = document.querySelector('.small')
let lftMnth = document.querySelector('.month_str')
let tableContainer = document.querySelector('.table_container')


let inx = 0
let newDate


arrow_left.onclick = function(){
	tableData.forEach(data => {
		if(data.classList.contains('active')) data.classList.remove('active')
	})
    let date = new Date()
    inx--
    newDate = date.getMonth() == 0 ? new Date(date.getFullYear() + inx,date.getMonth(),1) :
    new Date(date.getFullYear(), date.getMonth() + inx , 1)
	checkToday(newDate)
	fadeIn()
    setCalender(setDateData(newDate))
	
}

arrow_right.onclick = function(){
	tableData.forEach(data => {
		if(data.classList.contains('active')) data.classList.remove('active')
	})
    let date = new Date()
    inx++
    newDate = date.getMonth() == 0 ? new Date(date.getFullYear() + inx,date.getMonth(),1) :
    new Date(date.getFullYear(), date.getMonth() + inx , 1)
	checkToday(newDate)
	fadeIn()
    setCalender(setDateData(newDate))
}

function setDateData(date){
    let monthData = []
    for(let i = 0; i <= 31; i++){
        let currentDate = new Date(date.getFullYear(),date.getMonth(),i)
        date.getMonth() !== currentDate.getMonth() ? ''
        : monthData[i] = {
            data:{
                year : currentDate.getFullYear(),
                month : months[currentDate.getMonth()],
                date : currentDate.getDate(),
                weekday : wkday[currentDate.getDay()],
                todays : date.getDate() == currentDate.getDate() ? true : false,
                column : currentDate.getDay()
            }
        }
    }  
    return monthData
}


/*
function getPrevMonthData(monthData){

}

function getNextMonthData(monthData){

}*/


function checkDateNumbers(date){
	let suff = ['st','nd','rd','th']
	let j = date.getDate() % 10, k = date.getDate() % 100;
	if(j == 1 && k !== 11) return `<span>${date.getDate()}</span><span style='font-size:30px'>${suff[0]}</span>`
	if(j == 2 && k != 12) return `<span>${date.getDate()}</span><span style='font-size:30px'>${suff[1]}</span>`
	if(j == 3 && k !== 13) return `<span>${date.getDate()}</span><span style='font-size:30px'>${suff[2]}</span>`
	return `<span>${date.getDate()}</span><span style='font-size:30px'>${suff[3]}</span>`
	
}


function setCalender(monthData){
    let row = 0
    let date = new Date()
    tableData.forEach(data => data.innerText = '')
    currentDayTxt.innerHTML = checkDateNumbers(date)
    weekDayTxt.innerText = wkday[date.getDay()]
	lftMnth.innerText = months[date.getMonth()]
    monthData.forEach(datas => {
        yearTxt.innerText = datas.data.year
        monthTxt.innerText = datas.data.month
        tableRows[row].children[datas.data.column].innerText = datas.data.date
		checkToday(tableRows[row].children[datas.data.column].innerText,
		tableRows[row].children[datas.data.column],datas.data.month)
        if(datas.data.column == 6) row++
    })/*
    tableData.forEach(data => console.log(data.innerText))
    getPrevMonthData(monthData)
    getNextMonthData(monthData)*/
  
}



function checkToday(date,tclass,crMth){
	let cur = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
	let curMnth = months[new Date().getMonth()]
	if(curMnth == crMth){
		if(date == cur.getDate()){
			tclass.classList.add('active')
		}else{
			tclass.classList.remove('active')
		}
	}
	
		
}


function fadeIn(){
	tableContainer.classList.add('fade')
	setTimeout(() => {
		tableContainer.classList.remove('fade')
	},300)
}






setCalender(setDateData(new Date()))













