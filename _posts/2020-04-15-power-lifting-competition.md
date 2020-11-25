---
layout: post
title: Power-lifting competition
gh-repo: daattali/beautiful-jekyll
tags: [Python, power-lifting competition]
comments: true
---

#### 요약

- 주 언어 : Python
- 제작 기간 : 2020.04.14 - 2020.04.15
- 주제 : Power lifting competiton

#### 잡담    

뭔가 Newton Approximation이 생각나는 예제이다.
단지 예상값을 사람이 맞춰줘야 한다.   
업다운게임같기도?       

#### 개발    

$$ Q = {{1.486 A R^{2/3} S^{1/2}} \over N } $$   

Q is the flow if water(cubic feet per second), N is the roughness 
coefficient(unitless), A is the area(square feet), S is the slope(feet/foot), 
and R is the hydraulic radius(feet).   

Hydraulic radius = depth * width / (2.0 * depth + width)   

위가 내가 가진 모든 수식에 관한 정보였다. 딱히 왜 저렇게 식이 나오는지는 나한테 중요하지 않았다. 
이를 코드로 구현만 시키면 되지.

약간 설명을 하자면, (잘 기억은 안나지만) 물탱크에 일정량의 물이 담겨 있고, 이를 어느 두께의
호스로 물을 뺀다고 생각했을 때, 그 flow의 값을 일정 수준으로 맞추기 위해서 물탱크의 깊이를 예측하는 것이었다.
물탱크의 깊이가 깊을수록 빠져나오는 물의 flow는 커질테니까.

저 위의 Q값은 이를테면 이론값으로, 이제 사용자가 깊이값을 조정하여 적절한 Q값을 만들어내는 것이다. 다음과 같이 말이다.

![Crepe](/assets/img/power_lifting_competition/power_lifting_sample.PNG){: .mx-auto.d-block :}
(이 사진은 내가 만든 프로그램을 실행시켜 얻은 사진이다.)

맨 처음에는 물탱크의 정보와 물탱크가 5 feet일 때의 flow값을 제공해준다. 그리고 사용자에게 flow값을 1000.000
cfs(cubic feet per second)로 맞추라고 한다. 그러면 이제 사용자는 숫자를 입력하여 flow 값을 조정한다.

깊이값이 입력되면 그에 따라 flow값을 계산하여 보여주고, 목표값인 1000.000 cfs와의 차이와 오차율을 계산해준다.
사용자는 계산된 에러를 보고 깊이값을 조정하며 지속하여 입력하며 다시 에러를 받게 된다. 이러한 과정이 지속되다가 오차율이 1% 미만으로 
떨어질 경우 프로그램은 종료하게 된다.   

코드를 보면 알겠지만 사용자의 깊이값 입력 한도는 0 이상 10 이하의 값이며 그런 숫자를 입력했을 경우 아무런 작업도 하지 않고 다시 
사용자로부터 깊이값을 입력받는다.   

다음은 위 프로그램의 full code이다.   

```python
def Calculate_Flow(depth):  # Q를 계산해 주는 함수로, Difference와 Error도 같이 반환함.
    Q = 1.486 / 0.014 * 15.0 * depth * pow(depth * 15.0 / (2.0 * depth + 15.0), 2 / 3) * pow(0.0015,
                                                                                             1 / 2)  # PPT에 있는 공식 그대로
    return Q, 1000.0 - Q, (1000.0 - Q) / 1000.0 * 100.0  # Q, Difference, Error순으로 반환


def getGuess():  # 사용자에게 Guess_Depth를 입력받는 부분으로, 범위에 맞는 값을 입력하도록 함.
    while (True):
        Guess_Depth = float(input("Enter guess : "))  # 소수를 입력할 수도 있으니 float형태로 저장
        if (Guess_Depth > 0 and Guess_Depth < 10):  # 입력한 값이 범위에 맞으면 와일문 끝냄
            break
    return Guess_Depth


def main():
    Q, Difference, Error = Calculate_Flow(5.0)
    print("At a depth of 5.0000 feet, the flow is {}\n".format(Q))

    print("Enter your initial guess for the channel depth")  # 입력을 위한 설명
    print("when the flow is 1000.0000 cubic feet per second")

    Guess_Depth = getGuess()  # 사용자가 입력할 depth의 추측값을 Guess_Depth에 저장

    while (True):
        Q, Difference, Error = Calculate_Flow(Guess_Depth)  # Q값을 먼저 계산
        if (abs(Error) <= 1.0):  # 계산된 에러가 1보다 작거나 같으면 아무것도 출력하지 않고 프로그램 종료를 위해 와일문 끝냄
            break

        print("\nDepth: {:.4f}  Flow: {:.4f} cfs  Target: 1000.0000 cfs".format(Guess_Depth, Q))  # 계산된 것들을 출력
        print("Difference: {:.4f}  Error: {:.4f} percent".format(Difference, Error))
        Guess_Depth = getGuess()  # 사용자로부터 예상 depth 값 입력받음

if __name__ == '__main__':
    main()
```