var createData =function(index, indexType)
{
	var data=[{placeholder: true, text: indexType[0].toUpperCase()+indexType.slice(1)}]
	
	Object.keys(index[indexType]).sort().forEach(key=>
		{
			data.push({text:key})
		})
	return data	
}
var retrieve=function(selection)
{
	var searchType =searchSelector.selected()

		var citationIndex=index[searchType][selection].citationIndex
		var citations=[]
		

		index[searchType][selection].citationIndex.forEach(item=>
		{
			citations.push(index.citation[item])
			
		})
		if (searchType==="magazine")
		{
			citations.sort((a,b)=>a.page.first-b.page.first)
		}
		else
		{
			citations.sort()
		}

		var citationHTML=`<div class="mt-4 d-flex justify-content-center"><div>
		<p class="text-muted">${citationIndex.length} ${citationIndex.length>1 ? "results":"result"}</p>${citations.map((citation)=>citation.body).join("")}</div></div>`
		document.querySelector("#results").innerHTML=citationHTML
}

var magazineSelector=new SlimSelect(
	{
		select: "#magazineSelector",
		data: createData(index, "magazine"),
	})
	magazineSelector.onChange=(selection)=>
	{
		if(magazineSelector.config.placeholderText!==selection.value)
		{
			retrieve(selection.value)
		}
		else {document.querySelector("#results").innerHTML=""}
	}
var articleSelector=new SlimSelect(
	{
		select: "#articleSelector",
		data: createData(index, "article"),
	})
	articleSelector.onChange=(selection)=>
	{
		if(articleSelector.config.placeholderText!==selection.value)
		{
			retrieve(selection.value)
		}
		else {document.querySelector("#results").innerHTML=""}
	}
var subjectSelector=new SlimSelect(
	{
		select: "#subjectSelector",
		data: createData(index, "subject"),
	})	
	subjectSelector.onChange=(selection)=>
	{
		if(subjectSelector.config.placeholderText!==selection.value)
		{
			retrieve(selection.value)
		}
		else {document.querySelector("#results").innerHTML=""}
	}
var authorSelector=new SlimSelect(
	{
		select: "#authorSelector",
		data: createData(index,"author"),
		
	})
	authorSelector.onChange=(selection)=>
	{
		if(authorSelector.config.placeholderText!==selection.value)
		{
			retrieve(selection.value)
		}
		else {document.querySelector("#results").innerHTML=""}
	}
	magazineSelector.slim.container.hidden=true
	articleSelector.slim.container.hidden=true
	authorSelector.slim.container.hidden=true		
var searchSelector=new SlimSelect(
	{
		select: "#searchSelector",
		data: 
		[
			{placeholder: true, text: "Search by"},
			{value: "magazine", text:"Magazine Index"},
			{value: "article", text:"Article Index"},
			{value: "author", text:"Author Index"},
			{value: "subject", text:"Subject Index"}
		],
		onChange: (selection) => 
		{
			var index=selection.value
			magazineSelector.set("Magazine")
			articleSelector.set("Article")
			authorSelector.set("Author")
			subjectSelector.set("Subject")
			if (index==="magazine")
			{
				magazineSelector.slim.container.hidden=false
				articleSelector.slim.container.hidden=true
				authorSelector.slim.container.hidden=true	
				subjectSelector.slim.container.hidden=true	
				return
			}
			if (index==="article")
			{
				magazineSelector.slim.container.hidden=true
				articleSelector.slim.container.hidden=false
				authorSelector.slim.container.hidden=true
				subjectSelector.slim.container.hidden=true		
				return
			}
			if (index==="author")
			{
				magazineSelector.slim.container.hidden=true
				articleSelector.slim.container.hidden=true
				authorSelector.slim.container.hidden=false	
				subjectSelector.slim.container.hidden=true	
				return
			}
			if (index==="subject")
			{
				magazineSelector.slim.container.hidden=true
				articleSelector.slim.container.hidden=true
				authorSelector.slim.container.hidden=true	
				subjectSelector.slim.container.hidden=false
				return
			}
		}
	})
	magazineSelector.slim.container.hidden=true
	articleSelector.slim.container.hidden=true
	authorSelector.slim.container.hidden=true	
	subjectSelector.slim.container.hidden=true	
