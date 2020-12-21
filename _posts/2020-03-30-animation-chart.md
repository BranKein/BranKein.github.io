---
layout: post
title: Animation Chart by d3.js
gh-repo: daattali/beautiful-jekyll
cover-img: /assets/img/animation_chart/animation_chart_ex.PNG
tags: [animation chart, javascript, d3.js]
comments: true
---

#### 요약

- 주 언어 : Javascript, d3.js
- 제작 기간 : 2020.03.21 - 2020.03.30
- 주제 : d3.js를 이용한 애니메이션 차트 생성

#### 잡담

내 주 분야는 javascript는 원래 아니었다. 당시에는 javascript를 제대로 배우지도 않았을 뿐더러 
d3.js의 개념도 하나도 모른 채 애니메이션 차트를 만들기 시작하였다.   
왜 진행했냐고 물어본다면 알바 때문이었다. 그리고 javascript도 언젠간 또 다룰 것 같다는 생각에 
그냥 부딪혀보며 씹어먹어보자라는 생각을 했다. 하지만 씹어먹혔다.   

#### 간단한 소개   

유튜브를 자주 본다면, [그래프로 보는 한국 유튜버 구독자 순위 (2017-2019)](https://www.youtube.com/watch?v=OEo6KzvSFpI&ab_channel=MDM) 와 같은 영상을 자주 보았을 것이다.    

![Crepe](/assets/img/animation_chart/chart_example_in_youtube.PNG){: .mx-auto.d-block :}

물론 javascript가 아니라 영상편집으로 보다 자유롭고, 깨끗하게 제작할 수도 있을 것이란 생각이 들긴 하다. 
하지만 어쩌겠는가. javascript로 만들어야 한다. (정확히는 이걸 온전히 처음부터 만들진 않았다)   

#### 개발   

내가 javascript를 거의 모르지만 작업을 하게 된 이유는 아래 github link에 있다.   
[Historical-ranking-data-visulization-based-on-d3.js](https://github.com/Jannchie/Historical-ranking-data-visualization-based-on-d3.js.git)   
(GNU General Public License v3.0이었기 때문에 Commercial use, Modification 등이 가능하다)   
비록 중국인이 만들어놓은 예제이긴 하지만, d3.js의 사용법을 익히기에는 충분했으며, 
이미 원하는 기능들이 거의 다 만들어져 있어서 내가 해야 할 일은 코드를 이해해서 
디자인적으로 수정하기가 편하도록, 즉 굳이 코드를 뒤지지 않더라도 간단히 디자인을 
수정할 수 있도록 하는 것이 목적이었다. 제목과 부제목 등을 수정하기 쉽도록 하고, 
글자 크기, 위치, 색 등등을 수정할 수 있도록(수정하기 쉽도록) 하였다. 여기서 계속 
"수정하기 쉽도록" 이라고 하는데, 나는 이를 실현시키기 위해 단순히 js 코드를 하나 더 
만들어서 const 들만 모아논 파일로 하고, 거기에 있는 코드들만 수정하면 웬만한 디자인들은 
바꿀 수 있도록 하였다.   

말로는 잘 와닿지가 않을 것이다. 직접 체험(?) 해보자.   
먼저 그래프를 띄울 데이터가 필요하다. 그런데 이 데이터도 어느정도 형식이 있고, 데이터 양도 많아야 해서 
테스트 해볼 데이터를 제공해주려고 한다.   
[download link](https://drive.google.com/uc?export=download&id=18mLfG2slJH3wbRQ_up7OM5FZ22b9H-Sj)   
열어보면 한 csv 파일이 다운받아질거고, 원하는 위치에 저장해 놓자. 웬만하면 데이터는 
수정하려 하지 말자. 인코딩 문제가 생긴다.   

다운 받고 나면 아래 링크로 들어가 준다.   
[Animation Chart by Pno02](/assets/animation_chart/bargraph.html)   
들어가면 가운데에 조그맣게 파일을 선택하는 버튼이 있고, 눌러서 방금 다운받았던 파일을 선택해준다. 
화면 비율에 문제가 약간 있을 것 같긴 하지만 그건 그냥 Ctrl+휠 을 통해 보기 좋게 조정하자. 
오류가 나지 않았다면 그래프의 숫자들이 자동으로 올라가고 오른쪽 하단의 날짜가 변할 것이다. (오류가 난다면 댓글을 남겨주기 바란다)   

이런걸 만들었구나.. 하고 이젠 코드를 보자. 물론 어엄청나게 긴 코드들을 볼 필요는 없고, 
내가 만들어놓은 graph_properties.js 파일과 주 코드인 visual.js의 일부분만 보면 된다.   
```javascript
config.background_color = "#FFFFFF"; //전체 배경색
config.background_img = "img/background.jpg"; //배경 이미지 (1900, 1020 이미지 적극 권장(아닐 경우 이미지 배치가 이상해집니다(자동 확대 및 축소 불가)))

config.use_img_ano = false; //빈공간에 띄우는 이미지 사용 여부
config.img_ano = "img/프노 프로필.jpg" //띄울 이미지 선택 (.jpg 과 같은 파일 형식 반드시 붙여주세요)
config.img_ano_width = 300; //띄울 이미지의 크기(실제 이미지 파일의 크기와 같아야 위치 선정이 올바르게 됩니다)
config.img_ano_height = 300;
config.img_ano_x = 1200; //띄울 이미지의 위치
config.img_ano_y = 300;

config.use_text_ano = false; //빈공간에 띄우는 부가 텍스트 사용 여부
config.text_ano = "Made by Pno02"; //빈공간에 띄우는 부가 텍스트
config.text_ano_fontsize = 30; //텍스트 글자크기
config.text_ano_x = 1270; //텍스트의 위치
config.text_ano_y = 800;
```
graph_properties.js 파일의 일부만 가져와보았다. config.js 파일에 각종 const들이 정의되어 있고, 기본값들도 할당되어 있다. 
그리고 graph_properties.js 파일만을 수정하여 디자인을 수정할 수 있도록 하였다. js를 잘 모르는 사람이 
굳이 원래 코드를 잘못 건드렸다가 코드가 망쳐지는 일이 많기 때문에 이를 방지하고자 주가 되는 코드는 건드리지 
않아도 되도록 설계해보았다. 변수의 이름으로도 어느정도 어떤 값에 해당하는 건지 알아볼 수 있긴 하지만 하도 요소가 
많기 때문에 이해하기 쉽도록   
- 그래프 바와 관련한 상수들(그래프의 너비, 색, 그래프 안의 글자 등등)
- 그래프 외의 부분(제목, 순위 등등)   
이렇게 두 부분으로 섹션을 나누는 디테일까지 보였다.   

주가 되는 코드인 visual.js 코드는 어떻게 변화하였는지 보자.   

원본 코드   
```javascript
if (showMessage) {
    // 左1文字
    var topInfo = g
        .insert("text")
        .attr("class", "growth")
        .attr("x", 0)
        .attr("y", text_y)
        .text(itemLabel);

    // 右1文字
    g.insert("text")
        .attr("class", "growth")
        .attr("x", text_x)
        .attr("y", text_y)
        .text(typeLabel);
}
```
내가 수정한 코드   
```javascript
if (config.showTitle) {
    // 왼쪽 위 왼쪽 글
    var topInfo = g
        .insert("text")
        .attr("class", "growth")
        .attr("font-size", config.graphTitle_fontsize)
        .attr("fill", config.graphTitle_color)
        .attr("x", 0)
        .attr("y", text_y)
        .text(graphTitle);
}
```
오른쪽 상단의 글을 따로 제어해주어야 해서 if문을 분리해 주었고, font-size나 
fill과 같은 attribute들을 config에 있는 상수들을 통해 보다 세부적으로 
제어하고 있는 것을 볼 수 있다. 처음 다뤄보는 css도 뜯어가며 수정한 부분도 있었다.    

config.js에 const들을 더 추가해주기만 한건 아니다. 추가적으로 원하는 기능들도 
있어서 추가하였다. 포스팅하는 시점과 이 코딩을 한 시점이 8달이 차이나기 때문에 
모두 기억하지는 못하지만.. 기억으로는   
- 그래프 바 왼쪽에 각 항목에 맞는 작은 사진이 띄워짐
- 화면에 부가적으로 텍스트를 하나 넣을 수 있음
- 화면에 부가적으로 이미지를 하나 넣을 수 있음
- 상위 1, 2, 3위에 해당하는 항목들만 따로 랭킹 표시
- 추가적으로 표시한 랭킹의 1, 2, 3위의 위치를 커스터마이징   
등이 있었다.    
아래가 내가 visual.js에 따로 추가해준 부분이다.    

```javascript
if (config.use_img_ano) {
    var img_ano = g
        .insert("image")
        .attr("x", config.img_ano_x)
        .attr("y", config.img_ano_y)
        .attr("fill-opacity", 1)
        .attr("href", config.img_ano)
        .attr("height", config.img_ano_height)
        .attr("width", config.img_ano_width);
} //부가 이미지

if (config.use_text_ano) {
    var text_ano = g
        .insert("text")
        .attr("class", "text_ano")
        .attr("x", config.text_ano_x)
        .attr("y", config.text_ano_y)
        .text(config.text_ano)
        .attr("font-size", config.text_ano_fontsize);
} //부가 텍스트
```   

위에서도 언급했듯이 나는 javascript는 거의 다뤄보지 않았을 뿐더러 d3.js는 아예 
처음 보는 라이브러리였기 때문에 위처럼 새로 기능을 추가하는 것 뿐만 아니라 config.js에 
상수를 추가해서 커스터마이징을 더 하도록 하는 작업도 힘들었다. 어떤 라인이 어떤걸 제어하는지 
처음엔 아예 감이 안잡혔기 때문이다. (게다가 주석이 한자여서 이를 일일히 번역해주는 작업도 힘들었다..) 
굉장히 오랜 시간동안 이 코드가 어떻게 돌아가는지 한줄한줄 뜯어보면서 분석했고, 기억상으로는 약 3일 후부터 
감이 잡히기 시작하면서 상수들을 제어했던 것 같다. 그리고 4~5일정도 되니까 위처럼 새로 기능을 추가하였다. 
html도 거의 공부를 안했었기 때문에 div, text, href 등등의 개념이 익숙하지도 않았었지만 DevTools를 뜯어보며 
숫자 하나 바꾸고 뭐가 변경되는지 찾아보고 하며 뜯어봤던 것 같다.     
게다가 가장 힘들었던 것은 깃헙에서 Jannchie님의 코드를 그대로 다운받고 실행을 시켜도 오류가 났던 것이다...   

아무튼간 아래와 같은 수정 매뉴얼까지 만들고 나선   
![Crepe](/assets/img/animation_chart/modification_manual.PNG)   
굉장히 뿌듯해하면서도 기진맥진한 상태로 코딩을 끝냈다. 그리고 다시는 javascript를 하지 않겠다고 
선언까지 했었다. 물론 포스팅을 하고 있는 지금은 인터렉티브 코딩에 빠져서 PIXI.js를 공부하고 있다. 
게다가 d3.js도 제대로 다시 공부해 볼 생각이다.   

[Full Code - Github](https://github.com/BranKein/Animation_chart_based_on_d3.js_by_Pno02.git)