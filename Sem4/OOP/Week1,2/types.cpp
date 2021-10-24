#include <iostream>

int main()
{
    std::cout << "Hello World!" << std::endl;

    char c = 'a';
    std::cout << "The size of the char is - " << sizeof(c) << std::endl;

    signed int i = 0;
    std::cout << "The size of the int is - " << sizeof(i) << std::endl;

    float f = 0.0f;
    std::cout << "The size of the float is - " << sizeof(f) << std::endl;

    long double d = 0.0;
    std::cout << "The size of the long is - " << sizeof(d) << std::endl;

    return 0;
}