//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//�׷����� ���� ������ �͵��� �����մϴ�//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

config.color = { //������ �̸����� �Ϸ� ������ �ѱ��� �ν��� ���� �ʾ� �ΰ������� �پ��ִ� ���̷� ����� �մϴ�.(a,b,c,�� ��Ÿ���� �͵�)
    
};

config.use_img_as_barinfo = false; //�� �ȿ� ���� ���� �̹�������(true), �ƴϸ� �ؽ�Ʈ����(false) ����
config.original_barinfo_text = true; //�� �ȿ� ���� �ؽ�Ʈ�� �׳� �̸����� ����(true), �ƴϸ� �Ʒ� Ŀ���� �ؽ�Ʈ�� ����(false) ����
config.bar_info_text_y = 5; //�� �ȿ� �ؽ�Ʈ�� ����� �� �� �ؽ�Ʈ�� y�� ��ġ(���ڰ� Ŭ���� �Ʒ��� ������)
config.bar_info_text_color = "#FFFFFF"
config.text_barinfo = { //�� �ȿ� ���� Ŀ���� �ؽ�Ʈ (5�� ��� �����ؾ� ��)
    a: "�ؽ�Ʈ a",
    b: "�����ٶ�",
    c: "Hi",
    d: "lalala",
    e: "������"
};
config.img_barinfo_height = 120; //�� �ȿ� ���� �̹����� ũ��
config.img_barinfo_width = 150;
config.img_barinfo_adjust_x = -40; // �� �ȿ� ���� �̹��� ��ġ ���� ���ڰ� Ŀ������ ������
config.img_barinfo_adjust_y = -5;  // ���ڰ� Ŀ������ �Ʒ���
config.imgs_barinfo = { //�� �ȿ� ���� �̹��� (5�� ��� �����ؾ� ��)
    a: "img/SK internet.jpg", //�ΰ� �̻��� �� ��� �������� ���� ���ǰ͵��� ���� , �ٿ��ֱ�
    b: "img/lg u+ internet.jpg",
	c: "img/kt internet.jpg",
    d: "img/�������� internet.jpg",
    e: "img/���� ������.jpg"
};

config.showLabel = true; //�� ������ �� ǥ�� ����
config.use_img = false; //�� ���ʿ� �̹����� ������(true) �ؽ�Ʈ�� ������(false) ����
config.img_width = 151; //�̹����� ũ���, ��� �̹����� ���� ������� �ҷ�����.
config.img_height = 38;
config.img_x = -170; //ũ�⸦ ������ ��� x��ǥ�� ���� �������ּ��� (�������� �þ ��� �̹����� �ٸ� �����⵵ ��)
config.img_y = 0;
config.imgs = { //�̿� ���� ������ a, b, c������ �ؾ� ��.
    //    a: "img/983034448f81f45f05956d0455a86fe0639d6a36.jpg", //.jpg �� ���� ���� ���� �ݵ�� �ٿ��ּ���  �� ���� �̹��� ����
    //    b: "img/���� ������.jpg"

    a: "img/SK internet.jpg", //�ΰ� �̻��� �� ��� �������� ���� ���ǰ͵��� ���� , �ٿ��ֱ�
    b: "img/lg u+ internet.jpg",
    c: "img/kt internet.jpg",
    d: "img/�������� internet.jpg",
    e: "img/���� ������.jpg"
};


config.max_number = 20; //ȭ�鿡 ������ ���� �ִ� ������ ǥ��
config.bar_info_font_size = 28; //�� ���� ���� ũ��
config.reverse = false; //true�� ��� ª�� ������� ���� ǥ�õ�

config.bar_height = 26; //���� ����

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// �׷����� ������ ��ҵ��� �ƴ϶� �ΰ����� �����͸� ����ִ� �κ��� �����մϴ�//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

config.background_color = "#FFFFFF"; //��ü ����              //������ �������� ��� �Ⱥ��̴� ���ڵ�����
config.background_img = "img/background.jpg"; //��� �̹��� (1900, 1020 �̹��� ���� ����(�ƴ� ��� �̹��� ��ġ�� �̻������ϴ�(�ڵ� Ȯ�� �� ��� �Ұ�)))

config.use_img_ano = false; //������� ���� �̹��� ��� ����
config.img_ano = "img/���� ������.jpg" //��� �̹��� ���� (.jpg �� ���� ���� ���� �ݵ�� �ٿ��ּ���)
config.img_ano_width = 300; //��� �̹����� ũ��(���� �̹��� ������ ũ��� ���ƾ� ��ġ ������ �ùٸ��� �˴ϴ�)
config.img_ano_height = 300;
config.img_ano_x = 1200; //��� �̹����� ��ġ
config.img_ano_y = 300;

