#include <iostream>
#include <string>
using namespace std;

int main()
{
    cout << "Hello, World!" << endl;

    // For loop
    // for (int i = 0; i < 10; ++i)
    // {
    //     cout << "i = " << i << endl;
    // };

    // While loop
    // int a = 10;
    // while (a > 0)
    // {
    //     cout << "a = " << a << endl;
    //     --a;
    // };

    // Do While loop
    // string str;
    // do
    // {
    //     cout << "Please, enter a string: ";
    //     getline(cin, str);
    //     cout << "You entered - \"" << str << "\" \n";
    // } while (str != "Bye");

    // Range iteration
    string str2 = "Hello!";
    int arr[5] = {1, 2, 3, 4, 5};
    for (char C : str2)
    {
        cout << "[" << C << "] ";
    }
    cout << "\n";
    for (int el : arr)
    {
        cout << "\'" << el << "\'";
    }
}