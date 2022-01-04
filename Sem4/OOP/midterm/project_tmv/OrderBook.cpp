#include "OrderBook.h"
#include "CSVReader.h"

/** Create orderbook from the contents of the CSV file
 * @param fileName filename of the CSV file
 */
Orderbook::Orderbook(const std::string fileName)
{
    _orderbook = CSVReader::transformCSV(fileName);
};

/** Get container stored at specified day key
 * @param dayStr string for the day name
 * @return reference to the daydata object
 */
DayData &Orderbook::getDayPage(const std::string dayStr)
{
    // Try to get requested day page
    try
    {
        return _orderbook.at(dayStr);
    }
    // If there is no page available
    catch (const std::exception &e)
    {
        // Report error
        std::cerr << "Orderbook::getDayPage - Error! Can't find requested page! ("
                  << e.what() << ").\n";
        throw;
    }
};

/* Prints whole orderbook */
void Orderbook::printOrderbook()
{
    // Iterate over all days
    for (auto &[dayStr, dayData] : _orderbook)
    {
        // Print day page information
        std::cout << "Date: " << dayStr << " {\n";
        dayData.printDayPage();
        std::cout << "  }\n";
    }
};

/** Function to get all known products in orderbook
 * @return vector of strings - all existing products from the orderbook
 * */
std::set<std::string> Orderbook::getAllProducts()
{
    // All products from this orderbook
    std::set<std::string> products;

    // Iterate over all day pages
    for (auto &[dayStr, dayGrp] : _orderbook)
    {
        // For each day page, get all products and add them to the resulting set
        products.merge(dayGrp.getDayProducts());
    }

    // Return the products list
    return products;
};

/** Get minimum order price for the requested product in the current day-time
 * @param day string representation of the day
 * @param time string representation of the timestamp
 * @param product string representation of the product
 * @param ordertype reference to the ordertype object
 * @return Minimal price of the order with specified params
 * */
double Orderbook::getCurMin(const std::string day,
                            const std::string time,
                            const std::string product,
                            const OrderType &ordertype)
{
    // Try to get requested info
    return _orderbook[day]
        .getTimestampPage(time)
        .getProductPage(product)
        .getOrdertypePage(ordertype)
        .getMin();
};

/** Get maximum order price for the requested product in the current day-time
 * @param day string representation of the day
 * @param time string representation of the timestamp
 * @param product string representation of the product
 * @param ordertype reference to the ordertype object
 * @return Maximum price of the order with specified params
 * */
double Orderbook::getCurMax(const std::string day,
                            const std::string time,
                            const std::string product,
                            const OrderType &ordertype)
{
    // Try to get requested info
    return _orderbook[day]
        .getTimestampPage(time)
        .getProductPage(product)
        .getOrdertypePage(ordertype)
        .getMax();
};

/** Get average price for specified product across several timestamps */
double Orderbook::getRangeAvg(const std::string prod,
                              const OrderType &OTP,
                              const unsigned int steps)
{
    // Counter variable
    unsigned int i = 1;

    // Result variable
    double result = 0;

    // Variable to collect total orders amount
    double totalAmount = 0;

    // Iterate over orderbook
    for (auto &[dayStr, dayPage] : _orderbook)
    {
        // Iterate over all timestams from the date
        for (auto &[timeStr, timePage] : dayPage.getDailyOrders())
        {
            // Check that requested product exists in this timestamp
            if (timePage.checkProductPage(prod))
            {
                // For this timestamp check requested order type
                if (timePage.getProductPage(prod).checkOrdertypePage(OTP))
                {
                    // Orders container
                    OrdertypeGroup orders = timePage.getProductPage(prod).getOrdertypePage(OTP);

                    // Sum up total value
                    result += orders.getAvg() * orders.getTtlVol();

                    // Sum up total number of order
                    totalAmount += orders.getTtlVol();
                }
            }

            // Stop if counter reach the timestamp limit
            if (i == steps)
            {
                // If there are were at least one order -> return average, else return 0
                return totalAmount != 0 ? result / totalAmount : 0;
            }

            // Increment counter for each passed stamp
            ++i;
        }
    }
    return 0;
};

