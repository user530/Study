#include <iostream>

int R1Hash(int key, int A[], int B[], int a, int b, int N)
{
    int *Arr = new int[N * N];
    for (int i = 0; i < N * N; ++i)
    {
        *(Arr + i) = -1;
    }

    for (int i = 0; i < N; ++i)
    {
        int h = (a * A[i] + b) % (N * N);
        for (int j = 0; j < N; ++j)
        {
            if (*(Arr + h + j) == -1)
            {
                *(Arr + h + j) = i;
                break;
            }
        }
    }

    for (int i = 0; i < N * N; ++i)
    {
        // std::cout << "B[" << i << "] = " << B[i] << ";\n";
        // std::cout << "Arr[" << i << "] = " << *(Arr + i) << ";\n";
        if (B[i] != *(Arr + i))
        {
            return -2;
        }
    }

    for (int i = 0; i < N; ++i)
    {
        if ((A[i]) == key)
        {
            return i;
        }
    }

    return -1;
};

int main()
{
    // Length of the array
    int n = 3;

    // Allocate the dynamic memmory
    int *A = new int[n];
    int *B = new int[n * n];

    *A = 7;
    *(A + 1) = 5;
    *(A + 2) = 6;

    for (int i = 0; i < n * n; ++i)
    {
        *(B + i) = -1;
    }

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

    std::cout << R1Hash(5, A, B, 3, 1, n) << ";\n";

    return 0;
}