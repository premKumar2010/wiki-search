/*
* URL for Wikipedia API
* https://www.mediawiki.org/wiki/API:Main_page
*
* https://css-tricks.com/snippets/javascript/javascript-keycodes/
* */

function getNoRecordsTemp(){
	return `<div class="no-records">No Records Found...</div>`;
}

async function getData(searchText){
	const url      = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&format=json&origin=*&srlimit=20&srsearch=${searchText}`;
	const response = await fetch(url);
	if(response.status === 200){
		const data = await response.json();
		return data.query.search;
	} else{
		window.alert('Something went wrong. Try again later...');
	}
}

function buildArticles(records){
	let template = ``;
	const url    = 'https://en.wikipedia.org/?curid=';

	for(record of records || []){
		template += `<article>
           <h2>
				<a href="${url}${record.pageid}" target="_blank">${record.title}</a>
			</h2>
			<a href="${url}${record.pageid}" target="_blank">${url}${record.pageid}</a>
			<div>${record.snippet}</div>
          </article>`;
	}
	return template;
}

async function getContent(){
	const ele           = document.querySelector(`section.class-container > input`);
	const parentEle     = document.querySelector(`section:nth-of-type(2)`);
	parentEle.innerHTML = '';
	const value         = ele.value;

	if(value && value.length){
		const records       = await getData(value);
		parentEle.innerHTML = buildArticles(records);
	} else{
		parentEle.innerHTML = getNoRecordsTemp();
	}
}

function keyUp(event){
	if(event.keyCode === 13){
		return getContent();
	}
	console.log(event);
}

function init(){

}