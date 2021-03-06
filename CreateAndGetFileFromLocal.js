// This is just my quickly made spaghetti template for the bookmarklets which helps with using some local files
function CreateAndGetFile(allowFormat = '.html, .htm', createType = 'iframe', afterLoadFunc = null, needBlob = null, act = 'readAsDataURL', appendTarget = document.body, elProp = "src")
{
	function getFile(fileInput = null, outputEl)
	{
		if(!fileInput || !outputEl) { return }

		let ReaderInstance  = new FileReader();
		ReaderInstance.onloadend = () =>
		{
			outputEl[elProp] = ReaderInstance.result;
			if(afterLoadFunc) { outputEl.addEventListener('load', () => { afterLoadFunc(outputEl); }, { once: true }); }
			if(outputEl.tagName == 'NONE') { afterLoadFunc(outputEl); outputEl.remove(); }
		}
		fileInput.addEventListener('change', () =>
		{
			if(document.getElementById('_outputGettedFile')) { document.getElementById('_outputGettedFile').remove(); }
			appendTarget.append(outputEl);
			let file = fileInput ? fileInput.files ? fileInput.files[0] : null : null;
			if(!file) { return outputEl.remove(); }
			if(needBlob) { outputEl.objectURL = URL.createObjectURL(file); }
			ReaderInstance[act](file);
		}, { once: true });
	}

	let fileInput = document.createElement('input');
	fileInput.setAttribute('type', 'file');
	fileInput.setAttribute('accept', allowFormat);
	let outputEl = createType ? document.createElement(createType) : document.createElement('NONE');
	outputEl.setAttribute('id', '_outputGettedFile')
	outputEl.setAttribute('height', '100%');
	outputEl.setAttribute('width', '100%');

	fileInput.addEventListener('click', () => { getFile(fileInput, outputEl); }, { once: true });
	fileInput.click();
}
// CreateAndGetFile('.html', 'iframe', (el) => { console.log(el.id, "is loaded!"); });
// "CreateAndGetFile('.txt', 'script', (el) => { CreateAndGetFile('.html', 'iframe'); });", "CreateAndGetFile('.txt', 'text', undefined, false, 'readAsText', undefined, 'innerText');", "CreateAndGetFile('.txt', 'iframe');", "CreateAndGetFile('.png, .jpg', 'img', (el) => { el.src = el.objectURL; console.log(el); }, true);", "CreateAndGetFile('.png, .jpg', null, (el) => { window['VarWithFile'] = { base64: el.src, blob: el.objectURL }; alert(`Blob link: ${VarWithFile.blob} \nAnd base64 link: ${VarWithFile.base64}`) }, true);", etc. //
// Made by Japanese Schoolgirl (Lisa)
