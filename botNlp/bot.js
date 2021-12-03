const { dockStart } = require('@nlpjs/basic');

exports.trainBot = async () => {
    const dock = await dockStart({ use: ['Basic']});
   const nlp = dock.get('nlp');
   nlp.addLanguage('vi');
   nlp.addLanguage('en');
    //Adds the utterances and intents for the NLP
    nlp.addDocument('vi', 'tuần này', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'tuan nay', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'khóa biểu trong tuần', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'khoa bieu trong tuan', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'thời khóa biểu trong tuần', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'thoi khoa bieu trong tuan', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'khóa biểu tuần này', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'khoa bieu tuan nay', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'thời khóa biểu tuần này', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'thoi khoa bieu tuan nay', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'tuần này thời khóa biểu là gì', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'tuan nay thoi khoa bieu la gi', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'thời khóa biểu trong tuần là gì', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'thoi khoa bieu trong tuan la gi', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'tuần này học môn gì', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('vi', 'trong tuần này có môn gì', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('en', 'on this week', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('en', 'schedule on this week', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('en', 'on the week', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('en', 'schedule on the week', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('en', 'on week', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('en', 'schedule on week', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('en', 'week schedule', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('en', 'onthisweek', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('en', 'ontheweek', 'greetings.khoabieuTrongTuan');
    nlp.addDocument('en', 'onweek', 'greetings.khoabieuTrongTuan');
  // Thang
    nlp.addDocument('vi', 'Thời khóa biểu tháng', 'greetings.khoabieuthang');


    nlp.addDocument('vi', 'Thời khóa biểu trong tháng này', 'greetings.khoabieuthangNay');
    nlp.addDocument('vi', 'Thời khóa biểu trong tháng này', 'greetings.khoabieuthangNay');
    nlp.addDocument('vi', 'Thời khóa biểu tháng này', 'greetings.khoabieuthangNay');
    nlp.addDocument('vi', 'Thời khóa biểu tháng hiện tại', 'greetings.khoabieuthangNay');

    nlp.addDocument('vi', 'Thời khóa biểu trong tháng tới', 'greetings.khoabieuthangToi');
    nlp.addDocument('vi', 'Thời khóa biểu tháng tới', 'greetings.khoabieuthangToi');
    nlp.addDocument('vi', 'Thời khóa biểu trong tháng sau', 'greetings.khoabieuthangToi');
    nlp.addDocument('vi', 'Thời khóa biểu tháng sau', 'greetings.khoabieuthangToi');
    nlp.addDocument('vi', 'Thời khóa biểu tháng tiếp theo', 'greetings.khoabieuthangToi');

    nlp.addDocument('vi', 'Thời khóa biểu tháng vừa rồi', 'greetings.khoabieuthangVuaRoi');
    nlp.addDocument('vi', 'Thời khóa biểu tháng vừa qua', 'greetings.khoabieuthangVuaRoi');
    nlp.addDocument('vi', 'Thời khóa biểu tháng trước', 'greetings.khoabieuthangVuaRoi');

    nlp.addDocument('en', 'today', 'greetings.khoaBieuHomNay');
    nlp.addDocument('en', 'today schedule', 'greetings.khoaBieuHomNay');
    nlp.addDocument('en', 'schedule today', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'hôm nay học môn gì', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'hôm nay có môn gì', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'hôm nay', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'hom nay', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'môn hôm nay', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'mon hom nay', 'greetings.khoaBieuHomNay');  
    nlp.addDocument('vi', 'hôm nay môn gì', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'hom nay mon gi', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'hôm nay có môn gì', 'greetings.khoaBieuHomNay');  
    nlp.addDocument('vi', 'hom nay co mon gi', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'hôm nay học môn gì', 'greetings.khoaBieuHomNay');  
    nlp.addDocument('vi', 'hom nay hoc mon gi', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'hôm nay học những môn gì', 'greetings.khoaBieuHomNay');  
    nlp.addDocument('vi', 'hom nay hoc nhung mon gi?', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'thời khóa biểu hôm nay', 'greetings.khoaBieuHomNay');
    nlp.addDocument('vi', 'thoi khoa bieu hom nay?', 'greetings.khoaBieuHomNay');
  
    nlp.addDocument('vi', 'chào bạn', 'greetings.xinchao');
    nlp.addDocument('vi', 'chao ban', 'greetings.xinchao');
    nlp.addDocument('vi', 'chào bạn!', 'greetings.xinchao');
    nlp.addDocument('vi', 'chao ban!', 'greetings.xinchao');
    nlp.addDocument('vi', 'xin chào', 'greetings.xinchao');
    nlp.addDocument('vi', 'xin chao', 'greetings.xinchao');
    nlp.addDocument('vi', 'xin chào!', 'greetings.xinchao');
    nlp.addDocument('vi', 'xin chao!', 'greetings.xinchao');
    nlp.addDocument('vi', 'chào', 'greetings.xinchao');
    nlp.addDocument('vi', 'chao', 'greetings.xinchao');
    nlp.addDocument('vi', 'chào!', 'greetings.xinchao');
    nlp.addDocument('vi', 'chao!', 'greetings.xinchao');
    nlp.addDocument('en', 'hi', 'greetings.xinchao');
    nlp.addDocument('en', 'hi!', 'greetings.xinchao');
    nlp.addDocument('en', 'hi chatbot', 'greetings.xinchao');
    nlp.addDocument('en', 'hi chatbot!', 'greetings.xinchao');
    nlp.addDocument('en', 'hi bot', 'greetings.xinchao');
    nlp.addDocument('en', 'hi bot!', 'greetings.xinchao');
    nlp.addDocument('en', 'hello', 'greetings.xinchao');
    nlp.addDocument('en', 'hello!', 'greetings.xinchao');
    nlp.addDocument('en', 'hello bot', 'greetings.xinchao');
    nlp.addDocument('en', 'hello bot!', 'greetings.xinchao');
    nlp.addDocument('en', 'hello chatbot', 'greetings.xinchao');
    nlp.addDocument('en', 'hello chatbot!', 'greetings.xinchao');
  
  
    nlp.addDocument('vi', 'ngày mai có môn gì', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'ngay mai học môn gì', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'ngày mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'ngay mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'ngày mai thời khóa biểu là gì', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'ngay mai thoi khoa bieu la gi', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'thời khóa biểu ngày mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'thoi khoa bieu ngay mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'thời khóa biểu mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'thoi khoa bieu mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'ngày mai học môn gì', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'ngay mai hoc mon gi', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'mai học môn gì', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'mai hoc mon gi', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'ngày mai có môn gì', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'ngay mai co mon gi', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'mai có môn gì', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'mai co mon gi', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'môn gì vào ngày mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'mon gi vao ngay mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'học môn gì vào ngày mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('vi', 'hoc mon gi vao ngay mai', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('en', 'tomorrow', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('en', 'tomorrow schedule', 'greetings.khoaBieuNgayMai');
    nlp.addDocument('en', 'schedule tomorrow', 'greetings.khoaBieuNgayMai');
   
    nlp.addDocument('en', 'schedule next week', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('en', 'next week', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('en', 'next week schedule', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('en', 'the next week', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('en', 'the next week schedule', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'tuần sau', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'tuan sau', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'tuần tới', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'tuan toi', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'thời khóa biểu tuần sau là gì', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'thoi khoa bieu tuan sau la gi', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'thời khóa biểu tuần tới là gì', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'thoi khoa bieu tuan toi la gi', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'tuần sau học môn gì', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'tuần tới học môn gì', 'greetings.khoaBieuTuanSau');
    nlp.addDocument('vi', 'tuần tới có môn gì', 'greetings.khoaBieuTuanSau');

    nlp.addDocument('en', 'schedule last week', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('en', 'last week', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('en', 'last week schedule', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('en', 'the last week', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('en', 'the last week schedule', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('vi', 'tuần vừa rồi', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('vi', 'tuan vua roi', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('vi', 'tuần trước', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('vi', 'tuan truoc', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('vi', 'thời khóa biểu tuần trước là gì', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('vi', 'thoi khoa bieu tuan truoc la gi', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('vi', 'thời khóa biểu tuần trước', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('vi', 'thoi khoa bieu tuan truoc', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('vi', 'tuần vừa rồi học môn gì', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('vi', 'tuần trước học môn gì', 'greetings.khoaBieuTuanTruoc');
    nlp.addDocument('vi', 'tuần trước có môn gì', 'greetings.khoaBieuTuanTruoc');

    nlp.addDocument('en', 'yesterday', 'greetings.khoaBieuHomQua');
    nlp.addDocument('en', 'yesterday schedule', 'greetings.khoaBieuHomQua');
    nlp.addDocument('en', 'schedule yesterday', 'greetings.khoaBieuHomQua');
    nlp.addDocument('vi', 'hôm qua', 'greetings.khoaBieuHomQua');
    nlp.addDocument('vi', 'hom qua', 'greetings.khoaBieuHomQua');
    nlp.addDocument('vi', 'thời khóa biểu hôm qua', 'greetings.khoaBieuHomQua');
    nlp.addDocument('vi', 'thoi khoa bieu hom qua', 'greetings.khoaBieuHomQua');
    nlp.addDocument('vi', 'hôm qua có môn gì', 'greetings.khoaBieuHomQua');
    nlp.addDocument('vi', 'hôm qua học môn gì', 'greetings.khoaBieuHomQua');

    nlp.addDocument('en', 'the next day', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('en', 'the next day schedule', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('en', 'schedule the next day', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'mốt', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'mot', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'ngày mốt', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'ngay mot', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'ngày kia', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'ngày kia học môn gì', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'ngày kia có môn gì', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'ngày mốt học môn gì', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'ngày mốt có môn gì', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'mốt học môn gì', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'thời khóa biểu ngày mốt', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'thoi khoa bieu ngay mot', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'mốt thời khóa biểu là gì', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'mot thoi khoa bieu la gi', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'mốt thời khóa biểu không', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'ngày kia thời khóa biểu là gì', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'tới', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'toi', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'ngày tới', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'ngay toi', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'ngày tới thời khóa biểu là gì', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'ngay toi thoi khoa bieu la gi', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'thời khóa biểu ngày tới', 'greetings.khoaBieuNgayMot');
    nlp.addDocument('vi', 'thoi khoa bieu ngay toi', 'greetings.khoaBieuNgayMot');
  
    nlp.addDocument('en', 'schedule the last yesterday', 'greetings.khoaBieuNgayHomKia');
    nlp.addDocument('en', 'the last yesterday', 'greetings.khoaBieuNgayHomKia');
    nlp.addDocument('en', 'the last yesterday schedule', 'greetings.khoaBieuNgayHomKia');
    nlp.addDocument('vi', 'hôm kia', 'greetings.khoaBieuNgayHomKia');
    nlp.addDocument('vi', 'hom kia', 'greetings.khoaBieuNgayHomKia');
    nlp.addDocument('vi', 'thời khóa biểu ngày hôm kia', 'greetings.khoaBieuNgayHomKia');
    nlp.addDocument('vi', 'thoi khoa bieu ngay hom kia', 'greetings.khoaBieuNgayHomKia');
    nlp.addDocument('vi', 'thời khóa biểu hôm kia', 'greetings.khoaBieuNgayHomKia');
    nlp.addDocument('vi', 'thoi khoa bieu hom kia', 'greetings.khoaBieuNgayHomKia');
    nlp.addDocument('vi', 'thời khóa biểu hôm kia là gì', 'greetings.khoaBieuNgayHomKia');
    nlp.addDocument('vi', 'thoi khoa bieu hom kia la gi', 'greetings.khoaBieuNgayHomKia');
    nlp.addDocument('vi', 'ngày hôm kia học môn gì', 'greetings.khoaBieuNgayHomKia');
    nlp.addDocument('vi', 'ngày hôm kia có môn gì', 'greetings.khoaBieuNgayHomKia');
    
    nlp.addDocument('vi', 'mssv thời khóa biểu thứ tuần sau', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'mã số sinh viên thời khóa biểu thứ tuần sau', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'thời khóa biểu thứ tuần sau', 'greetings.khoabieuThuTuanSau');
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
    nlp.addDocument('vi', 'thứ đầu tuần sau học môn gì', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'khóa biểu đầu tuần tới', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'thứ tuần sau học môn gì', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'thứ tuần tới học môn gì', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'thứ tuần sau có môn gì', 'greetings.khoabieuThuTuanSau');
    nlp.addDocument('vi', 'thứ tuần tới có môn gì', 'greetings.khoabieuThuTuanSau');

    nlp.addDocument('vi', 'thời khóa biểu thứ sáu tuần này', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'mssv thời khóa biểu thứ', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'mã số sinh viên thời khóa biểu thứ', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thời khóa biểu thứ tuần này', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thời khóa biểu thứ trong tuần', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thời khóa biểu chủ nhật trong tuần', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thời khóa biểu chủ nhật tuần này', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'chủ nhật tuần này', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'đầu tuần này', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thứ đầu tuần này', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'khóa biểu đầu tuần này', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thứ tuần này học môn gì', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thứ trong tuần học môn gì', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thứ tuần này có môn gì', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thứ sáu tuần này có môn gì', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thứ trong tuần có môn gì', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thứ sáu trong tuần có môn gì', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'tkb thứ sáu', 'greetings.khoabieuThuTrongTuan');
    nlp.addDocument('vi', 'thời khóa biểu thứ sáu', 'greetings.khoabieuThuTrongTuan');

    nlp.addDocument('vi', 'mssv thời khóa biểu thứ tuần vừa rồi', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'mã số sinh viên thời khóa biểu thứ tuần vừa rồi', 'greetings.khoabieuThuTuanTruoc');
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
    nlp.addDocument('vi', 'thứ đầu tuần sau học môn gì', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'thứ tuần trước học môn gì', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'thứ tuần trước có môn gì', 'greetings.khoabieuThuTuanTruoc');
    nlp.addDocument('vi', 'thứ tuần trước có môn gì', 'greetings.khoabieuThuTuanTruoc');


    nlp.addDocument('vi', 'mã số sinh viên của tôi', 'greetings.MaSoSinhVien');
    nlp.addDocument('vi', 'mssv của tôi', 'greetings.MaSoSinhVien');
    nlp.addDocument('vi', 'xem mã số sinh viên', 'greetings.MaSoSinhVien');
    nlp.addDocument('vi', 'xem mssv', 'greetings.MaSoSinhVien');

    nlp.addDocument('vi', 'trợ giúp', 'greetings.hoTro');
    nlp.addDocument('vi', 'tro giup', 'greetings.hoTro');
    nlp.addDocument('vi', 'ho tro', 'greetings.hoTro');
    nlp.addDocument('vi', 'hỗ trợ', 'greetings.hoTro');
    // Train also the NLG
    nlp.addAnswer('vi', 'greetings.khoabieuTrongTuan', 'trong tuần');  
    nlp.addAnswer('vi', 'greetings.khoaBieuHomNay', 'hôm nay');  
    nlp.addAnswer('vi', 'greetings.xinchao', 'xin chao');  
    nlp.addAnswer('vi', 'greetings.khoaBieuNgayMai', 'ngày mai');  
    nlp.addAnswer('vi', 'greetings.khoaBieuTuanSau', 'tuần tới');  
    nlp.addAnswer('vi', 'greetings.khoaBieuTuanTruoc', 'tuần trước'); 
    nlp.addAnswer('vi', 'greetings.khoaBieuHomQua', 'hôm qua');  
    nlp.addAnswer('vi', 'greetings.khoaBieuNgayMot', 'ngày mốt');  
    nlp.addAnswer('vi', 'greetings.khoaBieuNgayHomKia', 'hôm kia'); 
    nlp.addAnswer('vi', 'greetings.khoabieuThuTrongTuan', 'thứ trong tuần'); 
    nlp.addAnswer('vi', 'greetings.khoabieuThuTuanSau', 'thứ tuần sau');
    nlp.addAnswer('vi', 'greetings.khoabieuThuTuanTruoc', 'thứ tuần trước');

    nlp.addAnswer('vi', 'greetings.khoabieuthang', 'thời khóa biểu tháng');
    nlp.addAnswer('vi', 'greetings.khoabieuthangNay', 'thời khóa biểu tháng này');
    nlp.addAnswer('vi', 'greetings.khoabieuthangToi', 'thời khóa biểu tháng tới');
    nlp.addAnswer('vi', 'greetings.khoabieuthangVuaRoi', 'thời khóa biểu tháng trước');
    
    nlp.addAnswer('vi', 'greetings.MaSoSinhVien', 'MSSV');
    nlp.addAnswer('vi', 'greetings.hoTro', 'hỗ trợ');



    await nlp.train();
    return nlp;
  };

 