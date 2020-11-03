//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//그래프의 모양과 관련한 것들을 조정합니다//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

config.color = { //원래는 이름으로 하려 했지만 한글을 인식을 하지 않아 부가적으로 붙어있는 아이로 해줘야 합니다.(a,b,c,로 나타내진 것들)
    
};

config.use_img_as_barinfo = false; //바 안에 띄우는 것이 이미지일지(true), 아니면 텍스트일지(false) 결정
config.original_barinfo_text = true; //바 안에 띄우는 텍스트를 그냥 이름으로 할지(true), 아니면 아래 커스텀 텍스트로 할지(false) 결정
config.bar_info_text_y = 5; //바 안에 텍스트가 띄워질 때 그 텍스트의 y축 위치(숫자가 클수록 아래로 내려감)
config.bar_info_text_color = "#FFFFFF"
config.text_barinfo = { //바 안에 띄우는 커스텀 텍스트 (5개 모두 지정해야 함)
    a: "텍스트 a",
    b: "가나다라",
    c: "Hi",
    d: "lalala",
    e: "가나라"
};
config.img_barinfo_height = 120; //바 안에 띄우는 이미지의 크기
config.img_barinfo_width = 150;
config.img_barinfo_adjust_x = -40; // 바 안에 띄우는 이미지 위치 조정 숫자가 커질수록 오른쪽
config.img_barinfo_adjust_y = -5;  // 숫자가 커질수록 아래쪽
config.imgs_barinfo = { //바 안에 띄우는 이미지 (5개 모두 지정해야 함)
    a: "img/SK internet.jpg", //두개 이상이 될 경우 마지막거 빼고 위의것들은 끝에 , 붙여주기
    b: "img/lg u+ internet.jpg",
	c: "img/kt internet.jpg",
    d: "img/종합유선 internet.jpg",
    e: "img/프노 프로필.jpg"
};

config.showLabel = true; //바 왼쪽의 글 표시 여부
config.use_img = false; //바 왼쪽에 이미지를 넣을지(true) 텍스트를 넣을지(false) 결정
config.img_width = 151; //이미지의 크기로, 모든 이미지가 다음 사이즈로 불러와짐.
config.img_height = 38;
config.img_x = -170; //크기를 조절할 경우 x좌표도 같이 조정해주세요 (가로폭이 늘어날 경우 이미지가 바를 가리기도 함)
config.img_y = 0;
config.imgs = { //이와 같은 이유로 a, b, c등으로 해야 함.
    //    a: "img/983034448f81f45f05956d0455a86fe0639d6a36.jpg", //.jpg 과 같은 파일 형식 반드시 붙여주세요  바 왼쪽 이미지 지정
    //    b: "img/프노 프로필.jpg"

    a: "img/SK internet.jpg", //두개 이상이 될 경우 마지막거 빼고 위의것들은 끝에 , 붙여주기
    b: "img/lg u+ internet.jpg",
    c: "img/kt internet.jpg",
    d: "img/종합유선 internet.jpg",
    e: "img/프노 프로필.jpg"
};


config.max_number = 20; //화면에 나오는 바의 최대 개수를 표시
config.bar_info_font_size = 28; //바 안의 글자 크기
config.reverse = false; //true일 경우 짧은 막대부터 위에 표시됨

config.bar_height = 26; //바의 높이

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 그래프와 직관된 요소들이 아니라 부가적인 데이터를 띄워주는 부분을 조정합니다//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

config.background_color = "#FFFFFF"; //전체 배경색              //배경색이 검정색일 경우 안보이는 글자들있음
config.background_img = "img/background.jpg"; //배경 이미지 (1900, 1020 이미지 적극 권장(아닐 경우 이미지 배치가 이상해집니다(자동 확대 및 축소 불가)))

config.use_img_ano = false; //빈공간에 띄우는 이미지 사용 여부
config.img_ano = "img/프노 프로필.jpg" //띄울 이미지 선택 (.jpg 과 같은 파일 형식 반드시 붙여주세요)
config.img_ano_width = 300; //띄울 이미지의 크기(실제 이미지 파일의 크기와 같아야 위치 선정이 올바르게 됩니다)
config.img_ano_height = 300;
config.img_ano_x = 1200; //띄울 이미지의 위치
config.img_ano_y = 300;

