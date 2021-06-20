#include <iostream>

int R1Hash(int key, int A[], int B[], int a, int b, int N)
{

    return -1;
};

int main()
{
    // Length of the array
    int n = 3;

    // Allocate the dynamic memmory
    int *A = new int[n];
    int *B = new int[n * n];
    // Fill the array with values
    // for (int i = 0; i < n; ++i)
    // {
    //     *(A + i) = 10 - i;
    // }
    *A = 7;
    *(A + 1) = 5;
    *(A + 2) = 7;
    for (int i = 0; i < n * n; ++i)
    {
        *(B + i) = -1;
    }
    // Hashing1
    // for (int i = 0; i < n; ++i)
    // {
    //     *(B + (3 * A[i] + 1) % 9) = i;
    // }

    // Hashing2
    for (int i = 0; i < n; ++i)
    {
        for (int j = 0; j < n * n; ++j)
        {
            if (*(B + j + (3 * A[i] + 1) % 9) == -1)
            {
                *(B + j + (3 * A[i] + 1) % 9) = i;
                break;
            }
        }
    }

    // Print values
    for (int i = 0; i < n; ++i)
    {
        std::cout << "A[" << i << "] = " << A[i] << ";\n";
    }

    std::cout << "-------------------------\n";

    for (int i = 0; i < n * n; ++i)
    {
        std::cout << "B[" << i << "] = " << B[i] << ";\n";
    }

    return 0;
}