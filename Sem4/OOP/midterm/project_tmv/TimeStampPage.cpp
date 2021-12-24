#include "TimestampPage.h"

/** Timestamp page constructor, holds several product pages */
TimestampPage::TimestampPage(){};

/** Function to add new product page to the timestamp page
 * @param prodName product name to store associated data
 * @param prodPage group object that holds related orders
 * */
void TimestampPage::addProductPage(std::string prodName, ProductPage prodPage)
{
    //  Insert selected productPage associated with the given name
    _timedOrders.insert({prodName, prodPage});
};

/** Print timestamp page and all its content */
void TimestampPage::printTimestampPage()
{
    // Iterate over all products
    for (auto [prodName, prodPage] : _timedOrders)
    {
        std::cout << "      Product page: " << prodName << " {\n";
        prodPage.printProductPage();
        std::cout << "      }" << std::endl;
    }
};

int main()
{
    Order ord1{10, 1};
    Order ord2{5, 8};
    Order ord3{8, 1};
    OrdertypeGroup bid;
    OrdertypeGroup bid2;
    OrdertypeGroup ask;
    bid.addOrder(ord1);
    ask.addOrder(ord2);
    bid2.addOrder(ord3);
    ProductPage ETH;
    ProductPage BTC;
    ETH.addOrdertypeGroup(OrderType::bid, bid);
    ETH.addOrdertypeGroup(OrderType::ask, ask);
    BTC.addOrdertypeGroup(OrderType::bid, bid2);
    TimestampPage time1;
    time1.addProductPage("ETH", ETH);
    time1.addProductPage("BTC", BTC);
    time1.printTimestampPage();
}