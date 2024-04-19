'use strict';
class View{
  constructor(){
    this.ul = document.querySelector('#list');
    this.ulFirstChild = this.generateVeryFirstLiHavingForm();
    this.ul.appendChild(this.ulFirstChild);
    
  }

  request(event=null, operation, newNotesMetadataObj=null){
    if(operation){
      if(operation === 'moveStickyNote'){
        this.moveNote(event);
      }else if(operation === 'editTextContentOfStickyNote'){
        this.allowEdit(event);
      }else if(operation === 'deleteCurrentStickyNote'){
        this.deleteCurrentStickyNote(event);
      }else if(operation === 'updateTextAreaColor'){
        this.updateTextAreaColor(event);
      }else if(operation === 'reDrawAllTheStickyNotes'){
        this.reDrawAllTheStickyNotes(newNotesMetadataObj);
      }
    }
  }
  generateVeryFirstLiHavingForm(){
    // very first child will always be a form
      //   <form id="containerTakeANewNote" action="#">
        //   <div class="wrapperInputTitleAndColorPicker">
        //     <input type="text" placeholder="Title" required id="newNoteTitle">
        //     <input type="color" value="#90ee90" id="newNoteColorSelectedByUser">
        //   </div>
        //   <textarea spellcheck="false" placeholder="Take a note..." required id="newNoteDescription"></textarea>
        //   <button id="addNewNote">Add Note</button>
      // </form>    
    let li = document.createElement('li');
    let form = document.createElement('form');
      form.setAttribute('id', 'containerTakeANewNote');    
      form.setAttribute('action', '#');          
      li.appendChild(form);
        let div = document.createElement('div');
        div.setAttribute('class', 'wrapperInputTitleAndColorPicker');   
          let inputTitle = document.createElement('input');
            inputTitle.setAttribute('type', 'text');
            inputTitle.setAttribute('placeholder', 'Title');
            inputTitle.setAttribute('required', '');
            inputTitle.setAttribute('id', 'newNoteTitle');
            div.appendChild(inputTitle);
          let inputColor = document.createElement('input');
            inputColor.setAttribute('type', 'color');
            inputColor.setAttribute('value', '#90ee90');
            inputColor.setAttribute('id', 'newNoteColorSelectedByUser');
            div.appendChild(inputColor);
            form.appendChild(div);
          let textArea = document.createElement('textarea');
            textArea.setAttribute('spellcheck', false);
            textArea.setAttribute('placeholder', 'Take a note...');
            textArea.setAttribute('required', '');
            textArea.setAttribute('id', 'newNoteDescription');
            form.appendChild(textArea);
          let btn = document.createElement('button');
            btn.setAttribute('id', 'addNewNote');
            btn.innerText='Add Note';
            form.appendChild(btn);

        // Attaching event listeners
          setTimeout(
            ()=>{
              // console.log('done');
              form.addEventListener('submit', (event)=>event.preventDefault());
              this.ul.addEventListener('dragend', (event)=>{controller.request(event)});          
              inputColor.addEventListener('input', (event)=>controller.request(event, 'updateTextAreaColor'));
              btn.addEventListener('click', (event)=>{
                let newNoteMetadata ={
                    title: inputTitle.value,
                    backgroundColor: inputColor.value,
                    description: textArea.value,
                    timeStamp: computeTodayDate()                  
                };
                // console.log(newNoteMetadata)
                if(inputTitle.value.length>0 && textArea.value.length){
                  controller.request(null, 'addNewNote', newNoteMetadata);
                  setTimeout(
                    ()=>{
                      textArea.value="";
                      inputTitle.value="";
                      inputColor.value="#90ee90";
                      textArea.backgroundColor="#90ee90";
                    },0
                  );
                }
              });
            },0
          );


    return li;
  }

