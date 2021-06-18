#include <iostream>
#include <string>

int *createArr(int len, int initialValue)
{
    int *arr = new int[len];
    for (int i = 0; i < len; ++i)
    {
        *(arr + i) = initialValue + i;
    }

    return arr;
}

struct myObj
{
    std::string name;
    int id;
    bool isOn;
};

int main()
{
    // int a = 10;
    // int *arr = createArr(a, 1);
    // for (int i = 0; i < a; ++i)
    // {
    //     std::cout << *(arr + i) << std::endl;
    // }
    // std::cout << *arr << "\n";
    // delete[] arr;
    // std::cout << *(arr + 2) << "\n";

    myObj obj1;
    obj1.id = 1;
    obj1.name = "Kek";
    obj1.isOn = false;

    std::cout << "The object " << obj1.name << ", has id - " << obj1.id << ". And its status is " << obj1.isOn << ".\n";
    return 0;
}