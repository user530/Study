#include "DayData.h"

DayData::DayData(){};

/** Function to add new product page to the timestamp page
 * @param timestamp timestamp name to store associated data
 * @param timeOrders group object that holds orders from the same timestamp
 * */
void DayData::addTimestampPage(std::string timestamp, TimestampPage timeOrders)
{
    //  Insert selected timestampPage associated with the given timestamp
    _dailyOrders.insert({timestamp, timeOrders});
};

/** Print timestamp page and all its content */
void DayData::printDayPage()
{
    for (auto [timestamp, timeOrders] : _dailyOrders)
    {
        std::cout << "  Timestamp: " << timestamp << " {\n";
        timeOrders.printTimestampPage();
        std::cout << "  }" << std::endl;
    }
};

int main()
{
    Order ord1{10, 1};
    Order ord2{5, 8};
    Order ord3{8, 1};
    Order ord4{89, 23};
    Order ord5{14, 0.9};
    Order ord6{25.2, 151.777};
    OrdertypeGroup bid;
    OrdertypeGroup bid2;
    OrdertypeGroup ask;
    OrdertypeGroup bid3;
    OrdertypeGroup ask2;
    OrdertypeGroup ask3;
    bid.addOrder(ord1);
    ask.addOrder(ord2);
    bid2.addOrder(ord3);
    bid3.addOrder(ord4);
    ask2.addOrder(ord5);
    ask3.addOrder(ord6);
    ProductPage ETH;
    ProductPage BTC;
    ProductPage DOGE;
    ProductPage LUN;
    ETH.addOrdertypeGroup(OrderType::bid, bid);
    ETH.addOrdertypeGroup(OrderType::ask, ask);
    BTC.addOrdertypeGroup(OrderType::bid, bid2);
    DOGE.addOrdertypeGroup(OrderType::bid, bid3);
    LUN.addOrdertypeGroup(OrderType::ask, ask2);
    DOGE.addOrdertypeGroup(OrderType::ask, ask3);
    TimestampPage time1;
    TimestampPage time2;
    TimestampPage time3;
    time1.addProductPage("ETH", ETH);
    time1.addProductPage("BTC", BTC);
    time2.addProductPage("DOGE", DOGE);
    time3.addProductPage("LUN", LUN);
    DayData day1;
    day1.addTimestampPage("11:57:30.328127", time1);
    day1.addTimestampPage("11:57:35.328127", time2);
    day1.addTimestampPage("11:57:40.328127", time3);
    day1.printDayPage();
}