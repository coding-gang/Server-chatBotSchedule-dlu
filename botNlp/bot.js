const { dockStart } = require('@nlpjs/basic');

exports.trainBot = async () => {
    const dock = await dockStart({ use: ['Basic']});
   const nlp = dock.get('nlp');
   await nlp.addCorpus('./corpus-vi.json'); 
    nlp.addLanguage('vi');
    // Adds the utterances and intents for the NLP
    nlp.addDocument('vi', 'xin chào', 'greetings.xinchao');
    nlp.addDocument('vi', 'tuần này', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'khóa biểu trong tuần', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'khóa biểu tuần này', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'hôm nay môn gì', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'thời khóa biểu hôm nay', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'thời khóa biểu ngày mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'ngày mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'ngày mai thời khóa biểu là gì', 'greetings.khoaBieuNgayMai');
    // Train also the NLG
    nlp.addAnswer('vi', 'greetings.khoabieuTrongTuan', 'trong tuần');  
    nlp.addAnswer('vi', 'greetings.khoaBieuHomNay', 'hôm nay!');  
    nlp.addAnswer('vi', 'greetings.xinchao', 'bạn khỏe không!');  
    nlp.addAnswer('vi', 'greetings.khoaBieuNgayMai', 'ngày mai!');  
    await nlp.train();
    return nlp;
  };

