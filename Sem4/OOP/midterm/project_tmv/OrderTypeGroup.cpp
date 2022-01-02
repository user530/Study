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
    updateMetaAdd(order.price, order.amount);
};

/** Updates OrderTypeGroup information(min,max,avg,etc) based on the new order
 *  @param orderPrice price of the new order
 *  @param orderAmount amount of the new order
 * */
void OrdertypeGroup::updateMetaAdd(const double orderPrice, const double orderAmount)
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

/** Update meta info when order is reduced
 * @param grpPage container that holds order
 * @param price price of the order
 * @param amount amount of the order
 */
void OrdertypeGroup::updateMetaReduce(const double price,
                                      const double amount)
{
    // Update average price
    _avgPrice = ((_avgPrice * _ttlVolume) - (price * amount)) /
                (_ttlVolume - amount);
    // Update total volume
    _ttlVolume -= amount;
};

/** Update meta info when order is erased
 * @param grpPage container that holds order
 * @param price price of the order
 * @param amount amount of the order
 * @param ordType order type of the group that holds order
 */
void OrdertypeGroup::updateMetaErase(const double price,
                                     const double amount,
                                     const OrderType &ordType)
{
    // Index of the first element
    auto ind = _orderList.begin();

    // If element completly erased we need to set new min or max
    // Because when we match them, they are already sorted we can set new min or max
    // Bids are sorted in descending order, and asks in ascending
    if (ordType == OrderType::bid)
    {
        // Next max price -> price of the next element
        _maxPrice = std::next(ind)->price;
    }
    else if (ordType == OrderType::ask)
    {
        // Next min price -> price of the next element
        _minPrice = std::next(ind)->price;
    }
    else
    {
        std::cerr << "OrdertypeGroup::updateMetaErase - Error! Wrong ordType argument!\n";
        throw;
    }
    // Update avg price and total amount
    updateMetaReduce(price, amount);
    // Update order count
    --_orderCount;
};

/** Get the address of the object that holds order with maximum price
 * @param ordTypePages vector of addresses to ordertype groups
 * @return address to the ordertype group with highest price order
 */
OrdertypeGroup *OrdertypeGroup::getMaxPriceContainer(std::vector<OrdertypeGroup *> ordTypePages)
{
    // Declare first page as maximum page, set address to the maxPage
    OrdertypeGroup *maxPage = ordTypePages[0];

    // Iterate over all pages, starting from the second
    for (int i = 1; i < ordTypePages.size(); ++i)
    {
        // If selected page has price value bigger than current maximum page
        if ((*ordTypePages[i])._maxPrice > (*maxPage)._maxPrice)
        {
            // Max page address set to the selected page
            maxPage = ordTypePages[i];
        }
    }

    // Return the address to the Ordertype group that holds maximum value
    return maxPage;
};

/** Get the address of the object that holds order with minimum price
 * @param ordTypePages vector of addresses to ordertype groups
 * @return address to the ordertype group with lowest price order
 */
OrdertypeGroup *OrdertypeGroup::getMinPriceContainer(std::vector<OrdertypeGroup *> ordTypePages)
{
    // Declare first page as minimum page page, set address to the minPage
    OrdertypeGroup *minPage = ordTypePages[0];

    // Iterate over all pages, starting from the second
    for (int i = 1; i < ordTypePages.size(); ++i)
    {
        // If selected page has price value smaller than current minimum page
        if ((*ordTypePages[i])._minPrice < (*minPage)._minPrice)
        {
            // Min page address set to the selected page
            minPage = ordTypePages[i];
        }
    }

    // Return the address to the Ordertype group that holds minimum value
    return minPage;
};