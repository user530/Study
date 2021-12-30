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
        std::cout << "Day: " << dayStr << " {\n";
        dayData.printDayPage();
        std::cout << "}\n";
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
double Orderbook::getMin(std::string day, std::string time, std::string product, const OrderType &ordertype)
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
double Orderbook::getMax(std::string day, std::string time, std::string product, const OrderType &ordertype)
{
    // Try to get requested info
    return _orderbook[day]
        .getTimestampPage(time)
        .getProductPage(product)
        .getOrdertypePage(ordertype)
        .getMax();
};

/** Get average order price for the requested product in the current day-time
 * @param day string representation of the day
 * @param time string representation of the timestamp
 * @param product string representation of the product
 * @param ordertype reference to the ordertype object
 * @return Average price of the order with specified params
 * */
double Orderbook::getAvg(std::string day, std::string time, std::string product, const OrderType &ordertype)
{
    // Try to get requested info
    return _orderbook[day]
        .getTimestampPage(time)
        .getProductPage(product)
        .getOrdertypePage(ordertype)
        .getAvg();
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
    auto date1 = getAllDatetime().begin();

    // Prepare pair
    std::pair<std::string, std::string> dateTime(date1->first,
                                                 (date1->second)[0]);
    return dateTime;
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