'use strict';
class Controller{ 
  constructor(view, model){
    this.view = view;
    this.model = model;
  }
  
  request(event, action=null, newNoteMetadata=null){
    // console.log(event);
    if(event){
      if(event.target.nodeName === 'LI'){
        this.view.request(event, 'moveStickyNote');
      }else if(event.target.nodeName === 'I' && event.target.classList.contains('fa-pencil')){
        // console.log('pencil pencil');
        this.view.request(event, 'editTextContentOfStickyNote');   
        let titleKey = event.target.parentNode.parentNode.childNodes[0].innerText;                              
        let description = event.target.parentNode.parentNode.childNodes[1].value;              
        // console.log(event.target.parentNode.parentNode.childNodes);
        this.model.updateDescription(titleKey, description);
      }else if(event.target.nodeName === 'I' && event.target.classList.contains('fa-circle-xmark')){
        this.view.request(event, 'deleteCurrentStickyNote');  
        let titleKey = event.target.parentNode.parentNode.childNodes[0].innerText;   
        this.model.request('deleteCurrentStickyNote', null, titleKey);  

         
      }
    }

    // is action provided
      if(action){
        if(action === 'updateTextAreaColor'){
          this.view.request(event, 'updateTextAreaColor'); 
        }else if(action === 'addNewNote'){
          if(this.model.request('addNewNote', newNoteMetadata)){
            // refresh view with all the nodes
            this.view.request(null, 'reDrawAllTheStickyNotes', this.model.request('getAllNotesMetadata'))
          }
        }
      }
  }

}
