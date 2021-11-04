#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

int main()
{
    std::vector<std::string> names{"Frodo", "Gandalf", "Aragon", "Samwise", "Peregrin", "Meriadoc", "Gimli", "Legolas", "Boromir", "Oro"};

    // Sort lexicographically
    std::sort(begin(names), end(names));
    std::cout << "Names sorted lexicographically:" << std::endl;
    for (const std::string &name : names)
    {
        std::cout << name << ", ";
    }
    std::cout << std::endl;

    // Sort the names by length
    std::sort(begin(names), end(names),
              [](const auto &left, const auto &right)
              {
                  return left.length() < right.length();
              });
    std::cout << "Names sorted by length:" << std::endl;
    for (const std::string &name : names)
    {
        std::cout << name << ", ";
    }
    std::cout << std::endl;

    return 0;
}