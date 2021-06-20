#include <iostream>

int R1(int key, int A[], int B[], int N)
{
    for (int i = 0; i < N; ++i)
    {
        if (A[i] != B[i])
        {
            return -2;
        }
    };

    for (int i = 0; i < N; ++i)
    {
        if (A[i] == key)
        {
            return i;
        }
    };

    return -1;
}

int main()
{
    int A[5] = {1, 2, 3, 4, 5};
    int B[5] = {};

    for (int i = 0; i < 5; ++i)
    {
        B[i] = A[i];
    }

    B[1] = 'a';
    B[4] = true;

    // for (int i = 0; i < 5; ++i)
    // {
    //     std::cout << "A[" << i << "] = " << A[i] << ";\n";
    //     std::cout << "B[" << i << "] = " << B[i] << ";\n";
    // }

    std::cout << R1(4, A, B, 5) << std::endl;

    return 0;
}