/** Predict requested order price for the next period
 * @param extrema requested price extrema to predict - min or max
 * @param prod string representation of the product
 * @param OTP reference to the ordertype object
 * @param extrema current time pair: date - first, timestamp - second
 * @return prediction for the requested price
 */
double Orderbook::getPrediction(const std::string extrema,
                                const std::string prod,
                                const OrderType &OTP,
                                const std::pair<std::string, std::string> curDateTime)
{
    /* To be honest I'm didn't find how moving weighted average should work
    if there is empty period inside, so I decided to add weight based not on the time lag
    but increase weight for each non-empty period. It's also works fine if there is no
    gaps in data */

    // Result variable
    double predict = 0;

    // Period weight
    unsigned int perWeight = 0;

    // Iterate over all days
    for (auto &[dayStr, dayPage] : _orderbook)
    {
        // Iterate over all timestamps
        for (auto &[timeStr, timePage] : dayPage.getDailyOrders())
        {
            // Check that requested product exists in this timestamp
            if (timePage.checkProductPage(prod))
            {
                // For this timestamp check requested order type
                if (timePage.getProductPage(prod).checkOrdertypePage(OTP))
                {
                    // Orders container
                    OrdertypeGroup orders = timePage.getProductPage(prod).getOrdertypePage(OTP);

                    // Adjust weight variable for the next period
                    ++perWeight;

                    // Add requested period price multiplied by the weight to the result
                    predict +=
                        extrema == "min" ? orders.getMin() : orders.getMax() * perWeight;
                }
            }

            // If reached current (last) timestep
            if (curDateTime.first == dayStr && curDateTime.second == timeStr)
            {
                // Return weighted moving average
                return (predict * 2) /
                       (perWeight * (perWeight + 1));
            }
        }
    }

    // If for some reason arg timestamp is out of range (and to make compiler happy)
    return 0;
};

/** Get all date-time information
 * @return Collection of pairs: date string -> set of associated timestamps(strings)
 */
std::map<std::string,
         std::vector<std::string>>
Orderbook::getAllDatetime()
{
    // Collection container
    std::map<std::string,
             std::vector<std::string>>
        dateTimes;

    // Iterate over all dates in the orderbook
    for (auto iterator = _orderbook.begin(); iterator != _orderbook.end(); ++iterator)
    {
        // Get timestamps vector for the date
        std::vector<std::string> timestamps = (iterator->second).getTimestamps();

        // Add day - timestamps pair to the collections
        dateTimes.insert({iterator->first, timestamps});
    }

    return dateTimes;
};

/** Get the number of timestamps across all the dates
 * @return number of timestamps across all days
 */
unsigned int Orderbook::getTimestepsNum()
{
    // Result variable
    unsigned int res = 0;

    // Iterate over all dates and count timestamps
    for (auto &[day, timestamps] : getAllDatetime())
    {
        res += timestamps.size();
    }

    // Return result
    return res;
};

/** Get earliest date and timestamp from the orderbook
 * @return pair of values: date -> first, timestamp -> second
 */
std::pair<std::string, std::string> Orderbook::getInitialDatetime()
{
    // Get first day - timestamps pair using iterator to select first pair
    auto date1 = getAllDatetime();

    // Prepare result
    std::pair<std::string, std::string> res;
    // Setup values
    res.first = (date1.begin())->first;
    res.second = ((date1.begin())->second)[0];

    // Return dateTime;
    return res;
};

/** Check that argument passed is exists in the book
 * @param prodArg product name string
 * @return true if product exists in the orderbook, false otherwise
 */
bool Orderbook::checkProdArg(std::string prodArg)
{
    // If product exists return 1 (true), else return 0 (false)
    return getAllProducts().count(prodArg);
};

/** Check that ordertype argument is correct
 * @param ordtypeArg ordertype to check
 * @return true if correct argument value is passed, false otherwise
 */
bool Orderbook::checkOTPArg(OrderType ordtypeArg)
{
    return (ordtypeArg != OrderType::unknown);
};

