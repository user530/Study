#include "DayData.h"

DayData::DayData(){};

/** Function to add new product page to the timestamp page
 * @param timestamp timestamp name to store associated data
 * @param timeOrders group object that holds orders from the same timestamp
 * */
void DayData::addTimestampPage(const std::string timestamp, const TimestampPage &timeOrders)
{
    //  Insert selected timestampPage associated with the given timestamp
    _dailyOrders.insert({timestamp, timeOrders});
};

/** Print timestamp page and all its content */
void DayData::printDayPage()
{
    for (auto &[timestamp, timeOrders] : _dailyOrders)
    {
        std::cout << "  Timestamp: " << timestamp << " {\n";
        timeOrders.printTimestampPage();
        std::cout << "  }" << std::endl;
    }
};