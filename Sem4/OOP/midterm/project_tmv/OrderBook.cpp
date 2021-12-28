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

int main()
{
    // CSVReader::transformCSV("20200601.csv");
    Orderbook book{"testData.csv"};
    // book.printOrderbook();
    std::cout << "Min: "
              << book.getDayPage("2020/06/03")
                     .getTimestampPage("12:57:30.328127")
                     .getProductPage("ETH/BTC")
                     .getOrdertypePage("bid")
                     .getMin()
              << '\n'
              << "Max: "
              << book.getDayPage("2020/06/03")
                     .getTimestampPage("12:57:30.328127")
                     .getProductPage("ETH/BTC")
                     .getOrdertypePage("bid")
                     .getMax()
              << '\n'
              << "Avg: "
              << book.getDayPage("2020/06/03")
                     .getTimestampPage("12:57:30.328127")
                     .getProductPage("ETH/BTC")
                     .getOrdertypePage("bid")
                     .getAvg()
              << '\n';
}