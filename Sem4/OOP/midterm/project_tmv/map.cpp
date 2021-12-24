#include <iostream>
#include <map>
#include <string>
#include <vector>

int main()
{
    std::map<std::string, std::map<std::string, std::vector<int>>> object;
    std::map<std::string, std::vector<int>> product1;
    std::map<std::string, std::vector<int>> product2;

    std::vector<int> orders1;
    std::vector<int> orders2;
    orders1.push_back(1);
    orders1.push_back(2);
    orders2.push_back(99);
    orders2.push_back(98);
    product1.insert({"bid", orders1});
    product1.insert({"ask", orders2});
    object.insert({"2021/11/24", product1});

    std::vector<int> orders3;
    std::vector<int> orders4;
    orders3.push_back(3);
    orders3.push_back(4);
    orders4.push_back(50);
    orders4.push_back(60);
    product2.insert({"bid", orders3});
    product2.insert({"ask", orders4});
    object.insert({"2021/12/05", product2});

    for (auto [key, value] : object)
    {
        std::cout << "Product: " << key << std::endl;
        for (auto [key1, value1] : object[key])
        {
            std::cout << "  Order group: " << key1 << std::endl;
            for (const int elem : object[key][key1])
            {
                std::cout << "      price: " << elem << std::endl;
            }
        }
    }
}