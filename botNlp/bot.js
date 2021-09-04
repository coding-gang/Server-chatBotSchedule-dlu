const { dockStart } = require('@nlpjs/basic');

exports.trainBot = async () => {
    const dock = await dockStart({ use: ['Basic']});
   const nlp = dock.get('nlp');
   nlp.addLanguage('vi');
    //Adds the utterances and intents for the NLP
    nlp.addDocument('vi', 'xin chào', 'greetings.xinchao');
    nlp.addDocument('vi', 'tuần này', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'trong tuần', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'tuần sau', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'tuần tới', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'tuần vừa rồi', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('vi', 'tuần trước', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('vi', 'khóa biểu trong tuần', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'khóa biểu tuần này', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'hôm nay môn gì', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'thời khóa biểu hôm nay', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'thời khóa biểu ngày mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'ngày mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'ngày mai thời khóa biểu là gì', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'thời khóa biểu tuần sau là gì', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'thời khóa biểu tuần tới là gì', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'thời khóa biểu tuần trước là gì', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('vi', 'hôm qua', 'greetings.khoaBieuHomQua');
    nlp.addDocument('vi', 'thời khóa biểu hôm qua', 'greetings.khoaBieuHomQua');
    nlp.addDocument('vi', 'mốt', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'ngày kia', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'thời khóa biểu ngày mốt', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'mốt thời khóa biểu là gì', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'mốt thời khóa biểu không', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'ngày kia thời khóa biểu là gì', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'tới', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'hôm kia', 'greetings.khoaBieuNgayHomKia');
    nlp.addDocument('vi', 'thời khóa biểu hôm kia', 'greetings.khoaBieuNgayHomKia');
    // Train also the NLG
    nlp.addAnswer('vi', 'greetings.khoabieuTrongTuan', 'trong tuần');  
    nlp.addAnswer('vi', 'greetings.khoaBieuHomNay', 'hôm nay');  
    nlp.addAnswer('vi', 'greetings.xinchao', 'bạn khỏe không!');  
    nlp.addAnswer('vi', 'greetings.khoaBieuNgayMai', 'ngày mai');  
    nlp.addAnswer('vi', 'greetings.khoaBieuTuanSau', 'tuần tới');  
    nlp.addAnswer('vi', 'greetings.khoaBieuTuanTruoc', 'tuần trước'); 
    nlp.addAnswer('vi', 'greetings.khoaBieuHomQua', 'hôm qua');  
    nlp.addAnswer('vi', 'greetings.khoaBieuNgayMot', 'ngày mốt');  
    nlp.addAnswer('vi', 'greetings.khoaBieuNgayHomKia', 'hôm kia'); 
    await nlp.train();
    return nlp;
  };

 