/** Check that timestamp argument is correct
 * @param timestepsArg number of timesteps for the command to handle
 * @return true if orderbook holds  requested number of periods and arg > 0, false otherwise
 */
bool Orderbook::checkTimestampArg(unsigned int timestepsArg)
{
    return (timestepsArg <= getTimestepsNum() && timestepsArg > 0);
};

/** Check that order extrema argument is correct
 * @param extremArg requested order extrema
 * @return true if corrected value is passed, false otherwise
 */
bool Orderbook::checkExtremaArg(std::string extremArg)
{
    return (extremArg == "min" || extremArg == "max");
};

/** Move to the next time stamp (OR day)
 * @param date current date string
 * @param time current timestamp string
 * @return pair of values: date and timestamp
 */
std::pair<std::string, std::string> Orderbook::nextPeriod(std::string date,
                                                          std::string time)
{
    // Get all known date-times
    std::map<std::string, std::vector<std::string>> datetimes = getAllDatetime();

    // Prepare variables to be returned
    std::string newDate, newTime;

    // Check if the timestamp is the last in the day
    if (time == datetimes[date].back())
    {
        // If day is also last one
        if (date == datetimes.rbegin()->first)
        {
            // New date is the initial one
            newDate = datetimes.begin()->first;
        }
        // There are other dates
        else
        {
            // Because maps are sorted by default -> point to the next day
            newDate = datetimes.upper_bound(date)->first;
        }

        // New timestamp is the first one
        newTime = datetimes[newDate][0];
    }
    // There are other timestamps left in this date
    else
    {
        // Date is the same
        newDate = date;
        // Iterate over timestamps
        for (unsigned int i = 0; i < datetimes[date].size(); ++i)
        {
            // Find index of the current timestamp
            if (datetimes[date][i] == time)
            {
                // New time is the next stamp
                newTime = datetimes[date][i + 1];
            }
        }
    }

    // Return new period
    return std::make_pair(newDate, newTime);
};

/** Collect adresses of the order type pages for requested product for passed date,
 * from first timestamp to current one (inclusive)
 *
 *  @param curDate current date string, will be used as search base
 *  @param curTime current timestamp string, will be used as end point
 *  @param prod required product
 *  @param OTP required ordertype
 *  @param exclusive flag, to exclude the current timestamp from the result, default false
 *  @return vector of pointers to order type group pages, that satisfy required conditions
 */
std::vector<OrdertypeGroup *> Orderbook::collectOrdTypPages(const std::string curDate,
                                                            const std::string curTime,
                                                            const std::string prod,
                                                            const OrderType &OTP)
{
    // Prepare vector of pointers
    std::vector<OrdertypeGroup *> result;

    // Get all timestamps for the current date
    std::vector<std::string> timestamps = _orderbook.at(curDate).getTimestamps();

    // Iterate over all timestamps
    for (const std::string timestamp : timestamps)
    {
        // This loop continues a lot of 'continue' cmds, so we stop when we past cur time(not when we reach)
        if (timestamp > curTime)
            break;

        // If there are no orders for requested product -> skip to the next timestamp
        if (!_orderbook.at(curDate).getTimestampPage(timestamp).checkProductPage(prod))
            continue;

        // If product page exists, but no ordertype page -> skip timestamp
        if (!_orderbook
                 .at(curDate)
                 .getTimestampPage(timestamp)
                 .getProductPage(prod)
                 .checkOrdertypePage(OTP))
            continue;

        // If requested ordertype page exists
        OrdertypeGroup &container = _orderbook
                                        .at(curDate)
                                        .getTimestampPage(timestamp)
                                        .getProductPage(prod)
                                        .getOrdertypePage(OTP);

        //  If it is not empty -> add address to the vector
        if (!container.isEmpty())
            result.push_back(&container);
    }

    // Return resulting vector
    return result;
}

/** Match all orders within required date and between initial timestamp and required one (inclusive)
 * @param date date to match orders
 * @param timestamp right limit point of the matching interval
 */