config.use_text_ano = false; //������� ���� �ΰ� �ؽ�Ʈ ��� ����
config.text_ano = "Made by Yeonhyuk Kim"; //������� ���� �ΰ� �ؽ�Ʈ
config.text_ano_fontsize = 30; //�ؽ�Ʈ ����ũ��
config.text_ano_x = 1270; //�ؽ�Ʈ�� ��ġ
config.text_ano_y = 800;

config.showTitle = true; //��ܿ� Ÿ��Ʋ ǥ�� ����
config.graphTitle = "YH's Graph Visualization"; //���� �� �׷��� �̸�, ""���� �� ��� �ƹ��͵� �ȳ���
config.graphTitle_fontsize = 40; //��� Ÿ��Ʋ ����ũ��
config.graphTitle_color = "#5C5C5C"; //��� Ÿ��Ʋ ���� ��

config.dateLabel_switch = true; //��¥ ǥ�� ����
config.dateLabel_fontsize = 75; //��¥ ��Ʈ ũ��
config.dateLabel_color = "#5C5C5C"; //��¥ ���� ��
config.dateLabel_x = 1500;      //��¥�� x��ǥ ��ġ
config.dateLabel_y = 750;       //��¥�� y��ǥ ��ġ



config.rateLabel_switch = true; //��ŷ�� ����Ͽ� ���� ������
config.rateLabel_fix = true; //true�� ��� �׳� ��������� ǥ��
config.rateLabel_use_custom = false; //true�� ��� �̸��� Ŀ���� �ؽ�Ʈ�� ��
config.rateLabel_x = 1150; //1���� ��ǥ(�������� ������ ��) (�ݵ�� �ʿ�)
config.rateLabel_y = 300;  //1���� ��ǥ (�ݵ�� �ʿ�)
// config.rateLabel2_x = 1200; //2���� ��ǥ��, ����� ������ �� ����(fix�� false�϶��� ����)
// config.rateLabel2_y = 450 + 47; //(fix�� false�϶��� ����)
// config.rateLabel3_x = 1200; //(fix�� false�϶��� ����)
// config.rateLabel3_y = 450 + 47 + 47; //(fix�� false�϶��� ����)
config.rateLabel_color = "#5C5C5C"; //��ŷ�� �ؽ�Ʈ�� �ö� ��� �� �ؽ�Ʈ�� ��(�̹����� ���� �� 1,2,3���� ����)
config.rateLabel_fontsize = 30; //��ŷ�� �ؽ�Ʈ�� �ö� ��� �� �ؽ�Ʈ�� ũ��
config.max_ranking_num = 3; //��ŷ�� �ø� �͵��� ���� (fix �� true�� ��쿡�� ����)
config.rateLabel_custom_text = {
    a: "�ؽ�Ʈ a",
    b: "�����ٶ�",
    c: "Hi",
    d: "lalala",
    e: "������"
};

config.use_img_as_rate = false; //��ŷ�� �̹����� ����ϴ°�
config.rate_img_width = 151; //��ŷ�� ���Ǵ� �̹����� ũ��
config.rate_img_height = 38; //��ŷ�� ���Ǵ� �̹����� ũ��
config.img_margin = 75; //fix������ �� ��ŷ�� ���Ǵ� �̹����� ���Ʒ� ����
config.img_margin_with_text = 25; //��ŷ�� ���Ǵ� �̹����� ���� �ؽ�Ʈ �� ����
config.rate_img_text_fontsize = 25; //��ŷ�� ���Ǵ� �ؽ�Ʈ(1,2,3)�� ���� ũ��

config.showTop = false; //������ �� �ְ� �̸� ǥ�� ����
config.item_x = 1500; //�ְ��� ��ǥ
config.item_y = -50;  //�ְ��� ��ǥ

config.totalLabel_switch = true; //��Ż �ؽ�Ʈ ��� ����
config.totalLabel_x = 1200; //��Ż �ؽ�Ʈ x��ǥ
config.totalLabel_y = 650; //��Ż �ؽ�Ʈ y��ǥ
config.totalLabel_color = "#5C5C5C"; //��Ż �ؽ�Ʈ ���� ��
config.totalLabel_fontsize = 35; //��Ż �ؽ�Ʈ ���� ũ��
config.totalLabel_text = "Total : "; //��Ż �ؽ�Ʈ �⺻ �ؽ�Ʈ