document.getElementById('ajaxSave').addEventListener('click', function () {
  let httpRequest = new XMLHttpRequest();
  if(!httpRequest){
	console.log('error occurred');
	return false;
  }
  httpRequest.onreadystatechange = function() {
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
	  if(httpRequest.status === 200){
		statusViewControl('저장 성공!', true);
	  } else{
		statusViewControl('저장 실패!', false);
	  }
	  loadingAnimationToggle(false);
	}
  };
  httpRequest.open('POST','save');
  id = document.getElementById('id').value;
  novel = document.getElementById('writing-area').value;
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.send(JSON.stringify({id, novel}));
  loadingAnimationToggle(true);
});

document.getElementById('ajaxLogin').addEventListener('click', function () {
  let httpRequest = new XMLHttpRequest();
  let id = document.getElementById('login-id').value;
  let pwd = document.getElementById('login-pw').value;
  if(!httpRequest){
	console.log('error occurred');
	return false;
  }
  httpRequest.onreadystatechange = function() {
	let loginForm = document.getElementById('loginForm');
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
	  if(httpRequest.status === 200){
		statusViewControl('로그인 성공!', true);
		loginForm.style.top = "0";
		loginForm.style.opacity = 0;
		setTimeout(() => {loginForm.style.display = 'none';}, 1000);
		document.querySelector('.topper').innerHTML += '<p>login as</p><h2>' + id + '</h2>'
		document.querySelector('#id').value = id;
		document.querySelector('#ajaxSave').style.display='inline-block'
		resultJSON = JSON.parse(this.responseText);
		if(resultJSON.hasNovelWritten && confirm('작성중이던 소설이 있어요. 불러올까요?')){
		  ajaxLoadWrittenNovel(id, pwd);
		}
	  } else{
		loginForm.classList.add('shake');
		statusViewControl('로그인 실패! - ' + this.response, false, 3000);
		setTimeout(() => {loginForm.classList.remove('shake')}, 500);
	  }
	  loadingAnimationToggle(false);
	}
  };
  httpRequest.open('POST','auth/login');
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.send(JSON.stringify({id, pwd}));
  loadingAnimationToggle(true);
});

//////////////////////////////////////////////

document.getElementById('ajaxSignup').addEventListener('click', function () {
	let httpRequest = new XMLHttpRequest();
	let id = document.getElementById('login-id').value;
	let pwd = document.getElementById('login-pw').value;
	if(!httpRequest){
	  console.log('error occurred');
	  return false;
	}
	httpRequest.onreadystatechange = function() {
	  let loginForm = document.getElementById('loginForm');
	  if (httpRequest.readyState === XMLHttpRequest.DONE) {
		if(httpRequest.status === 200){
		  statusViewControl('회원가입 성공!', true);
		  loginForm.style.top = "0";
		  loginForm.style.opacity = 0;
		  setTimeout(() => {loginForm.style.display = 'none';}, 1000);
		  document.querySelector('.topper').innerHTML += '<p>login as</p><h2>' + id + '</h2>'
		  document.querySelector('#id').value = id;
		  document.querySelector('#ajaxSave').style.display='inline-block'
		  resultJSON = JSON.parse(this.responseText);
		} else{
		  loginForm.classList.add('shake');
		  statusViewControl('회원가입 실패! - ' + this.response, false, 3000);
		  setTimeout(() => {loginForm.classList.remove('shake')}, 500);
		}
		loadingAnimationToggle(false);
	  }
	};
	httpRequest.open('POST','auth/signup');
	httpRequest.setRequestHeader('Content-Type', 'application/json');
	httpRequest.send(JSON.stringify({id, pwd}));
	loadingAnimationToggle(true);
});

//////////////////////////////////////////////

function ajaxLoadWrittenNovel(id,pwd){
  let httpRequest = new XMLHttpRequest();
  if(!httpRequest){
	console.log('error occurred');
	return false;
  }
  httpRequest.onreadystatechange = function() {
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
	  if(httpRequest.status === 200){
		document.getElementById('writing-area').value = this.responseText;
		statusViewControl('불러오기 성공!', true);
	  }
	  else{
		statusViewControl('로그인 실패!', false);
	  }
	  loadingAnimationToggle(false);
	}
  }
  httpRequest.open('POST','/get-written-novel');
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.send(JSON.stringify({id, pwd}));
  loadingAnimationToggle(true);
}

function statusViewControl(message, successFlag, viewingTime = 1500){
  let obj = document.getElementById('status-view');
  let type = successFlag ? 'green' : 'red';
  obj.innerText = message;
  obj.classList.add(type);
  obj.classList.add('appear');
  setTimeout(() => {
	obj.classList.remove(type);
	obj.classList.remove('appear');
  },viewingTime);
}
function loadingAnimationToggle(flag){
  /* True -> on */
  if(flag){
	document.querySelector('#loading-screen-block').style.display = 'block';
	document.querySelector('.lds-dual-ring').style.opacity = 1;
	document.querySelector('.lds-dual-ring').style.zIndex = 3;
  }
  else{
	document.querySelector('#loading-screen-block').style.display = 'none';
	document.querySelector('.lds-dual-ring').style.opacity = 0;
	document.querySelector('.lds-dual-ring').style.zIndex = -1;
  }
}