void Orderbook::matchOrders(const std::string date, const std::string timestamp)
{
    // Get all products for the current date-time
    std::set<std::string> products = _orderbook
                                         .at(date)
                                         .getTimestampPage(timestamp)
                                         .getProductKeys();

    // Iterate over every product
    for (const std::string product : products)
    {
        // Prepare pointers for bids and asks
        OrdertypeGroup *bids = nullptr;
        OrdertypeGroup *asks = nullptr;

        // Product page object
        ProductPage &prodPage = _orderbook
                                    .at(date)
                                    .getTimestampPage(timestamp)
                                    .getProductPage(product);

        // Check that bids exist
        if (prodPage.checkOrdertypePage(OrderType::bid))
        {
            // Bid page object
            OrdertypeGroup &bidPage = _orderbook
                                          .at(date)
                                          .getTimestampPage(timestamp)
                                          .getProductPage(product)
                                          .getOrdertypePage(OrderType::bid);

            // Check that ordertype page is not empty
            if (!bidPage.isEmpty())
            {
                // Set pointer to the ordertype page
                bids = &bidPage;

                // Sort bids in descending order
                (*bids).sortOrdPrDes();
            }
        }

        // Check that asks exist
        if (prodPage.checkOrdertypePage(OrderType::ask))
        {
            // Ask page object
            OrdertypeGroup &askPage = _orderbook
                                          .at(date)
                                          .getTimestampPage(timestamp)
                                          .getProductPage(product)
                                          .getOrdertypePage(OrderType::ask);

            // Check that ordertype page is not empty
            if (!askPage.isEmpty())
            {
                // Get current period bids
                asks = &_orderbook
                            .at(date)
                            .getTimestampPage(timestamp)
                            .getProductPage(product)
                            .getOrdertypePage(OrderType::ask);

                // Sort bids in ascending order
                (*asks).sortOrdPrAsc();
            }
        }

        // Prepare vector of bids to match
        auto bidsToMatch = collectOrdTypPages(date, timestamp, product, OrderType::bid);
        auto asksToMatch = collectOrdTypPages(date, timestamp, product, OrderType::ask);

        // Match if there are something to match
        if (bidsToMatch.size() != 0 && asksToMatch.size() != 0)
        {
            // Add sale orderTypeGroup to this product page if orderTypeGroup count != 0
            OrdertypeGroup sales = OrdertypeGroup::matchVectors(asksToMatch, bidsToMatch);

            // If sales have orders ->
            if (!sales.isEmpty())
            {
                // Add them to the product list
                prodPage.addOrdertypeGroup(OrderType::sale, sales);
            }
        }
    }
};

/** Print all sales from the requested period
 * @param date date of the period to check sales
 * @param timestamp timestamp of the period to check sales
 */
void Orderbook::printSales(const std::string date, const std::string timestamp)
{
    try
    {
        // Get date-time container
        TimestampPage container = _orderbook.at(date).getTimestampPage(timestamp);

        unsigned int total = 0;

        // Iterate over all product names (from this container)
        for (std::string prodName : container.getProductKeys())
        {
            // If there is sales page
            if (container.getProductPage(prodName).checkOrdertypePage(OrderType::sale))
            {
                // Get the number of product sales
                unsigned int prodSales = container
                                             .getProductPage(prodName)
                                             .getOrdertypePage(OrderType::sale)
                                             .getOrdCnt();

                // Increase total sales number
                total += prodSales;

                // Print product sales
                std::cout
                    << "Number of sales for " << prodName
                    << " is " << prodSales << ".\n";
            }
        }

        // Print total sales
        std::cout
            << "Total number of sales for the " << date << " - " << timestamp
            << " is " << total << ".\n\n";
    }
    // Can't get requested container
    catch (const std::exception &e)
    {
        // Error msg
        std::cerr << "Can't find requested period! Please try another one.\n\n";
    }
};

