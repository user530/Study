#include <iostream>
#include <cmath>

int Find(int key, int B[], int M, int j)
{
    for (int i = 0; i < M; ++i)
    {
        if (B[i] == key)
        {
            return j + 2 * i;
        }
    };
    return -1;
};

int RecFind(int key, int B[], int M, int j, int i)
{
    if (i >= M)
    {
        return -1;
    };

    if (B[i] == key)
    {
        return j + 2 * i;
    };

    return RecFind(key, B, M, j, i + 1);
};

int main()
{
    int A[9] = {7, 5, 6, 3, 2, 1, 4, 8, 9};

    int A1[5], A2[4];

    for (int i = 0; i < 9; ++i)
    {
        if (i % 2 == 0)
        {
            A1[i / 2] = A[i];
        }
        else
        {
            A2[(i - 1) / 2] = A[i];
        }
    }

    // std::cout << Find(7, A1, 5, 0) << "\n";
    // std::cout << Find(7, A2, 4, 1) << "\n";

    // std::cout << RecFind(8, A1, 5, 0, 0) << "\n";
    // std::cout << RecFind(8, A2, 4, 1, 0) << "\n";

    std::cout << ceil(4.2) << std::endl;
    std::cout << floor(4.2) << std::endl;

    return 0;
}
