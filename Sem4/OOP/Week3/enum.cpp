#include <iostream>
#include <string>
#include <vector>

int main()
{
    enum class OrderBookType
    {
        bid,
        ask
    };

    std::string timestamp{"2020 / 03 / 17 17 : 01 : 24.884492"};
    std::string product{"ETH / BTC"};
    OrderBookType orderType{OrderBookType::bid};
    double price = 0.02187308;
    double amount = 7.44564869;

    std::cout << static_cast<int>(orderType) << std::endl;

    return 0;
}