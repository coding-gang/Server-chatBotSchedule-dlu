
var canSplit = function(str, token){
    return (str || '').split(token).length > 1;         
  }

exports.getTeach =(text,kqFromDB) =>{
    let indexSearch;
    const firstItem =  kqFromDB.splice(0,1)[0];
   const result =[];
    let subject ='';
    const textSubject = text.toLowerCase().trim();
    const strSplit =  textSubject.split(' ');
     indexSearch = strSplit.indexOf('thầy');
     if(indexSearch ==-1)
     indexSearch = strSplit.indexOf('cô');
      if(indexSearch ==-1)
     indexSearch = strSplit.indexOf('viên');
      
    if(indexSearch !== -1){  //thời khóa biểu tuàn sau của gv thiết kế mẫu
    const strSlice = strSplit.slice(indexSearch);
       [strSubject,...rest] = [...strSlice];
       subject = rest.join(' ');
       [strEmpty,...scheRest] = [...kqFromDB];  

    scheRest.forEach((el) =>{
       Object.keys(el).forEach((prop,index) => {
         const isCan = canSplit(el[prop],'-')
          if(isCan){
               if(el[prop].split('-')[8].toLowerCase().search(subject) !==-1){

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