  reDrawAllTheStickyNotes(newNotesMetadataObj){
    // console.log('obj is', newNotesMetadataObj);
    this.ul.innerHTML=null;
    this.ul.appendChild(this.ulFirstChild);
    // this.ul.appendChild(this.generateVeryFirstLiHavingForm());
   
    for(let key in newNotesMetadataObj){
      let newNoteMetadata = newNotesMetadataObj[key];
      // console.log(newNoteMetadata, '::data');
    //   <li draggable="true">
    //   <h2>Financial Freedom Plan</h2>
    //   <textarea spellcheck="false" readonly>Generate ₹1 Lakh/month passive income from Stock Market and Real Estate.</textarea>
    //   <div class="wrapperActionButtons">
    //     <i class="fa-duotone fa-circle-xmark"></i>
    //     <i class="fa-solid fa-arrows-up-down-left-right"></i>        
    //     <i class="fa-duotone fa-pencil"></i>
    //   </div>
    // </li>

      let li = document.createElement('li');
      li.setAttribute('draggable', true);
        let h2 = document.createElement('h2');
          h2.textContent = newNoteMetadata.title;          
          li.appendChild(h2);
        let textArea = document.createElement('textarea');
          textArea.setAttribute('spellcheck', false);
          textArea.setAttribute('readonly','');
          textArea.style.backgroundColor = newNoteMetadata.backgroundColor;
          textArea.value = newNoteMetadata.description;
          li.appendChild(textArea);
        let paragraph = document.createElement('p');
          paragraph.innerText = newNoteMetadata.timeStamp;
          paragraph.setAttribute('class', 'timeStamp');
          li.appendChild(paragraph);

        let div = document.createElement('div');
          div.setAttribute('class', 'wrapperActionButtons');        
          div.style.top=`${h2.height}px`;
            let xMark = document.createElement('i');
              xMark.setAttribute('class', 'fa-duotone fa-circle-xmark');
              div.appendChild(xMark);
            let move = document.createElement('i');
              move.setAttribute('class', 'fa-solid fa-arrows-up-down-left-right');
              div.appendChild(move);
            let editPencil = document.createElement('i');
              editPencil.setAttribute('class', 'fa-duotone fa-pencil');
              div.appendChild(editPencil);
            li.appendChild(div);
        this.ul.appendChild(li);
      // console.log(li);

      // Reposition x, move and pencil
      setTimeout(()=>{
        div.style.top=`${h2.offsetHeight}px`;
        // Attaching events
          editPencil.addEventListener('click', (event)=>controller.request(event));
          xMark.addEventListener('click', (event)=>controller.request(event));
      },0);
      

    }
  }

  updateTextAreaColor(event){
    // event.target.parentNode.parentNode.childNodes[3].style.backgroundColor = event.target.value;

    // console.log(event.target.parentNode.parentNode.childNodes);
    let newStyle = `background-color:${event.target.value};`;
  
    event.target.parentNode.parentNode.childNodes[1].setAttribute('style', newStyle);
  }

  moveNote(event){
    let li = event.target;
    // console.log(event);
    // console.log(event.clientX - li.clientWidth)
    // console.log(event.target.parentNode)
    let newTop = event.clientY;
    // console.log(newTop, newTop+li.clientHeight);
    if(newTop < 0){
  
      newTop =10;
    }else if(newTop+li.clientHeight >= document.documentElement.scrollHeight){
      // console.log('ooo');
      newTop=document.documentElement.scrollHeight - li.clientHeight-10;
      // newTop=20;
    }
  
    let newLeft = event.clientX - li.clientWidth;
    // console.log(newLeft, document.documentElement.scrollWidth);
    if(newLeft < 0){
      newLeft =10;
    }else if(newLeft+li.clientWidth >= document.documentElement.scrollWidth){
      // console.log('ooo')
      newLeft=document.documentElement.scrollWidth-li.clientWidth-20;
    }        
    
    li.style.position = 'absolute';
    li.style.left = `${newLeft}px`;
    li.style.top = `${newTop}px`;
  }

  allowEdit(event){
    // console.log('pencil clicked', event.target);
    let pencil = event.target;
    // console.log(event.target.parentNode.parentNode.childNodes);
    let textArea = event.target.parentNode.parentNode.childNodes[1];
    if(textArea.hasAttribute('readonly')){
      textArea.removeAttribute('readonly');
      textArea.classList.add('editing');
      pencil.classList.add('markPencilActive');
    }else{
      textArea.setAttribute('readonly', '');    
      textArea.classList.remove('editing');
      pencil.classList.remove('markPencilActive');
    }
  }

  deleteCurrentStickyNote(event){    
    event.target.parentNode.parentNode.remove();
  }
}
