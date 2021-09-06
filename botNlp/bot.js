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
    nlp.addDocument('vi', 'thời khóa biểu thứ', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thời khóa biểu thứ tuần này', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thời khóa biểu thứ trong tuần', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thời khóa biểu chủ nhật trong tuần', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thời khóa biểu chủ nhật tuần này', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'chủ nhật tuần này', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'đầu tuần này', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'khóa biểu đầu tuần này', 'greetings.khoabieuThuTrongTuan');

   

    nlp.addDocument('vi', 'thời khóa biểu thứ tuần sau', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'thời khóa biểu thứ sau', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'thời khóa biểu thứ trong tuần sau', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'thời khóa biểu chủ nhật trong tuần sau', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'thời khóa biểu chủ nhật tuần sau', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'chủ nhật tuần sau', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'đầu tuần sau', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'khóa biểu đầu tuần sau', 'greetings.khoabieuThuTuanSau');

    nlp.addDocument('vi', 'thời khóa biểu thứ tuần tới', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'thời khóa biểu thứ tới', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'thời khóa biểu thứ trong tuần tới', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'thời khóa biểu chủ nhật trong tuần tới', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'thời khóa biểu chủ nhật tuần tới', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'chủ nhật tuần tới', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'đầu tuần tới', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'khóa biểu đầu tuần tới', 'greetings.khoabieuThuTuanSau');

    
    nlp.addDocument('vi', 'thời khóa biểu thứ tuần vừa rồi', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'thời khóa biểu thứ vừa rồi', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'thời khóa biểu thứ trong tuần vừa rồi', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'thời khóa biểu chủ nhật trong tuần vừa rồi', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'thời khóa biểu chủ nhật tuần vừa rồi', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'chủ nhật tuần vừa rồi', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'đầu tuần vừa rồi', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'khóa biểu đầu tuần vừa rồi', 'greetings.khoabieuThuTuanTruoc');

    nlp.addDocument('vi', 'thời khóa biểu thứ tuần trước', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'thời khóa biểu thứ trước', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'thời khóa biểu thứ trong tuần trước', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'thời khóa biểu chủ nhật trong tuần trước', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'chủ nhật tuần trước', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'đầu tuần trước', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'khóa biểu đầu tuần trước', 'greetings.khoabieuThuTuanTruoc');

    nlp.addDocument('vi', 'thời khóa biểu sáng nay', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'thời khóa biểu chiều nay', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'thời khóa biểu tối nay', 'greetings.khoaBieuHomNay');

    nlp.addDocument('vi', 'thời khóa biểu sáng mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'thời khóa biểu chiều mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'thời khóa biểu tối mai', 'greetings.khoaBieuNgayMai');

    nlp.addDocument('vi', 'thời khóa biểu sáng mốt', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'thời khóa biểu chiều mốt', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'thời khóa biểu tối mốt', 'greetings.khoaBieuNgayMot');

    nlp.addDocument('vi', 'thời khóa biểu sáng hôm kia', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'thời khóa biểu chiều hôm kia', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'thời khóa biểu tối hôm kia', 'greetings.khoaBieuNgayMot');


    nlp.addDocument('vi', 'thời khóa biểu sáng hôm qua', 'greetings.khoaBieuHomQua');
    nlp.addDocument('vi', 'thời khóa biểu chiều hôm qua', 'greetings.khoaBieuHomQua');
    nlp.addDocument('vi', 'thời khóa biểu tối hôm qua', 'greetings.khoaBieuHomQua');
    
    

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
    nlp.addAnswer('vi', 'greetings.khoabieuThuTrongTuan', 'thứ trong tuần'); 
    nlp.addAnswer('vi', 'greetings.khoabieuThuTuanSau', 'thứ tuần sau');
    nlp.addAnswer('vi', 'greetings.khoabieuThuTuanTruoc', 'thứ tuần trước');
    await nlp.train();
    return nlp;
  };

 