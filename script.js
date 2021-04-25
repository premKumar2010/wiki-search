function getNoRecordsTemp(){
	return `<div class="no-records">No Records Found...</div>`;
}

async function getData(searchText){
	const url = `https://en.wikipedia.org/wiki/Special:Search?search=${searchText}&go=Go&ns0=1`;

	const response = await fetch(url);

	console.log('response', response);

}

async function getContent(){
	const ele           = document.querySelector(`section.class-container > input`);
	const parentEle     = document.querySelector(`section:nth-of-type(2)`);
	parentEle.innerHTML = '';
	const value         = ele.value;

	if(value && value.length){
		await getData(value);
		console.log('Value', value);
	} else{
		parentEle.innerHTML = getNoRecordsTemp();
	}
}