#include "OrderTypeSubsection.h"

#include <iostream>

OrderTypeSubsection::OrderTypeSubsection() : _minPrice(0),
                                             _maxPrice(0),
                                             _avgPrice(0),
                                             _orderCount(0),
                                             _orderList(){};

/** Function to add new order to the order subsection list
 * @param order order object that will be added
 * */
void OrderTypeSubsection::addOrder(Order order)
{
    // Add order object to the vector
    _orderList.push_back(order);
};

/** Function to get the vector of all orders of this ordertype
 * @return vector of all orders
 */
std::vector<Order> OrderTypeSubsection::getOrders()
{
    return _orderList;
}

/** List all available orders */
void OrderTypeSubsection::listOrders()
{
    for (const Order order : _orderList)
    {
        std::cout << order.price
                  << "\n"
                  << std::endl;
    }
};

/** Function to transform string to Ordertype object */
OrderType OrderTypeSubsection::strToOrdertype(std::string str)
{
    if (str == "bid")
    {
        return OrderType::bid;
    }
    if (str == "ask")
    {
        return OrderType::ask;
    }
    return OrderType::unknown;
}