---
layout: post
title: Transpose sparse matrix
gh-repo: daattali/beautiful-jekyll
tags: [C++, Matrix]
comments: true
---

#### 요약

- 주 언어 : C++
- 제작 기간 : 2020.04.07
- 주제 : 희소행렬의 저장과 연산 구현

#### 잡담    

클래스 구조도 이미 주어져 있고, 전치 알고리즘, 개선된 전치 알고리즘 모두 주어져 있어서 내가 
해야 하는 일은 단지 이들을 합져주는 것 뿐이었다.   

#### 코드    

C++ 식으로 class도 정의하고 했지만 stdio를 사용하고 있는 것을 알 수 있다. 습관이다.
딱히 설명할만한게 없어서 그냥 full code만 올려놓겠다.   

```c
#define _CRT_SECURE_NO_WARNINGS //fopen 함수의 보안문제 무시
#include <stdio.h>
#include <string.h> //strtok()함수 사용을 위함임
#include <stdlib.h> //atoi()함수 사용을 위함임

#define MaxTerms 10000 //0이 아닌 데이터들의 최대 개수(조정해주세요)
#define MAX_COL 100 //읽어들일 데이터의 최대 행 또는 열(조정해주세요)

class SparseMatrix;

//희소행렬에 들어갈 0이 아닌 데이터의 정보 클래스
class MatrixTerm {
	friend class SparseMatrix;
private:
	int row, col, value;
};

//희소행렬 클래스
class SparseMatrix {
private:
	//0이 아닌 원소의 행,열,데이터를 저장하고 있는 클래스의 배열
	MatrixTerm smArray[MaxTerms];

	//Rows : 저장될 데이터의 행 개수
	//Cols : 저장될 데이터의 열 개수
	//Terms : SparseMatrix에 저장될 smArray의 길이(0이 아닌 데이터의 개수)
	int Rows, Cols, Terms = 0;

public:
	//생성자로, 저장될 데이터의 행개수, 열개수를 인수로 받아 저장한다.
	SparseMatrix(int MaxRow, int MaxCol) {
		Rows = MaxRow;
		Cols = MaxCol;
	}

	//텍스트에서 읽어들인 행렬의 데이터들 중 0이 아닌 것들을 저장할때 호출되는 함수
	void AddData(int row, int col, int value) {
		smArray[Terms].row = row;
		smArray[Terms].col = col;
		smArray[Terms].value = value;
		Terms++; //데이터가 하나 추가될 때마다 배열의 길이를 나타내는 Terms를 하나씩 더함
	}

	//저장한 희소 행렬을 출력하는 함수
	void printMatrix_self() {
		for (int i = 0; i < Terms; i++) {
			printf(" %d %d %d\n", smArray[i].row, smArray[i].col, smArray[i].value);
		}
	} 

	//기본적인 transpose 행렬 구하는 함수
	void transpose() {
		MatrixTerm b[MaxTerms];
		int i, j, currentb;

		currentb = 0;
		for (i = 0; i < Cols; i++) {
			for (j = 0; j < Terms; j++) {
				if (smArray[j].col == i) {
					b[currentb].row = smArray[j].col;
					b[currentb].col = smArray[j].row;
					b[currentb].value = smArray[j].value;
					currentb++;
				}
			}
		}

		printMatrix(b);
	} 

	//강의자료에 제시된 transpose 행렬 구하는 함수
	void fast_transpose() {
		MatrixTerm b[MaxTerms];
		int row_terms[MAX_COL], starting_pos[MAX_COL];
		int i, j;

		for (i = 0; i < Cols; i++) {
			row_terms[i] = 0;
		}

		for (i = 0; i < Terms; i++) {
			row_terms[smArray[i].col]++;
		}

		starting_pos[0] = 0;

		for (i = 1; i < Cols; i++) {
			starting_pos[i] = starting_pos[i - 1] + row_terms[i - 1];
		}

		for (i = 0; i < Terms; i++) {
			j = starting_pos[smArray[i].col]++;
			b[j].row = smArray[i].col;
			b[j].col = smArray[i].row;
			b[j].value = smArray[i].value;
		}

		printMatrix(b);
	}
	
	//인수로 받은 희소행렬을 출력하는 함수
	void printMatrix(MatrixTerm m[]) {
		for (int i = 0; i < Terms; i++) {
			printf(" %d %d %d\n", m[i].row, m[i].col, m[i].value);
		}
	}

};

int main() {
	int mat[MAX_COL][MAX_COL]; //읽어들일 행렬의 원모습
	int i=0, j=0, k=0, l=0;

	char temp[500]; //텍스트 파일의 한 줄을 저장하는 변수
	FILE* fp; //열 텍스트 파일의 포인터 형식

	///////////////////////////////////////////////////////////////////////////////////////////
	//텍스트 파일 열기
	//여기다가 본인 컴퓨터에 있는 hw1.txt의 위치를 넣어주세요
	//파일 속성 들어가서 파일 위치를 복붙하면 뒤에 hw1.txt가 없이 붙여넣어짐. 따라서 적어주고
	//"\"가 하나씩마 들어가 있을텐데, 아래처럼 두개로 만들어주기
	///////////////////////////////////////////////////////////////////////////////////////////
	fp = fopen("C:\\Users\\6712k\\Desktop\\hw1.txt", "r"); 

	while (fgets(temp, 500, fp) != NULL) {
		j = 0;
		char *tok = strtok(temp, " "); //strtok함수를 통해 읽어들인 한 줄을 " "(띄어쓰기)를 기준으로 분리시킴
		while (tok != NULL) {
			mat[i][j++] = atoi(tok); //분리시킨 각각의 문자열 ("12" 등)을 atoi로 int형식으로 변환시켜 mat에 저장
			tok = strtok(NULL, " ");
		}
		i++;
		//i와 j는 추후 읽어들인 행렬의 행개수와 열개수를 가리키게 됨
	}
	fclose(fp); //텍스트 파일 닫기 (fopen함수와 짝꿍으로, 반드시 필요함)

	printf("1) Original Matrix : A\n");
	for (k = 0; k < i; k++) {
		for (l = 0; l < j; l++) {
			printf(" %d", mat[k][l]); //원래 형식으로 출력
		}
		printf("\n");
	}
	printf("\n\n");
	printf("2) Transpose of Original matrix A\n");
	for (k = 0; k < i; k++) {
		for (l = 0; l < j; l++) {
			printf(" %d", mat[l][k]); //위의 출력 형식에서 l과 k를 바꾸어 transpose 행렬 출력
		}
		printf("\n");
	}
	printf("\n\n");
	SparseMatrix sm(i, j); //i * j 크기의 희소행렬을 선언

	for (k = 0; k < i; k++) {
		for (l = 0; l < j; l++) {
			if (mat[k][l] != 0) { //행렬의 데이터가 0이 아닐 때에만
				sm.AddData(k, l, mat[k][l]); //희소행렬에 데이터를 삽입
			}
		}
	}
	printf("3) Sparse matrix of A - row major\n");
	sm.printMatrix_self(); //단순히 희소행렬 출력
	printf("\n\n");

	printf("4) Transpose of Sparse matrix A - column major\n");
	sm.transpose(); //단순히 행과 열을 바꾸는 알고리즘을 사용하여 transpose 희소행렬 출력
	printf("\n\n");

	printf("5) Fast transpose of Spare matrix A\n");
	sm.fast_transpose(); //제시된 알고리즘을 사용하여 transpose 희소행렬 출려

	return 0;
}
```