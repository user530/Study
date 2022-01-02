#include "OrdertypeGroup.h"
#include <algorithm>

/** Ordertype group constructor, holds list of all orders and group information */
OrdertypeGroup::OrdertypeGroup() : _minPrice(999999999),
                                   _maxPrice(0),
                                   _avgPrice(0),
                                   _ttlVolume(0),
                                   _orderCount(0),
                                   _orderList(){};

/** Function to add new order to the order type group and update group information
 * @param order order object that will be added
 * */
void OrdertypeGroup::addOrder(const Order &order)
{
    // Add order object to the vector
    _orderList.push_back(order);
    // Update OrderTypeGroup information based on the new order
    updateGroupInfo(order.price, order.amount);
};

/** Updates OrderTypeGroup information(min,max,avg,etc) based on the new order
 *  @param orderPrice price of the new order
 *  @param orderAmount amount of the new order
 * */
void OrdertypeGroup::updateGroupInfo(const double orderPrice, const double orderAmount)
{
    // Check for the new min
    if (orderPrice < _minPrice)
    {
        // If so, update min price
        _minPrice = orderPrice;
    }

    // Check for the new max
    if (orderPrice > _maxPrice)
    {
        // If so, update max price
        _maxPrice = orderPrice;
    }

    // Update avg price
    _avgPrice = (_avgPrice * _ttlVolume + orderPrice * orderAmount) /
                (_ttlVolume + orderAmount);

    // Update total
    _ttlVolume += orderAmount;

    // Update order count
    ++_orderCount;
}

/** Print information about all order from the list */
void OrdertypeGroup::printGroup()
{
    // Iterate over all orders
    for (const Order &ord : _orderList)
    {
        // Print order information
        std::cout << "              Order price: " << ord.price << "; "
                  << "Order amount: " << ord.amount << ".\n";
    }
};

/** Function to get minimum price of the OrderTypeGroup */
double OrdertypeGroup::getMin()
{
    return _minPrice;
};

/** Function to get maximum price of the OrderTypeGroup */
double OrdertypeGroup::getMax()
{
    return _maxPrice;
};

/** Function to get average price of the OrderTypeGroup */
double OrdertypeGroup::getAvg()
{
    return _avgPrice;
};

/** Function to get total volume of the OrderTypeGroup */
double OrdertypeGroup::getTtlVol()
{
    return _ttlVolume;
};

/** Function to convert string into OrderType datatype
 * @param ordtpStr order type string
 * @return order type object
 */
OrderType OrdertypeGroup::strToOrdertype(const std::string ordtpStr)
{
    if (ordtpStr == "bid")
    {
        return OrderType::bid;
    }
    if (ordtpStr == "ask")
    {
        return OrderType::ask;
    }
    return OrderType::unknown;
};

/** Compare two orders by price - ascending order
 * @param ord1 first order object
 * @param ord2 second order object
 * @param true true if price of the first order is lower, false otherwise
 */
bool OrdertypeGroup::priceCompAsc(Order &ord1, Order &ord2)
{
    return ord1.price < ord2.price;
};

/** Compare two orders by price - descending order
 * @param ord1 first order object
 * @param ord2 first order object
 * @param true true if price of the first order is higher, false otherwise
 */
bool OrdertypeGroup::priceCompDes(Order &ord1, Order &ord2)
{
    return ord1.price > ord2.price;
};

/** Sort order list in ascending order (based on price) */
void OrdertypeGroup::sortOrdPrAsc()
{
    _orderList.sort(priceCompAsc);
};

/** Sort order list in descending order (based on price) */
void OrdertypeGroup::sortOrdPrDes()
{
    _orderList.sort(priceCompDes);
};

/** Erase first order from the order list */
void OrdertypeGroup::eraseFirstOrd()
{
    // Update OrdGrp data: max, min, avg, etc!
    _orderList.pop_front();
};

/** Erase last order from the order list */
void OrdertypeGroup::eraseLastOrd()
{
    // Update OrdGrp data: max, min, avg, etc!
    _orderList.pop_back();
};

OrdertypeGroup *OrdertypeGroup::getMaxPriceContainer(std::vector<OrdertypeGroup *> ordTypePages)
{
    // Declare first page as maximum page, set address to the maxPage
    OrdertypeGroup *maxPage = ordTypePages[0];

    std::cout << "First max page price - " << (*maxPage)._maxPrice << "\n";

    // Iterate over all pages, starting from the second
    for (int i = 1; i < ordTypePages.size(); ++i)
    {

        std::cout << "Comparing max to order with price - " << (*ordTypePages[i])._maxPrice << "...\n";

        // If selected page has price value bigger than current maximum page
        if ((*ordTypePages[i])._maxPrice > (*maxPage)._maxPrice)
        {
            // Max page address set to the selected page
            maxPage = ordTypePages[i];

            std::cout << "New max page is set!\n";
        }
    }

    std::cout << "Final max page price is " << (*maxPage)._maxPrice << ", amount " << (*maxPage)._ttlVolume << "\n";

    return maxPage;
};