/* Prepare market depth data vector as a base for a chart */
std::vector<double> Orderbook::marketDepthChart(const std::string date,
                                                const std::string product,
                                                const unsigned int steps)
{
    // Get all timestamps for the time range
    std::vector<std::string> timestamps = _orderbook.at(date).getTimestamps();

    // Prepare vector of pointers to all applicable bid group pages
    auto allBids = collectOrdTypPages(date, timestamps[steps - 1], product, OrderType::bid);

    // Prepare vector of pointers to all applicable ask group pages
    auto allAsks = collectOrdTypPages(date, timestamps[steps - 1], product, OrderType::ask);

    // If there are no data at all -> throw an error to a caller to handle
    if (allAsks.empty() && allBids.empty())
        throw(std::invalid_argument("Plot function error - Empty period, nothing to plot!"));

    // Get data about X - axis
    std::map<std::string, double> xInfo = getXinfo(allAsks, allBids);

    // If there are single order -> throw an error to a caller to handle
    if (xInfo.at("col") == 0)
        throw(std::invalid_argument("Plot function error - Single order, nothing to plot!"));

    // Calculate and return basic information about X-axis
    // std::map<double> xInfo = getXValue(date, finalStamp, product);

    // // Try to get requested datepage
    // try
    // {
    //     // Prepare vectors for bid and ask orders
    //     std::vector<double> bids, asks;

    //     // Get all timestamp pages container
    //     std::map<std::string, TimestampPage> timestamps = _orderbook.at(date)
    //                                                           .getDailyOrders();
    //     // Setup iterator
    //     auto iter = timestamps.begin();

    //     // Counter
    //     unsigned int i = 0;

    //     // Start
    //     while (i != steps)
    //     {
    //         // If there is product page in this timestamp
    //         if (iter->second.checkProductPage(product))
    //         {
    //             // Prepare product page
    //             ProductPage &prodPage = iter->second.getProductPage(product);

    //             // Check that product page include asks
    //             if (prodPage.checkOrdertypePage(OrderType::bid))
    //             {
    //                 // Iterate over orders
    //                 prodPage.getOrdertypePage(OrderType::bid);
    //             }
    //         }

    //         // Increment counter and iterator
    //         ++i;
    //         ++iter;
    //     }
    // }
    // catch (const std::exception &e)
    // {
    //     std::cerr << "Can't find" << '\n';
    // }

    return std::vector<double>{1};
};

/** Get required information about X - axis of the chart
 * @param asks vector of pointers to all suitable ask pages
 * @param bids vector of pointers to all suitable bid pages
 * @param columns number of columns in the graph (default - 120)
 * @return map containing values of "min" price, "max" price, and single column value
 */
std::map<std::string, double> Orderbook::getXinfo(std::vector<OrdertypeGroup *> &asks,
                                                  std::vector<OrdertypeGroup *> &bids,
                                                  unsigned int columns)
{
    // Declare result variable containing information about x axis
    std::map<std::string, double> xInfo;

    // Initialize price range variables
    double maxBid = 0, maxAsk = 0, minBid = 0, minAsk = 0;

    // Calculate bid spread
    std::pair<double, double> bidSpread = OrdertypeGroup::getPriceSpread(bids);

    // Set max and min values for bid
    maxBid = bidSpread.first;
    minBid = bidSpread.second;

    // Calculate ask spread
    std::pair<double, double> askSpread = OrdertypeGroup::getPriceSpread(asks);

    // Set max and min values for ask
    maxAsk = askSpread.first;
    minAsk = askSpread.second;

    // If graph has both asks and bids
    if (!asks.empty() && !bids.empty())
    {
        // Add to the result: min, max
        xInfo.insert({"min", std::min(minBid, minAsk)});
        xInfo.insert({"max", std::max(maxBid, maxAsk)});
    }
    // If graph has only bids
    else if (asks.empty())
    {
        // Add to the result: min, max
        xInfo.insert({"min", minBid});
        xInfo.insert({"max", maxBid});
    }
    // If graph has only asks
    else if (bids.empty())
    {
        // Add to the result: min, max
        xInfo.insert({"min", minAsk});
        xInfo.insert({"max", maxAsk});
    }

    // Add to the result -> value of the single column
    xInfo.insert({"col", (xInfo["max"] - xInfo["min"]) / columns});

    // Return axis info
    return xInfo;
};