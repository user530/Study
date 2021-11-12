#include <iostream>
#include "myException.h"

int main()
{
    MyException myExcpt;
    BigException bgExcpt;
    EvenBiggerException omgExcpt;

    for (int i = 0; i < 7; ++i)
    {
        try
        {
            if (i == 3)
                throw myExcpt;
            else if (i == 5)
                throw bgExcpt;
            else if (i == 6)
                throw omgExcpt;
        }
        catch (const EvenBiggerException &err)
        {
            std::cout << "We encountered some problems...\n"
                      << err.what() << std::endl;
        }
        catch (const BigException &err)
        {
            std::cout << "We encountered some problems...\n"
                      << err.what() << std::endl;
        }
        catch (const MyException &err)
        {
            std::cout << "We encountered some problems...\n"
                      << err.what() << std::endl;
        }
        std::cout << "After this loop the i = " << i << std::endl;
    }
};