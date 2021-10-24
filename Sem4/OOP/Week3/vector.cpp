#include <iostream>
#include <string>
#include <vector>

enum class OrderBookType
{
    bid,
    ask
};

class OrderBookEntry
{
public:
    double price;
    double amount;
    std::string timestamp;
    std::string product;
    OrderBookType ordertype;

    OrderBookEntry(double _price,
                   double _amount,
                   std::string _timestamp,
                   std::string _product,
                   OrderBookType _ordertype) : price{_price},
                                               amount{_amount},
                                               timestamp{_timestamp},
                                               product{_product},
                                               ordertype{_ordertype} {}
};

// Functions
double computeAveragePrice(std::vector<OrderBookEntry> &entries)
{
    double summ = 0.0;
    unsigned int len = entries.size();

    for (const OrderBookEntry &entrie : entries)
    {
        summ += entrie.amount;
    }

    return summ / len;
};

double computeLowPrice(std::vector<OrderBookEntry> &entries)
{
    double low = entries[0].price;
    for (const OrderBookEntry &entrie : entries)
    {
        if (entrie.price < low)
        {
            low = entrie.price;
        }
    }
    return low;
};

double computeHighPrice(std::vector<OrderBookEntry> &entries)
{
    double high = entries[0].price;
    for (const OrderBookEntry &entrie : entries)
    {
        if (entrie.price > high)
        {
            high = entrie.price;
        }
    }
    return high;
};

double computePriceSpread(std::vector<OrderBookEntry> &entries)
{
    double low = entries[0].price;
    double high = entries[0].price;

    for (const OrderBookEntry entrie : entries)
    {
        if (entrie.price > high)
        {
            high = entrie.price;
            continue;
        }
        if (entrie.price < low)
        {
            low = entrie.price;
        }
    }

    return (high - low);
};

int main()
{
    std::vector<OrderBookEntry> orders;

    orders.push_back(OrderBookEntry{0.02187308, 7.44564869, "2020/03/17 17:01:24.884492", "ETH/BTC", OrderBookType::bid});
    orders.push_back(OrderBookEntry{0.02187307, 3.467434, "2020/03/17 17:01:24.884492", "ETH/BTC", OrderBookType::bid});
    orders.push_back(OrderBookEntry{0.02187305, 6.85567013, "2020/03/17 17:01:24.884492", "ETH/BTC", OrderBookType::bid});

    // 1) Iteration with copying -> Iterate over "orders" and make copy of items as "order"
    for (const OrderBookEntry order : orders)
    {
        // std::cout << "Amount is - " << order.amount << "\n";
    };

    // 2) Iteration by reference -> Iterate over "orders" and access each item from there as "order"
    for (const OrderBookEntry &order : orders)
    {
        // std::cout << "Price is - " << order.price << "\n";
    };

    // 3) Array style iteration over vectors
    for (unsigned int i = 0; i < orders.size(); ++i)
    {
        // std::cout << "Dates is - " << orders[i].timestamp << std::endl;
    };

    // 4) Object style iteration over vectors
    for (unsigned int i = 0; i < orders.size(); ++i)
    {
        // std::cout << "Product is - " << orders.at(i).product << std::endl;
    };

    return 0;
}