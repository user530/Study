#include <iostream>

int R2Hash(int A[], int B[])
{

    return -1;
}

int main()
{
    int n = 5;
    int *A = new int[n];
    int *B = new int[n];

    std::cout << "Please, enter " << n << " numbers.\n";
    for (int i = 0; i < n; ++i)
    {
        std::cout << "Enter value to the position " << i + 1 << "...\n";
        std::cin >> *(A + i);
    }

    for (int i = 0; i < n; ++i)
    {
        std::cout << "A[" << i << "] = " << A[i] << ";\n";
    }

    return 0;
}