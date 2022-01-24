#include <iostream>

class Mother
{
private:
    char DNA = 'Y';

public:
    Mother() { std::cout << "Default Mom called\n"; };
    Mother(int n) { std::cout << "Int Mom called\n"; };
    char getDNA() { return DNA; };
};

class Daughter : public Mother
{
private:
    char DNA = 'y';

public:
    Daughter() { std::cout << "Default Daughter called\n"; };
};

class Son : public Mother
{
private:
    char DNA = 'x';

public:
    Son(int a) : Mother(a) { std::cout << "Int Son called\n"; };
};

int main()
{
    Daughter d;
    std::cout << "Daughter getDNA: " << d.getDNA() << "\n";

    Son s(1);
    std::cout << "Son getDNA: " << s.getDNA() << "\n";
}