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
            if (*(Arr + (h + j) % (N * N)) == -1)
            {
                *(Arr + (h + j) % (N * N)) = i;
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
    int n = 5;
    int a = 3;
    int b = 3;

    // Allocate the dynamic memmory
    int *A = new int[n];
    int *B = new int[n * n];

    *A = 7;
    *(A + 1) = 5;
    *(A + 2) = 6;
    *(A + 3) = 7;
    *(A + 4) = 9;

    for (int i = 0; i < n * n; ++i)
    {
        *(B + i) = -1;
    }

    // Hashing2
    for (int i = 0; i < n; ++i)
    {
        int h = (a * A[i] + b) % (n * n);
        for (int j = 0; j < n * n; ++j)
        {
            if (*(B + (j + h) % (n * n)) == -1)
            {
                *(B + (j + h) % (n * n)) = i;
                break;
            }
        }
    }

    for (int i = 0; i < n; ++i)
    {
        std::cout << "A[" << i << "] = " << A[i] << ";\n";
    }
    std::cout << "*****************************\n";
    for (int i = 0; i < n * n; ++i)
    {
        std::cout << "B[" << i << "] = " << B[i] << ";\n";
    }

    std::cout << R1Hash(9, A, B, a, b, n) << ";\n";

    return 0;
}