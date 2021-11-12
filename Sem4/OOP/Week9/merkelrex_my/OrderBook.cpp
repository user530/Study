#include "OrderBook.h"
#include "csvReader.h"
#include <map>
#include <algorithm>

/** Construct, reading a csv file */
OrderBook::OrderBook(std::string _fileName)
{
    orders = CSVReader::readCSV(_fileName);
};

/** Return vector of all known products in the dataset*/
std::vector<std::string> OrderBook::getKnownProducts()
{
    std::vector<std::string> products;
    std::map<std::string, bool> prodMap;

    // Create product map from orders
    for (const OrderBookEntry &entry : orders)
    {
        prodMap[entry.product] = true;
    }

    // Flatten map into vector
    for (const std::pair<std::string, bool> &productPair : prodMap)
    {
        products.push_back(productPair.first);
    }

    return products;
};

/** Return vector of all order book entries that match type, product and timestamp */
std::vector<OrderBookEntry> OrderBook::getOrders(OrderBookType _type,
                                                 std::string _product,
                                                 std::string _timestamp)
{
    std::vector<OrderBookEntry> filtered_orders;
    for (const OrderBookEntry &entry : orders)
    {
        // Iterate over all orders and collect all that match arguments
        if (entry.orderType == _type &&
            entry.product == _product &&
            entry.timestamp == _timestamp)
        {
            filtered_orders.push_back(entry);
        }
    }
    return filtered_orders;
};

double OrderBook::getHighPrice(std::vector<OrderBookEntry> &orders)
{
    double max = orders[0].price;

    // Itterate over the orders and return the maximum price
    for (const OrderBookEntry &order : orders)
    {
        if (order.price > max)
        {
            max = order.price;
        }
    }

    return max;
};

double OrderBook::getLowPrice(std::vector<OrderBookEntry> &orders)
{
    double min = orders[0].price;

    // Itterate over the orders and return the minimal price
    for (const OrderBookEntry &order : orders)
    {
        if (order.price < min)
        {
            min = order.price;
        }
    }

    return min;
};

double OrderBook::getSpread(double &askPrice, double &bidPrice)
{
    // Check that arguments are valid and return spread, else throw and error
    if (askPrice >= bidPrice)
    {
        return (askPrice - bidPrice);
    }
    else
    {
        throw std::invalid_argument("High price can't be lower than low price...");
    }
};

std::string OrderBook::getEarliestTime()
{
    // We assume that orders sorted in ascending order
    return orders[0].timestamp;
};

std::string OrderBook::getNextTime(std::string timestamp)
{
    std::string nextTimeStamp = "";

    // Itterate over entries and select the next one that is greater than argument
    // (!) Assuming that the entries are sorted in ascending order based on time
    for (const OrderBookEntry &entry : orders)
    {
        if (entry.timestamp > timestamp)
        {
            nextTimeStamp = entry.timestamp;
            break;
        }
    }

    // Check that this is the last stamp, wrap it around
    if (nextTimeStamp == "")
    {
        nextTimeStamp = orders[0].timestamp;
    }

    return nextTimeStamp;
};

void OrderBook::insertOrder(OrderBookEntry &order)
{
    // First, we insert and order into the back of the order book
    orders.push_back(order);

    // Sorting the entry, so the user order is in the right position
    std::sort(orders.begin(),
              orders.end(),
              OrderBookEntry::compareByTimestamp);
};

std::vector<OrderBookEntry> OrderBook::matchAsksToBids(std::string product, std::string timestamp)
{
    // Two variables holding all asks and bids for the product in required timestamp
    std::vector<OrderBookEntry> asks = OrderBook::getOrders(OrderBookType::ask, product, timestamp);
    std::vector<OrderBookEntry> bids = OrderBook::getOrders(OrderBookType::bid, product, timestamp);

    // Variable for all deals that will take place
    std::vector<OrderBookEntry> sales;

    // Sort asks in ascending order
    std::sort(asks.begin(), asks.end(), OrderBookEntry::compareByPriceAsc);

    // Sort bids in descending order
    std::sort(bids.begin(), bids.end(), OrderBookEntry::compareByPriceDesc);

    // We iterate over asks...
    for (OrderBookEntry &ask : asks)
    {
        // Skip "ghost" asks
        if (ask.amount == 0)
            continue;

        // ...and compare them to bids. Lowest ask to a highest bid
        for (OrderBookEntry &bid : bids)
        {
            // Skip "ghost" bids
            if (bid.amount == 0)
                continue;

            // If prices match...
            if (ask.price <= bid.price)
            {
                // Create new entry for the deal
                OrderBookEntry sale{
                    ask.price, //The price of the deal is equal to one asked, not the one offered by the bidder
                    0,
                    timestamp,
                    product,
                    OrderBookType::ask};

                // As for amount, we check ask and bid
                // If they match perfectly
                if (ask.amount == bid.amount)
                {
                    // set the deal amount
                    sale.amount = ask.amount;
                    // register the deal
                    sales.push_back(sale);
                    // clear the bid
                    bid.amount = 0;
                    // switch to the next ask
                    break;
                }

                if (ask.amount < bid.amount)
                {
                    // set the deal amount
                    sale.amount = ask.amount;
                    // register deal
                    sales.push_back(sale);
                    // update the bid amount
                    bid.amount = bid.amount - ask.amount;
                    // switch to the next ask
                    break;
                }

                // else, we imply that ask amount > bid amount, so...

                // set the deal amount
                sale.amount = bid.amount;
                // register the deal
                sales.push_back(sale);
                // update the ask and bid amounts
                ask.amount = ask.amount - bid.amount;
                bid.amount = 0;
                // switch to the next bid
                continue;
            }
        }
    }

    return sales;
};
