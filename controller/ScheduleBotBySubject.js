const removeEmptyStrings = (obj) => {
    let newObj = {};
    Object.keys(obj).forEach((prop) => {
    
      if (obj[prop] !== '') { newObj[prop] = obj[prop]; }
    });
    return newObj;
  };
  
  var canSplit = function(str, token){
    return (str || '').split(token).length > 1;         
  }
  
  
  exports.getSubject =async (text,kqFromDB) =>{
    const result =[]
    let subject ='';
    const textSubject = text.toLowerCase().trim();
    const strSplit =  textSubject.split(' ');
    const indexSearch = strSplit.indexOf('môn');
    if(indexSearch !== -1){  //thời khóa biểu tuàn sau môn thiết kế mẫu
         // [thiết, kế, mẫu]
         
    const strSlice = strSplit.slice(indexSearch);
       [strSubject,...rest] = [...strSlice];
       subject = rest.join(' ');
        [strEmpty,...scheRest] = [...kqFromDB];
         
    const filterSubjectNotEmpty = scheRest.map(item =>{
         const newItem = removeEmptyStrings(item);
            return newItem
      })
  
     
      filterSubjectNotEmpty.forEach((el) =>{
       Object.keys(el).forEach((prop,index) => {
         const isCan = canSplit(el[prop],'-')
          if(isCan){
               if(el[prop].split('-')[1].search(subject) !==-1){
                result.push(el)
               }else{
                delete el[prop]
               }
          }
        } );
      })

  }
  return result;
  }



