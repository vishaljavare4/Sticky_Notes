'use strict';
class Model{
  constructor(){
    this.newNotesMetadataObj={};
  }

  request(requestIdentifier, newNoteMetadata=null, key=null){

    if(requestIdentifier === 'deleteCurrentStickyNote'){
      this.deleteCurrentStickyNote(key);
    }else if(requestIdentifier === 'getAllNotesMetadata'){
      return this.getAllNotesMetadata();
    }else if(requestIdentifier === 'addNewNote'){
      if(newNoteMetadata){
        return this.addNewNote(newNoteMetadata);
      }
    }
  }
  updateDescription(key, description){
    this.newNotesMetadataObj[key].description= description;
  }
  deleteCurrentStickyNote(key){
    console.log('deleting', key);
    delete this.newNotesMetadataObj[key];
    // console.log(this.newNotesMetadataObj);
  }
  addNewNote(newNoteMetadata){
    // this.newNotesMetadataArray.push(newNoteMetadata);
    this.newNotesMetadataObj[newNoteMetadata.title] ={
      title: newNoteMetadata.title,
      backgroundColor: newNoteMetadata.backgroundColor,
      description: newNoteMetadata.description,
      timeStamp: newNoteMetadata.timeStamp
    };
    console.log(this.newNotesMetadataObj);
    return true;
  }

  getAllNotesMetadata(){
    return this.newNotesMetadataObj;
  }
}
