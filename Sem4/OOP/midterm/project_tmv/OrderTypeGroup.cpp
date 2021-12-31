#include "OrdertypeGroup.h"

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