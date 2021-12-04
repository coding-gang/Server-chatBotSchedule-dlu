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
  
  
  exports.getSubject =(text,kqFromDB) =>{
    const firstItem =  kqFromDB.splice(0,1)[0];
   const result =[];
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
    // const filterSubjectNotEmpty = scheRest.map(item =>{
    //      const newItem = removeEmptyStrings(item);
    //         return newItem
    //   })
    scheRest.forEach((el) =>{
       
       Object.keys(el).forEach((prop,index) => {
         const isCan = canSplit(el[prop],'-')
          if(isCan){
               if(el[prop].split('-')[1].toLowerCase().search(subject) !==-1){
                result.push(el)
               }else{
                el[prop] =""
               }
          }
        } );
        
      })
      result.unshift(firstItem)
      return result;
  }
 
  }

  exports.getSubjectByMonth =(text,schedules)=>{
  const result =  schedules.map((item)=>{
          return  this.getSubject(text,item);
    })
      return result      
  }


