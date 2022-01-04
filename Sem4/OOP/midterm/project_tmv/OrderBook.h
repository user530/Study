#pragma once
#include "DayData.h"

class Orderbook
{
private:
    /* Container for different market day pages */
    std::map<std::string, DayData> _orderbook;

public:
    /** Orderbook constructor*/
    Orderbook(const std::string);

    /** Returns specific day page */
    DayData &getDayPage(const std::string);

    /** Prints whole orderbook */
    void printOrderbook();

    /** Get all products */
    std::set<std::string> getAllProducts();

    /** Get minimum price for specified product */
    double getCurMin(const std::string, const std::string, const std::string, const OrderType &);

    /** Get maximum price for specified product */
    double getCurMax(const std::string, const std::string, const std::string, const OrderType &);

    /** Get average price for specified product across several timestamps */
    double getRangeAvg(const std::string, const OrderType &, const unsigned int);

    /** Predict requested order price for the next period */
    double getPrediction(const std::string, const std::string, const OrderType &,
                         const std::pair<std::string, std::string>);

    /** Get all date-time information */
    std::map<std::string,
             std::vector<std::string>>
    getAllDatetime();

    /** Get number of time periods */
    unsigned int getTimestepsNum();

    /** Check that product argument exists in the book */
    bool checkProdArg(std::string);

    /** Check that ordertype argument is correct */
    bool checkOTPArg(OrderType);

    /** Check that timestamp argument is correct */
    bool checkTimestampArg(unsigned int);

    /** Check that order extrema argument is correct */
    bool checkExtremaArg(std::string);

    /** Get initial datetime */
    std::pair<std::string, std::string> getInitialDatetime();

    /** Move to the next time stamp (OR day) */
    std::pair<std::string, std::string> nextPeriod(std::string, std::string);

    /* Collect addresses of order type groups that meet the criteria */
    std::vector<OrdertypeGroup *> collectOrdTypPages(const std::string,
                                                     const std::string,
                                                     const std::string,
                                                     const OrderType &);

    /* Match orders in specified date-time */
    void matchOrders(const std::string, const std::string);

    /* Print all sales in the requested period */
    void printSales(const std::string, const std::string);

    /* Prepare market depth data vector as a base for a chart */
    std::vector<double> marketDepthChart(const std::string,
                                         const std::string,
                                         const unsigned int);

    /* Calculate information about the X axis for the chart */
    std::map<std::string, double> getXinfo(std::vector<OrdertypeGroup *> &asks,
                                           std::vector<OrdertypeGroup *> &bids,
                                           unsigned int columns = 120);
};