config.use_text_ano = false; //빈공간에 띄우는 부가 텍스트 사용 여부
config.text_ano = "Made by Yeonhyuk Kim"; //빈공간에 띄우는 부가 텍스트
config.text_ano_fontsize = 30; //텍스트 글자크기
config.text_ano_x = 1270; //텍스트의 위치
config.text_ano_y = 800;

config.showTitle = true; //상단에 타이틀 표시 여부
config.graphTitle = "YH's Graph Visualization"; //왼쪽 위 그래프 이름, ""으로 할 경우 아무것도 안나옴
config.graphTitle_fontsize = 40; //상단 타이틀 글자크기
config.graphTitle_color = "#5C5C5C"; //상단 타이틀 글자 색

config.dateLabel_switch = true; //날짜 표시 여부
config.dateLabel_fontsize = 75; //날짜 폰트 크기
config.dateLabel_color = "#5C5C5C"; //날짜 글자 색
config.dateLabel_x = 1500;      //날짜의 x좌표 위치
config.dateLabel_y = 750;       //날짜의 y좌표 위치



config.rateLabel_switch = true; //랭킹을 사용하여 보일 것인지
config.rateLabel_fix = true; //true일 경우 그냥 개행식으로 표현
config.rateLabel_use_custom = false; //true일 경우 이름에 커스텀 텍스트가 들어감
config.rateLabel_x = 1150; //1등의 좌표(나머지의 기준이 됨) (반드시 필요)
config.rateLabel_y = 300;  //1등의 좌표 (반드시 필요)
// config.rateLabel2_x = 1200; //2등의 좌표로, 맘대로 조정할 때 사용됨(fix가 false일때만 적용)
// config.rateLabel2_y = 450 + 47; //(fix가 false일때만 적용)
// config.rateLabel3_x = 1200; //(fix가 false일때만 적용)
// config.rateLabel3_y = 450 + 47 + 47; //(fix가 false일때만 적용)
config.rateLabel_color = "#5C5C5C"; //랭킹에 텍스트가 올라갈 경우 그 텍스트의 색(이미지가 들어갔을 때 1,2,3에도 적용)
config.rateLabel_fontsize = 30; //랭킹에 텍스트가 올라갈 경우 그 텍스트의 크기
config.max_ranking_num = 3; //랭킹에 올릴 것들의 개수 (fix 가 true일 경우에만 적용)
config.rateLabel_custom_text = {
    a: "텍스트 a",
    b: "가나다라",
    c: "Hi",
    d: "lalala",
    e: "가나라"
};

config.use_img_as_rate = false; //랭킹에 이미지를 사용하는가
config.rate_img_width = 151; //랭킹에 사용되는 이미지의 크기
config.rate_img_height = 38; //랭킹에 사용되는 이미지의 크기
config.img_margin = 75; //fix상태일 때 랭킹에 사용되는 이미지의 위아래 간격
config.img_margin_with_text = 25; //랭킹에 사용되는 이미지와 왼쪽 텍스트 간 간격
config.rate_img_text_fontsize = 25; //랭킹에 사용되는 텍스트(1,2,3)의 글자 크기

config.showTop = false; //오른쪽 위 최고 이름 표시 여부
config.item_x = 1500; //최고값의 좌표
config.item_y = -50;  //최고값의 좌표

config.totalLabel_switch = true; //토탈 텍스트 사용 여부
config.totalLabel_x = 1200; //토탈 텍스트 x좌표
config.totalLabel_y = 650; //토탈 텍스트 y좌표
config.totalLabel_color = "#5C5C5C"; //토탈 텍스트 글자 색
config.totalLabel_fontsize = 35; //토탈 텍스트 글자 크기
config.totalLabel_text = "Total : "; //토탈 텍스트 기본 텍스트