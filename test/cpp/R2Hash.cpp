#include <iostream>
#include <math.h>

int R2Hash(int key, int A[], int A1[], int A2[], int A3[], int N)
{
    int *hashArr[6];

    for (int i = 0; i < 3; ++i)
    {
        hashArr[2 * i] = new int[3]{-1, -1, -1};
        hashArr[2 * i + 1] = 0;
    }

    for (int i = 0; i < 6; ++i)
    {
        if (i % 2 == 0)
        {
            for (int j = 0; j < 3; ++j)
            {
                std::cout << "The value at adress " << i << "-" << j << " is equal to " << *(hashArr[i] + j) << ";\n";
            }
        }
        else
        {
            std::cout << "The value at adress " << i << " is equal to " << *(hashArr[i]) << ";\n";
        }
    }
    return -1;
}

int main()
{
    // int n = 5;
    // int *A = new int[n];
    // int *B = new int[n];

    // std::cout << "Please, enter " << n << " numbers.\n";
    // for (int i = 0; i < n; ++i)
    // {
    //     std::cout << "Enter value to the position " << i + 1 << "...\n";
    //     std::cin >> *(A + i);
    // }

    // for (int i = 0; i < n; ++i)
    // {
    //     std::cout << "A[" << i << "] = " << A[i] << ";\n";
    // }
    int A[3] = {14, 5, 2};
    int B[6] = {9, 0, 4, 1, 5, 0};
    int C[6] = {9, 0, 4, 1, 5, 0};
    int D[6] = {3, 2, 1, 1, 1, 0};

    std::cout << R2Hash(6, A, B, C, D, 3);

    return 0;
}