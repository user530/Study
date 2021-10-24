#include <iostream>
#include <string>

int main()
{
    enum OrderBookType
    {
        bid,
        ask
    };

    // ===========================CLASS 1===========================
    class OrderBookClass1
    {
    public:
        // Constructor
        OrderBookClass1(
            double price,
            double amount,
            std::string timestamp,
            std::string product,
            OrderBookType orderType)
        {
            this->price = price;
            this->amount = amount;
            this->timestamp = timestamp;
            this->product = product;
            this->orderType = orderType;
        }
        // Data members
        double price;
        double amount;
        std::string timestamp;
        std::string product;
        OrderBookType orderType;
    };

    // Type 1 instantiation
    OrderBookClass1 order1{0.02187308, 7.44564869, "2020 / 03 / 17 17 : 01 : 24.884492", "ETH / BTC", OrderBookType::bid};

    std::cout << "The price1 is - " << order1.price << std::endl;

    // ===========================CLASS 2===========================
    class OrderBookClass2
    {
    public:
        // Constructor
        OrderBookClass2(double _price,
                        double _amount,
                        std::string _timestamp,
                        std::string _product,
                        OrderBookType _orderBookType)
        {
            price = _price;
            amount = _amount;
            timestamp = _timestamp;
            product = _product;
            orderBookType = _orderBookType;
        }
        // Data members
        double price;
        double amount;
        std::string timestamp;
        std::string product;
        OrderBookType orderBookType;
    };

    // Type 2 instantination
    OrderBookClass2 order2{0.02187307, 3.467434, "2020/03/17 17:01:24.884492", "ETH/BTC", OrderBookType::bid};

    std::cout << "The price2 is - " << order2.price << std::endl;

    // ===========================CLASS 3===========================
    class OrderBookClass3
    {
    public:
        // Constructor
        OrderBookClass3(
            double _price,
            double _amount,
            std::string _timestamp,
            std::string _product,
            OrderBookType _orderType)

            // Member initialization list!

            : price(_price),
              amount(_amount),
              timestamp(_timestamp),
              product(_product),
              orderType(_orderType)
        {
        }

        // Data members
        double price;
        double amount;
        std::string timestamp;
        std::string product;
        OrderBookType orderType;
    };

    // Type 3 instantiation
    OrderBookClass3 order3{0.02187305, 6.85567013, "2020/03/17 17:01:24.884492", "ETH/BTC", OrderBookType::bid};

    std::cout
        << "The price3 is - " << order3.price << std::endl;

    return 0;
}