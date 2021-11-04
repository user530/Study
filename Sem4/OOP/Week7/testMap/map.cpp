#include <iostream>
#include <map>
#include <string>

int main()
{
    std::map<std::string, unsigned long long> phonebook;

    phonebook["Pupkin Vasily"] = 801'321'1366;
    phonebook["Shmatko Viktor"] = 732'621'1190;
    phonebook["Derpko Yuri"] = 712'884'7520;
    phonebook["Zulgin Roman"] = 829'133'0982;

    // Traverse #1
    // Using pair structure
    // for (const std::pair<std::string, unsigned long long> &elem : phonebook)
    // {
    //     std::cout << "Name: " << elem.first << ", phone: " << elem.second << "\n";
    // }

    // Traverse #2
    // Structured binding example, only c++17
    for (const auto &[name, phone] : phonebook)
    {
        std::cout << "Name: " << name << ", phone: " << phone << "\n";
    }

    std::cout << std::endl;

    return 0;
}