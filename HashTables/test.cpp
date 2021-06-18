#include <iostream>
#include <string>
#include <cmath>
using namespace std;

// ! CONSTANTS !
// #define UUU "UUU";

// int sum(int a, int b)
// {
//     int r;
//     r = a + b;
//     return r;
// };

// void greeting(string name)
// {
//     cout << "Hello, World!\n"
//             "Hello, "
//          << name << "!" << endl;
// };

// void doubleArg(int &a, int &b, int &c)
// {
//     a *= 2;
//     b *= 2;
//     c *= 2;
// };

// float toBeContinued(int, int);

// int sameName(int a, int b)
// {
//     return (a * b);
// };

// double sameName(double a, double b)
// {
//     return (a / b);
// };

// template <class T>
// T templateFunc(T arg1, T arg2)
// {
//     T res;
//     res = arg1 + arg2;
//     return res;
// };

// namespace myNamespace
// {
//     int a = 0, b = 98;
//     int c = a + b + 1;
//     bool bothEven()
//     {
//         return (a % 2 == 0 && b % 2 == 0);
//     };
// }

// template <class T>
// void printArr(T arr[], int len)
// {
//     for (int i = 0; i < len; ++i)
//     {
//         cout << "Element " << i + 1 << " is " << arr[i] << "\n";
//     }
// }

int addition(int a, int b)
{
    return (a + b);
};

int substraction(int a, int b)
{
    return (a - b);
};

int doSomething(int a, int b, int (*functocall)(int, int))
{
    return (*functocall)(a, b);
};

int main()
{
    // !WHILE LOOP!
    // int a = 10;
    // while (a >= 0)
    // {
    //     cout << "The value of a is " << a << endl;
    //     a--;
    // }

    // !DO-WHILE LOOP (at least one execution)!
    // string b;
    // do
    // {
    //     cout << "Please input some text. Input \"stop\" to stop." << endl;
    //     cin >> b;
    //     cout << "You entered '" << b << "';" << endl;
    // } while (b != "stop");

    // !FOR LOOP!
    // for (float c = 2.0f; c >= 1.0f; c -= 0.1f)
    // {
    //     cout << "The value of c is " << c << endl;
    // }

    // !IN RANGE LOOP!
    // string str{"Hello"};
    // int arr[5]{'a', 'A', 'b', 'B'};
    // for (auto el : arr)
    // {
    //     cout << "The value in range is " << el << endl;
    // }

    // !SWITCH OPERATOR!
    // int d;
    // cout << "Please enter number" << endl;
    // cin >> d;
    // switch (d)
    // {
    // case 1:
    // case 2:
    // case 3:
    //     cout << "Your value is less or equal to 3";
    //     break;
    // default:
    //     cout << "Your value is greater than 3";
    //     break;
    // };

    // !FUNCTIONS!

    // EXAMPLE 1
    // cout << sum(sum(1, 4), sum(2, 8));

    // EXAMPLE 2
    // cout << "Please, enter your name!\n";
    // string n;
    // cin >> n;
    // greeting(n);

    // EXAMPLE 3
    // int a = 3, b{2}, c{5};
    // cout << "a = " << a << "\nb = " << b << "\nc = " << c << endl;
    // doubleArg(a, b, c);
    // cout << "After we double...\n";
    // cout << "a = " << a << "\nb = " << b << "\nc = " << c << endl;

    // EXAMPLE 4
    // cout << toBeContinued(30, 180) << endl;

    // EXAMPLE 5
    // cout << sameName(2, 6) << "\n";
    // cout << sameName(7.31, 2.49) << endl;

    // EXAMPLE 6
    // cout << "Template on ints " << templateFunc(1, 2) << "\n";
    // cout << "Template on floats " << templateFunc(2.49, 4.61) << "\n";

    // ! NAMESPACES !
    // int a = 10, b = 5;
    // cout << "Global a = " << a << ", global b = " << b << "\n";
    // cout << "Namespace a = " << myNamespace::a << ", namespace b = " << myNamespace::b << endl;
    // cout << "Namespace c = " << myNamespace::bothEven() << endl;

    // ! ARRAYS !
    // EXAMPLE 1
    // int Arr[5] = {0, 1, 2, 3, 4};
    // int a = Arr[1];
    // cout << Arr[a] << " " << Arr[a + 4] << " " << Arr[Arr[3]] << endl;

    // EXAMPLE 2
    // int arr1[5] = {1, 2, 3, 4, 5};
    // char arr2[10] = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'};

    // printArr(arr1, 5);
    // cout << "----------------" << endl;
    // printArr(arr2, 10);

    // EXAMPLE 3
    // int arr[3] = {10, 20, 30};
    // for (int i = 0; i < 3; ++i)
    // {
    //     cout << arr[i] << " " << &arr[i] << endl;
    // }

    // ! POINTERS!
    // EXAMPLE 1
    // int *a, *b, myVar = 10, otherVar = 20;
    // a = &myVar;
    // b = &otherVar;

    // cout << "The pointer 'a' is " << a << ", and store the value " << *a << "\n";
    // cout << "The pointer 'b' is " << b << ", and store the value " << *b << "\n";

    // EXAMPLE 2
    // int myArr[5], *p;
    // p = myArr;
    // *p = 10;
    // ++p;
    // *p = 20;
    // p = &myArr[2];
    // *p = 30;
    // p = myArr + 3;
    // *p = 40;
    // p = myArr;
    // *(p + 4) = 50;

    // for (int i = 0; i < 5; ++i)
    // {
    //     cout << "Element [" << i + 1 << "] has value - " << myArr[i] << "\n";
    // }

    // EXAMPLE 3
    // const int *a;
    // int *b;
    // int arr[3] = {10, 20, 30};
    // a = arr;

    // while (a <= &arr[2])
    // {
    //     cout << *(a++) << "\n";
    // }

    // EXAMPLE 4
    // void *p; //void pointers can point on any data, but cant dereference them by themself
    // char a = 'a';
    // int b = 10;
    // p = &a;                                 //point to char data
    // cout << (char)(*(char *)p + 1) << "\n"; // (char*)p -> we make char pointer from p, dereference it *[...]p as char
    // p = &b;
    // cout << *(int *)p + 10 << endl; // (int*)p -> we make int pointer from p, dereference it and print

    // EXAMPLE 5
    // int m, n;
    // m = doSomething(10, 5, addition);
    // n = doSomething(17, 12, substraction);

    // cout << m << ", " << n << endl;

    return 0;
};

// float toBeContinued(int arg1, int arg2)
// {
//     int NOD;
//     while (arg1 != arg2)
//     {
//         NOD = max(arg1, arg2) - min(arg1, arg2);
//         if (arg1 > arg2)
//         {
//             arg1 -= arg2;
//         }
//         else
//         {
//             arg2 -= arg1;
//         }
//     }
//     return NOD;
// };