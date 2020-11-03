const config = {
    // 数据源的编码方式。
    // 默认为UTF-8。
    // 如果是国内用户，且使用旧版Execl处理数据，保存的编码很可能是GBK的，如果出现乱码则将这里改成GBK。
    // 不建议修改这里。而是建议将自己制作完毕的csv文件的内容复制到example.csv中。因为example.csv的编码格式是所有语言都支持的。
    // Encoding is not recommended to be modified.
    // Instead, it is recommended to copy the contents of the CSV file produced by yourself to example.csv.
    // The encoding format of example.csv is supported by all languages.
    encoding: "EUC-KR",

    // 시간 노드 당 표시되는 최대 항목 수입니다.
    max_number: 20,

    // 상단 확장 텍스트가 표시되는지 여부를 조정합니다.
    showMessage: true,

    graphTitle_fontsize: 40, //상단 타이틀 글자크기
    graphTitle_color: "#5C5C5C", //상단 타이틀 글자 색

    img_barinfo_adjust_x: -40,
    img_barinfo_adjust_y: -5,

    // 자동 시간 주문
    // 이 항목을 열 때 반드시 표준 날짜 형식을 사용하십시오!(即：YYYY-MM-DD HH:MM)
    // 닫으면 정렬 순서는 csv 테이블의 시간 필드의 하향식 순서입니다.
    // 날짜 형식이 표준 날짜 형식 인 경우 데이터 정렬을 무시하고 날짜 순서별로 자동 정렬하는 효과를 얻을 수 있습니다.
    // 자동 트위닝을 수행하려면 auto_sort를 켜십시오.
    // Auto Sort by Time
    // Please ensure using standard datetime format (YYYY-MM-DD HH:MM) when this term is enabled!!!
    auto_sort: false,

    bar_info_text_y: 15,

    // 시간 형식
    timeFormat: "%Y-%m-%d",

    // 가장 짧은 막대가 맨 위에 오도록 역순
    reverse: false,

    // 유형은 어떤 필드를 구별합니까? 이름 인 경우 유형 표시를 끕니다.
    divide_by: "type",

    // 색상은 어떤 필드를 기준으로합니까?
    divide_color_by: "name",

    // 필드 값과 해당 색상 값
    color: {
        Chinese: "#1177CC",
        Japanese: "#667788"
    },

    // 색 그라데이션 : 색 바인딩 성장률
    changeable_color: false,

    // 추가 된 기능 : 다른 유형의 성장률은 다른 그라디언트 색상을 사용합니다 (어두운 → 밝음)
    // 如果该项为false，那么所有条目全部按照color_range变色
    // 如果该项为true，那么按照src/color_ranges.js中的color_ranges变色，默认色板为color_range
    // 一个具体的设置模板见src/_color_ranges.js，将其更名为color_ranges.js再设置即可
    divide_changeable_color_by_type: false,
    color_range: ["#ff7e5f", "#feb47b"],

    // 附加信息内容。
    // left label
    graphTitle: "Title",


    use_img_as_barinfo: true,  //////////////////////////////
    img_barinfo_width: 40,  ////////////////////////////////
    img_barinfo_height: 40,
    original_barinfo_text: false,
    text_barinfo: {
        a: "text for a"
    },

    // 榜首项目信息的水平位置 。
    // Top item information horizontal location
    item_x: 1000,
    item_y: -50,

    // 시점 간격.
    interval_time: 1,

    // 위 텍스트의 가로 높이
    text_y: -50,

    // 오른쪽 텍스트 가로 좌표
    text_x: 1000,
    // 오프셋
    offset: 350,

    // Hide barInfo if bar is shorter than barInfo
    display_barInfo: 0,

    // 카운터 사용
    // 주의! 사용 타이머와 사용 유형이 현재 호환되지 않습니다. 즉, 동시에 켤 수 없습니다!
    // 카운터는 오른쪽 상단에 나타나고 목록의 현재 상단 지속 시간을 기록합니다.
    use_counter: false,
    // 각 시간 노드에 대한 카운터의 단계 크기입니다.
    // 예를 들어, 시간 노드 날짜 사이의 간격은 1 주일 (7 일) 일 수 있으므로 단계 값은 7이어야합니다.
    step: 1,

    //////////////////////////////////////////////////////////////////////////////
    // 값 형식
    // 표시되는 자릿수를 제어합니다. 주로 중간 숫자를 수정하여 이루어지며 1이면 소수점 이하 한 자리에 예약됩니다.
    // 쉼표는 세 자리 숫자마다 ","
    // '.2f' means keeping two decimals.
    format: ",.0f",

    background_img: "background.jpg",
    // 접미사
    postfix: "",

    rateLabel_custom_text: {
        a: "텍스트 a",
        b: "가나다라",
        c: "Hi",
        d: "lalala",
        e: "가나라"
    },

    //바 안의 글자 크기
    bar_info_font_size: 24,

    // 이 작업을 이해하지 못하는 경우 여기에서 수정하지 않는 것이 좋습니다.
    // 디 포맷 기능 :
    // 포맷 작업을 수행하면 NaN 문제가 발생할 수 있습니다.
    // 이 함수는 형식화 된 값을 JS가 인식 할 수있는 숫자로 형식화하지 않습니다.
    deformat: function(val, postfix) {
        return Number(val.replace(postfix, "").replace(/\,/g, ""));
    },
    //////////////////////////////////////////////////////////////////////////////

    // 차트의 왼쪽 및 오른쪽 공간.
    left_margin: 250,
    right_margin: 150,
    top_margin: 180,
    bottom_margin: 0,

    rateLabel_use_custom: true,

    // 시간 태그 사용 여부입니다.
    dateLabel_switch: true,
    dateLabel_fontsize: 10,
    dateLabel_color: "#5C5C5C",
    //시간 태그 좌표。제안x：1000 y：-50시도 시작，기본 위치는x:null,y:null
    dateLabel_x: null,
    dateLabel_y: null,

    // 평균 막대보다 큰 막대가 사라지면 떠오를 수 있습니다.
    allow_up: false,

    // 리버스 리더 보드와 같은 상황에 대비 한 모든 항목
    always_up: false,

    // 애니메이션 효과 설정 참인 경우 새로 입력 한 항목은 0부터 시작합니다.
    enter_from_0: true,

    // 모든 숫자가 매우 커서 간격을 열 수없는 경우 좌표 원점을 (최소값) * 2- (최대 값)로 변환하려면이 설정을 켜십시오.
    big_value: true,

    // 반 로그 좌표를 사용하려면 켜십시오
    use_semilogarithmic_coordinate: false,

    // barinfo가 너무 깁니다? 어쩌면 이것을 시도하십시오
    long: false,

    // 노드가 시작되는 시간 지연의 수
    wait: 0,

    // 스왑 애니메이션의 속도를 개별적으로 제어
    update_rate: 1,

    // 균일 한 속도의 애니메이션 효과를 켭니다
    // animation:'linear',
    showLabel: true,

    // label x샤프트 위치
    labelx: -10,

    // rate label
    rateLabel_switch: true,
    rateLabel_fix: true,
    rateLabel_x: 1200,
    rateLabel_y: 500,
    rateLabel_color: "#5C5C5C",
    rateLabel_fontsize: 30,

    max_ranking_num: 3,

    totalLabel_switch: true,
    totalLabel_x: 1200,
    totalLabel_y: 500,
    totalLabel_color: "#5C5C5C",
    totalLabel_fontsize: 30,
    totalLabel_text: "Total : ",

    showTop: true,

    showTitle: true,

    use_img: true,

    // 사진 경로, 로컬 사진 또는 온라인 사진.
    // imgs.js에서 구성 할 수도 있습니다.
    imgs: {
        i:
            "http://i1.hdslb.com/bfs/face/983034448f81f45f05956d0455a86fe0639d6a36.jpg",
        a:
            "img/983034448f81f45f05956d0455a86fe0639d6a36.jpg"
    },

    imgs_barinfo: {
        i:
            "img/프노 프로필.jpg"
    },

    img_margin: 30,
    img_margin_with_text: 10,
    rate_img_width: 50,
    rate_img_height: 50,
    rate_img_text_fontsize: 25,


    use_img_ano: true,
    img_ano: "img/983034448f81f45f05956d0455a86fe0639d6a36.jpg",
    img_ano_width: 100,
    img_ano_height: 100,
    img_ano_x: 1300,
    img_ano_y: 500,
    

    use_text_ano: true,
    text_ano: "Another Text",
    text_ano_fontsize: 30,
    text_ano_x: 1300,
    text_ano_y: 500,

    // 글로벌 배경색
    background_color: "#FFFFFF",

    // 사각형 열이 둥근 사각형인지 여부
    rounded_rectangle: true,

    // x 축 축 표시 여부
    show_x_tick: true,

    // limit bar info display length
    bar_name_max: 30,
    bar_height: 26,

    img_width: 40,
    img_height: 40,
    use_img_as_rate: false
};
